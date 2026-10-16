import { NextRequest, NextResponse } from 'next/server'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { readManifest, findDuplicate } from '@/lib/blob-bank'

// Antes de enviar, o navegador manda o hash (SHA-256) do arquivo para saber se ja existe
// uma imagem EXATAMENTE igual no banco (qualquer status).
export async function POST(req: NextRequest) {
  const unauthorized = checkBankPin(req)
  if (unauthorized) return unauthorized

  const { hash } = (await req.json().catch(() => ({}))) as { hash?: string }
  if (!hash || typeof hash !== 'string') {
    return NextResponse.json({ error: 'hash ausente' }, { status: 400 })
  }
  const dup = findDuplicate(await readManifest(), hash.toLowerCase())
  return NextResponse.json({
    duplicate: dup
      ? { id: dup.id, description: dup.description, status: dup.status, imageUrl: dup.imageUrl }
      : null,
  })
}
