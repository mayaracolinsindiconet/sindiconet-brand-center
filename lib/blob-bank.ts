import { list, put } from '@vercel/blob'
import { createHash } from 'crypto'

// Manifesto do Banco de Imagens, persistido como um unico JSON no Vercel Blob.
// Volume esperado e baixo (revisao semanal), entao um arquivo-manifesto unico
// e suficiente - evita a necessidade de um banco de dados separado.

export interface BankEntry {
  id: string
  imageUrl: string
  prompt: string
  description: string
  styles: string[]
  subjects?: string[]
  pillar: string | null
  status: 'pendente' | 'aprovado' | 'reprovado'
  // SHA-256 do arquivo original: identifica imagens EXATAMENTE iguais (byte a byte)
  hash?: string
  createdAt: string
  reviewedAt?: string
  reviewNote?: string
}

const MANIFEST_PATH = 'banco-imagens/manifest.json'

export async function readManifest(): Promise<BankEntry[]> {
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH })
    const found = blobs.find((b) => b.pathname === MANIFEST_PATH)
    if (!found) return []
    // Cache-bust: o Vercel Blob serve o mesmo pathname atras de um CDN,
    // entao uma leitura logo apos a escrita pode retornar uma copia antiga
    // se a URL for identica. O parametro de query garante uma leitura fresca.
    const res = await fetch(`${found.url}?t=${Date.now()}`, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch (err) {
    console.error('readManifest error:', err)
    return []
  }
}

export async function writeManifest(entries: BankEntry[]): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(entries, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

export async function addEntry(entry: BankEntry): Promise<void> {
  const current = await readManifest()
  current.unshift(entry)
  await writeManifest(current)
}

export async function updateEntry(
  id: string,
  patch: Partial<BankEntry>
): Promise<BankEntry | null> {
  const current = await readManifest()
  const idx = current.findIndex((e) => e.id === id)
  if (idx === -1) return null
  current[idx] = { ...current[idx], ...patch }
  await writeManifest(current)
  return current[idx]
}

export async function deleteEntry(id: string): Promise<void> {
  const current = await readManifest()
  await writeManifest(current.filter((e) => e.id !== id))
}

export function sha256(buffer: Buffer | ArrayBuffer | Uint8Array): string {
  return createHash('sha256').update(buffer instanceof ArrayBuffer ? new Uint8Array(buffer) : buffer).digest('hex')
}

// Procura no banco (qualquer status) uma imagem com o mesmo hash.
export function findDuplicate(entries: BankEntry[], hash: string): BankEntry | undefined {
  return entries.find((e) => e.hash === hash)
}

// Calcula o hash das imagens antigas (enviadas antes da verificacao existir).
// Processa em lotes para nao estourar o tempo da funcao; devolve quantas faltam.
export async function backfillHashes(limit = 30): Promise<{ done: number; remaining: number; failed: number }> {
  const current = await readManifest()
  const pending = current.filter((e) => !e.hash && e.imageUrl)
  const batch = pending.slice(0, limit)
  let done = 0
  let failed = 0
  const hashes = new Map<string, string>()
  await Promise.all(
    batch.map(async (e) => {
      try {
        const res = await fetch(e.imageUrl, { cache: 'no-store' })
        if (!res.ok) throw new Error(String(res.status))
        hashes.set(e.id, sha256(await res.arrayBuffer()))
        done++
      } catch {
        failed++
      }
    })
  )
  if (hashes.size > 0) {
    // Le de novo antes de gravar, para nao sobrescrever mudancas feitas no meio do caminho.
    const fresh = await readManifest()
    await writeManifest(fresh.map((e) => (hashes.has(e.id) && !e.hash ? { ...e, hash: hashes.get(e.id) } : e)))
  }
  return { done, remaining: Math.max(0, pending.length - done - failed), failed }
}
