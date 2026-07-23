import { NextRequest, NextResponse } from 'next/server'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { readManifest } from '@/lib/blob-bank'

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status')

  // O banco aprovado e publico. Qualquer outro status (ou nenhum) exige PIN,
  // pois pode incluir imagens pendentes ainda nao revisadas.
  if (status !== 'aprovado') {
    const unauthorized = checkBankPin(req)
    if (unauthorized) return unauthorized
  }

  const all = await readManifest()
  const filtered = status ? all.filter((e) => e.status === status) : all
  return NextResponse.json({ entries: filtered })
}
