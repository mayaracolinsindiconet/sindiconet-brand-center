import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// PROTEÇÃO POR SENHA — atualmente DESATIVADA
// Para reativar: remova o "return NextResponse.next()" logo abaixo e
// descomente o bloco marcado com "REATIVAR".
// ─────────────────────────────────────────────────────────────────────────────

export function middleware(request: NextRequest) {
  // SENHA DESATIVADA — remova esta linha para reativar a proteção
  return NextResponse.next()

  /* ── REATIVAR: descomente a partir daqui ──────────────────────────────────

  const PUBLIC_PATHS = ['/auth', '/api/auth', '/_next', '/assets', '/favicon.ico']
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path))
  if (isPublic) return NextResponse.next()

  const session = request.cookies.get('brand_session')
  if (session?.value === 'authenticated') return NextResponse.next()

  const loginUrl = new URL('/auth', request.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)

  ── até aqui ──────────────────────────────────────────────────────────────── */
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
