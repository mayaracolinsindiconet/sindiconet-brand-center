import { NextRequest, NextResponse } from 'next/server'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { updateEntry, deleteEntry } from '@/lib/blob-bank'

export async function PATCH(
    req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
  ) {
    const unauthorized = checkBankPin(req)
    if (unauthorized) return unauthorized

  const { id } = await params
    const body = await req.json()
    const status = body.status as 'aprovado' | 'reprovado' | 'pendente' | undefined
    const reviewNote = body.reviewNote as string | undefined

  if (!status || !['aprovado', 'reprovado', 'pendente'].includes(status)) {
        return NextResponse.json({ error: 'status invalido' }, { status: 400 })
  }

  const updated = await updateEntry(id, {
        status,
        reviewNote,
        reviewedAt: new Date().toISOString(),
  })

  if (!updated) {
        return NextResponse.json({ error: 'Entrada nao encontrada' }, { status: 404 })
  }
    return NextResponse.json({ entry: updated })
}

export async function DELETE(
    req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
  ) {
    const unauthorized = checkBankPin(req)
    if (unauthorized) return unauthorized

  const { id } = await params
    await deleteEntry(id)
    return NextResponse.json({ ok: true })
}
