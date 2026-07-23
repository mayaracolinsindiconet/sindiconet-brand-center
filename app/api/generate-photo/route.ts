import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { put } from '@vercel/blob'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { addEntry, type BankEntry } from '@/lib/blob-bank'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const sizeByFormat: Record<string, '1024x1024' | '1024x1536' | '1536x1024'> = {
  quadrado: '1024x1024',
  retrato: '1024x1536',
  paisagem: '1536x1024',
}

export async function POST(req: NextRequest) {
  const unauthorized = checkBankPin(req)
  if (unauthorized) return unauthorized

  try {
    const { prompt, format, description, styles, pillar } = await req.json()

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({ error: 'Prompt confirmado e obrigatorio' }, { status: 400 })
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY nao configurada no servidor.' },
        { status: 503 }
      )
    }

    const size = sizeByFormat[format as string] || '1536x1024'

    const image = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      size,
      quality: 'high',
      n: 1,
    })

    const b64 = image.data?.[0]?.b64_json
    if (!b64) {
      return NextResponse.json({ error: 'Falha ao gerar imagem' }, { status: 502 })
    }
    const buffer = Buffer.from(b64, 'base64')

    const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const blob = await put(`banco-imagens/${id}.png`, buffer, {
      access: 'public',
      contentType: 'image/png',
      addRandomSuffix: false,
    })

    const entry: BankEntry = {
      id,
      imageUrl: blob.url,
      prompt,
      description: description || '',
      styles: styles || [],
      pillar: pillar || null,
      status: 'pendente',
      createdAt: new Date().toISOString(),
    }
    await addEntry(entry)

    return NextResponse.json({ entry })
  } catch (error) {
    console.error('generate-photo error:', error)
    return NextResponse.json({ error: 'Erro ao gerar imagem' }, { status: 500 })
  }
}
