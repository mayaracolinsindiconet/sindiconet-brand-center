import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { checkBankPin } from '@/lib/photo-bank-auth'

// Upload direto do navegador para o Vercel Blob: o arquivo NAO passa pela funcao
// do servidor, entao nao ha limite de ~4,5 MB (causa comum de erro em fotos grandes).
// Aqui so se autoriza o envio (PIN) e se define o que e permitido.
export async function POST(req: NextRequest) {
  const unauthorized = checkBankPin(req)
  if (unauthorized) return unauthorized

  try {
    const body = (await req.json()) as HandleUploadBody
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        // O banco aceita apenas JPG e PNG.
        allowedContentTypes: ['image/jpeg', 'image/png'],
        maximumSizeInBytes: 80 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // O registro no banco e feito por /api/photo-bank/register logo apos o envio.
      },
    })
    return NextResponse.json(json)
  } catch (error) {
    console.error('photo-bank upload-token error:', error)
    const message = error instanceof Error ? error.message : 'Erro ao autorizar o envio'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
