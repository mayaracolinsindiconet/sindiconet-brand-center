import { NextRequest, NextResponse } from 'next/server'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { backfillHashes } from '@/lib/blob-bank'

export const maxDuration = 60

// Calcula o hash das imagens antigas do banco, em lotes, para que a deteccao de
// imagens exatamente iguais tambem valha para o que ja estava la. Requer PIN.
export async function POST(req: NextRequest) {
  const unauthorized = checkBankPin(req)
  if (unauthorized) return unauthorized
  try {
    const result = await backfillHashes(30)
    return NextResponse.json(result)
  } catch (error) {
    console.error('photo-bank hashes error:', error)
    return NextResponse.json({ error: 'Erro ao verificar imagens antigas' }, { status: 500 })
  }
}
