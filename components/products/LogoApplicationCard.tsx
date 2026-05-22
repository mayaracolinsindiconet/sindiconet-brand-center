'use client'

import { useState } from 'react'
import Image from 'next/image'
import { products } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'

type LogoVariant = 'mista' | 'simbolo' | 'mista-headline'

interface LogoApplicationCardProps {
  product: ProductSlug
  logoVariant?: LogoVariant
  mode?: 'correct' | 'incorrect'
  note?: string
}

const variantLabel: Record<LogoVariant, string> = {
  mista:            'Mista',
  simbolo:          'Símbolo',
  'mista-headline': 'Com Headline',
}

export function LogoApplicationCard({
  product,
  logoVariant = 'mista',
  mode = 'correct',
  note,
}: LogoApplicationCardProps) {
  const p = products[product]
  const isCorrect = mode === 'correct'
  const [imgError, setImgError] = useState(false)

  const logoColorMode = isCorrect ? 'branca' : 'colorida'
  const logoSrc = `/assets/logos/sindiconet-${logoVariant}-${logoColorMode}.svg`

  return (
    <div className="group rounded-2xl overflow-hidden border border-black/5">
      <div
        className="h-32 relative flex items-center justify-center p-8"
        style={{ backgroundColor: isCorrect ? p.colors.primary : p.colors.primaryLight }}
      >
        <div className="relative w-36 h-10">
          {!imgError ? (
            <Image
              src={logoSrc}
              alt={`Logo Síndiconet ${variantLabel[logoVariant]}`}
              fill
              className="object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <LogoFallback colorMode={logoColorMode} />
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold font-body ${
              isCorrect
                ? 'bg-[#318367]/20 text-white'
                : 'bg-[#D13D2A]/10 text-[#D13D2A]'
            }`}
          >
            {isCorrect ? '✓ Correto' : '✗ Incorreto'}
          </span>
        </div>
      </div>

      <div className="bg-white p-4">
        <p className="text-xs font-semibold font-body text-[#101e37] mb-1">
          {variantLabel[logoVariant]} · Logo {logoColorMode}
        </p>
        {note && (
          <p className="text-xs font-body text-[#3D3D3D]/55 leading-relaxed">
            {note}
          </p>
        )}
      </div>
    </div>
  )
}

function LogoFallback({ colorMode }: { colorMode: string }) {
  const color = colorMode === 'branca' ? '#FFFFFF' : '#3e77db'
  return (
    <div className="absolute inset-0 flex items-center gap-2">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill={color} />
        <path d="M7 12C7 9.239 9.239 7 12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17" stroke={colorMode === 'branca' ? '#3e77db' : 'white'} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 17C10.895 17 10 16.105 10 15C10 13.895 10.895 13 12 13" stroke={colorMode === 'branca' ? '#3e77db' : 'white'} strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <span className="font-bold text-sm" style={{ color }}>Síndiconet</span>
    </div>
  )
}
