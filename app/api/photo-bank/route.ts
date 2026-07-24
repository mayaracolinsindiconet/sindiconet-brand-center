import { NextRequest, NextResponse } from 'next/server'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { readManifest } from '@/lib/blob-bank'

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status')
  const search = (req.nextUrl.searchParams.get('search') || '').trim().toLowerCase()
  const style = req.nextUrl.searchParams.get('style') || ''
  const pageParam = parseInt(req.nextUrl.searchParams.get('page') || '', 10)
  const limitParam = parseInt(req.nextUrl.searchParams.get('limit') || '', 10)

  // O banco aprovado e publico. Qualquer outro status (ou nenhum) exige PIN,
  // pois pode incluir imagens pendentes ainda nao revisadas.
  if (status !== 'aprovado') {
    const unauthorized = checkBankPin(req)
    if (unauthorized) return unauthorized
  }

  const all = await readManifest()
  let filtered = status ? all.filter((e) => e.status === status) : all

  if (style) {
    filtered = filtered.filter((e) => (e.styles || []).includes(style))
  }

  if (search) {
    filtered = filtered.filter((e) => {
      const haystack = [e.description || '', e.prompt || '', ...(e.styles || [])]
        .join(' ')
        .toLowerCase()
      return haystack.includes(search)
    })
  }

  const total = filtered.length
  const hasPagination = Number.isFinite(limitParam) && limitParam > 0
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const limit = hasPagination ? limitParam : total
  const totalPages = hasPagination ? Math.max(1, Math.ceil(total / limit)) : 1
  const paginated = hasPagination
    ? filtered.slice((page - 1) * limit, (page - 1) * limit + limit)
    : filtered

  return NextResponse.json({ entries: paginated, total, page, totalPages })
}
