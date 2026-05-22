import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_PATHS = ['/auth', '/api/auth', '/_next', '/assets', '/favicon.ico']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isPublic = PUBLIC_PATHS.some((path) => pathname.startsWith(path))
  if (isPublic) return NextResponse.next()

  const session = request.cookies.get('brand_session')
  if (session?.value === 'authenticated') return NextResponse.next()

  const loginUrl = new URL('/auth', request.url)
  loginUrl.searchParams.set('from', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
