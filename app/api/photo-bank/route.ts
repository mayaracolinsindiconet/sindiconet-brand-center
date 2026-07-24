import { NextRequest, NextResponse } from 'next/server'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { readManifest } from '@/lib/blob-bank'

// Sinonimos em ingles para termos de busca em portugues, usados apenas na
// busca por texto livre. Isso permite encontrar imagens antigas cujo prompt
// foi gerado em ingles (ex: buscar "mulher" tambem encontra prompts com "woman").
const SEARCH_SYNONYMS: Record<string, string[]> = {
  mulher: ['woman', 'female'],
  mulheres: ['women', 'female'],
  homem: ['man', 'male'],
  homens: ['men', 'male'],
  sindico: ['manager', 'administrator', 'building manager', 'condominium manager'],
  sindica: ['manager', 'administrator', 'building manager', 'condominium manager'],
  trabalhador: ['worker', 'maintenance', 'staff'],
  trabalhadora: ['worker', 'maintenance', 'staff'],
  empresario: ['businessman', 'executive', 'corporate'],
  empresaria: ['businesswoman', 'executive', 'corporate'],
  idoso: ['elderly', 'senior'],
  idosa: ['elderly', 'senior'],
  crianca: ['child', 'kid', 'children'],
  criancas: ['children', 'kids'],
  casal: ['couple'],
  familia: ['family'],
  grupo: ['group', 'meeting', 'residents'],
  reuniao: ['meeting'],
  seguranca: ['security guard', 'security'],
  zelador: ['caretaker', 'janitor', 'custodian'],
  zeladora: ['caretaker', 'janitor', 'custodian'],
}

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get('status')
  const search = (req.nextUrl.searchParams.get('search') || '').trim().toLowerCase()
  const style = req.nextUrl.searchParams.get('style') || ''
  const subject = req.nextUrl.searchParams.get('subject') || ''
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

  if (subject) {
    filtered = filtered.filter((e) => (e.subjects || []).includes(subject))
  }

  if (search) {
    const terms = [search, ...(SEARCH_SYNONYMS[search] || [])]
    filtered = filtered.filter((e) => {
      const haystack = [e.description || '', e.prompt || '', ...(e.styles || []), ...(e.subjects || [])]
        .join(' ')
        .toLowerCase()
      return terms.some((t) => haystack.includes(t))
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
