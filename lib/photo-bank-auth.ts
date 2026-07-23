import { NextRequest, NextResponse } from 'next/server'

// Proteção simples do Banco de Imagens por PIN.
// Configure a variável de ambiente BANCO_IMAGENS_PIN no Vercel.
// O client envia o PIN digitado no header "x-bank-pin" em toda chamada.

export function checkBankPin(req: NextRequest): NextResponse | null {
    const configured = process.env.BANCO_IMAGENS_PIN
    if (!configured) {
          return NextResponse.json(
            { error: 'BANCO_IMAGENS_PIN não configurado no servidor.' },
            { status: 503 }
                )
    }
    const provided = req.headers.get('x-bank-pin')
    if (provided !== configured) {
          return NextResponse.json({ error: 'PIN inválido.' }, { status: 401 })
    }
    return null
}
