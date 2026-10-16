import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { addEntry, readManifest, findDuplicate, type BankEntry } from '@/lib/blob-bank'

// Registra no banco uma imagem que o navegador ja enviou direto ao Vercel Blob.
// Confere de novo se nao e duplicada (caso duas pessoas/abas enviem ao mesmo tempo);
// se for, apaga o arquivo recem-enviado para nao deixar lixo no armazenamento.
export async function POST(req: NextRequest) {
  const unauthorized = checkBankPin(req)
  if (unauthorized) return unauthorized

  try {
    const body = (await req.json()) as {
      url?: string
      fileName?: string
      hash?: string
      styles?: string[]
      subjects?: string[]
    }
    if (!body.url || !body.hash) {
      return NextResponse.json({ error: 'url e hash sao obrigatorios' }, { status: 400 })
    }
    if (!/\.(jpe?g|png)(\?.*)?$/i.test(body.url)) {
      return NextResponse.json({ error: 'Apenas JPG e PNG sao aceitos' }, { status: 400 })
    }
    const hash = body.hash.toLowerCase()

    const dup = findDuplicate(await readManifest(), hash)
    if (dup) {
      try {
        await del(body.url)
      } catch {
        // se nao conseguir apagar, o arquivo fica sem registro; nao bloqueia a resposta
      }
      return NextResponse.json(
        { duplicate: { id: dup.id, description: dup.description, status: dup.status, imageUrl: dup.imageUrl } },
        { status: 409 }
      )
    }

    const now = new Date().toISOString()
    const entry: BankEntry = {
      id: `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      imageUrl: body.url,
      prompt: '',
      description: (body.fileName || 'imagem').replace(/\.[^.]+$/, ''),
      styles: Array.isArray(body.styles) ? body.styles : [],
      subjects: Array.isArray(body.subjects) && body.subjects.length ? body.subjects : undefined,
      pillar: '',
      status: 'aprovado',
      hash,
      createdAt: now,
      reviewedAt: now,
      reviewNote: 'Upload direto de imagem ja existente',
    }
    await addEntry(entry)
    return NextResponse.json({ entry })
  } catch (error) {
    console.error('photo-bank register error:', error)
    return NextResponse.json({ error: 'Erro ao registrar a imagem no banco' }, { status: 500 })
  }
}
