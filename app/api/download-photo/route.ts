import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL não fornecida' }, { status: 400 })
  }

  // Permitir apenas Pexels CDN e assets locais
  const isAllowed =
    url.startsWith('https://images.pexels.com/') ||
    url.startsWith('/assets/')

  if (!isAllowed) {
    return NextResponse.json({ error: 'URL não permitida' }, { status: 403 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SindiconetBrandCenter/1.0)',
      },
    })

    if (!response.ok) {
      throw new Error('Erro ao buscar imagem: ' + response.status)
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const buffer = await response.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment; filename="sindiconet-foto.jpg"',
        'Cache-Control': 'no-store',
        'Content-Length': String(buffer.byteLength),
      },
    })
  } catch (error) {
    console.error('[download-photo]', error)
    return NextResponse.json(
      { error: 'Não foi possível baixar a imagem' },
      { status: 500 }
    )
  }
}
