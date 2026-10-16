import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { addEntry, readManifest, findDuplicate, sha256, type BankEntry } from '@/lib/blob-bank'
import { normalizeProfile, profileTag } from '@/lib/photo-profiles'

// Upload de imagens ja prontas (fora do fluxo de geracao por IA).
// Entram direto como aprovadas, pois quem tem o PIN ja fez a curadoria antes de enviar.
export async function POST(req: NextRequest) {
  const unauthorized = checkBankPin(req)
  if (unauthorized) return unauthorized

  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]
    const tag = profileTag(normalizeProfile(formData.get('profile')))

    if (!files.length) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    const invalid = files.filter((f) => !['image/jpeg', 'image/png'].includes(f.type))
    if (invalid.length > 0) {
      return NextResponse.json(
        { error: 'Apenas JPG e PNG sao aceitos: ' + invalid.map((f) => f.name).join(', ') },
        { status: 400 }
      )
    }

    const entries: BankEntry[] = []
    const duplicates: { fileName: string; existing: { id: string; description: string; status: string; imageUrl: string } }[] = []
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
      // Imagem EXATAMENTE igual (mesmo arquivo, byte a byte) a uma que ja esta no banco: nao envia de novo.
      const hash = sha256(buffer)
      const dup = findDuplicate(await readManifest(), hash)
      if (dup) {
        duplicates.push({
          fileName: file.name,
          existing: { id: dup.id, description: dup.description, status: dup.status, imageUrl: dup.imageUrl },
        })
        continue
      }
      const ext = (file.name.split('.').pop() || 'png').toLowerCase()
      const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
      const blob = await put(`banco-imagens/${id}.${ext}`, buffer, {
        access: 'public',
        contentType: file.type || 'image/png',
        addRandomSuffix: false,
      })

      const entry: BankEntry = {
        id,
        imageUrl: blob.url,
        prompt: '',
        description: file.name.replace(/\.[^.]+$/, ''),
        styles: [tag],
        hash,
        pillar: '',
        status: 'aprovado',
        createdAt: new Date().toISOString(),
        reviewedAt: new Date().toISOString(),
        reviewNote: 'Upload direto de imagem ja existente',
      }
      await addEntry(entry)
      entries.push(entry)
    }

    return NextResponse.json({ entries, duplicates })
  } catch (error) {
    console.error('photo-bank upload error:', error)
    return NextResponse.json({ error: 'Erro ao enviar imagens' }, { status: 500 })
  }
}
