import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { addEntry, type BankEntry } from '@/lib/blob-bank'

// Upload de imagens ja prontas (fora do fluxo de geracao por IA).
// Entram direto como aprovadas, pois quem tem o PIN ja fez a curadoria antes de enviar.
export async function POST(req: NextRequest) {
  const unauthorized = checkBankPin(req)
  if (unauthorized) return unauthorized

  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (!files.length) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    const entries: BankEntry[] = []
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer())
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
        styles: [],
        pillar: '',
        status: 'aprovado',
        createdAt: new Date().toISOString(),
        reviewedAt: new Date().toISOString(),
        reviewNote: 'Upload direto de imagem ja existente',
      }
      await addEntry(entry)
      entries.push(entry)
    }

    return NextResponse.json({ entries })
  } catch (error) {
    console.error('photo-bank upload error:', error)
    return NextResponse.json({ error: 'Erro ao enviar imagens' }, { status: 500 })
  }
}
