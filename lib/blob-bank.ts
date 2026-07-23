import { list, put } from '@vercel/blob'

// Manifesto do Banco de Imagens, persistido como um unico JSON no Vercel Blob.
// Volume esperado e baixo (revisao semanal), entao um arquivo-manifesto unico
// e suficiente - evita a necessidade de um banco de dados separado.

export interface BankEntry {
    id: string
    imageUrl: string
    prompt: string
    description: string
    styles: string[]
    pillar: string | null
    status: 'pendente' | 'aprovado' | 'reprovado'
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
                const res = await fetch(found.url, { cache: 'no-store' })
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
