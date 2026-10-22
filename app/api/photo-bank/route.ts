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
  // Filtros aceitam varios valores separados por virgula (ex: style=premium,editorial).
  const parseList = (key: string) =>
    (req.nextUrl.searchParams.get(key) || '').split(',').map((v) => v.trim()).filter(Boolean)
  const styleList = parseList('style')
  const subjectList = parseList('subject')
  const profileList = parseList('profile')
  // "all": a imagem precisa ter todas as tags marcadas; "any": basta ter uma delas.
  const matchAny = req.nextUrl.searchParams.get('match') === 'any'
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

  const matches = (have: string[], wanted: string[]) =>
    matchAny ? wanted.some((w) => have.includes(w)) : wanted.every((w) => have.includes(w))

  if (styleList.length > 0) {
    filtered = filtered.filter((e) => matches(e.styles || [], styleList))
  }

  // Tipo (perfil): "pro" so mostra imagens com a tag PRO; "sindiconet" mostra as marcadas
  // como SíndicoNet e tambem as antigas sem tag de perfil (anteriores ao PRO).
  // Quando os dois estao marcados, mostra as imagens de qualquer um dos tipos.
  if (profileList.length > 0) {
    filtered = filtered.filter((e) => {
      const st = e.styles || []
      const isPro = st.includes('sindiconet-pro')
      const isSn = st.includes('sindiconet') || !isPro
      return (profileList.includes('pro') && isPro) || (profileList.includes('sindiconet') && isSn)
    })
  }

  if (subjectList.length > 0) {
    filtered = filtered.filter((e) => matches(e.subjects || [], subjectList))
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
