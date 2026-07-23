import { NextRequest, NextResponse } from 'next/server'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { readManifest } from '@/lib/blob-bank'

export async function GET(req: NextRequest) {
    const unauthorized = checkBankPin(req)
    if (unauthorized) return unauthorized

  const status = req.nextUrl.searchParams.get('status')
    const all = await readManifest()
    const filtered = status ? all.filter((e) => e.status === status) : all
    return NextResponse.json({ entries: filtered })
}
