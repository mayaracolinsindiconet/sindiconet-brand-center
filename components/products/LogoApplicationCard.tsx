'use client'

import { useState } from 'react'
import Image from 'next/image'
import { products } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'

type LogoVariant = 'mista' | 'simbolo' | 'mista-headline'
type LogoMode   = 'correct' | 'incorrect' | 'sombra'

interface LogoApplicationCardProps {
  product:     ProductSlug
  logoVariant?: LogoVariant
  mode?:        LogoMode
  note?:        string
}

const variantLabel: Record<LogoVariant, string> = {
  mista:             'Mista',
  simbolo:           'Símbolo',
  'mista-headline':  'Com Headline',
}

export function LogoApplicationCard({
  product,
  logoVariant = 'mista',
  mode        = 'correct',
  note,
}: LogoApplicationCardProps) {
  const p = products[product]
  const [imgError, setImgError] = useState(false)

  const isPositive    = mode === 'correct' || mode === 'sombra'
  const logoColorMode = mode === 'incorrect' ? 'colorida' : 'branca'
  const bgColor =
    mode === 'sombra'   ? p.colors.sombra  :
    mode === 'correct'  ? p.colors.primary :
    /* incorrect */       p.colors.luz

  const logoSrc = `/assets/logos/sindiconet-${logoVariant}-${logoColorMode}.svg`

  return (
    <div className="group rounded-2xl overflow-hidden border border-black/5">
      <div
        className="h-32 relative flex items-center justify-center p-8"
        style={{ backgroundColor: bgColor }}
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
              isPositive
                ? 'bg-[#318367]/20 text-white'
                : 'bg-[#D13D2A]/10 text-[#D13D2A]'
            }`}
          >
            {isPositive ? '✓ Correto' : '✗ Incorreto'}
          </span>
        </div>
      </div>

      <div className="bg-white p-4">
        <p className="text-xs font-semibold font-body text-[#101e37] mb-1">
          {variantLabel[logoVariant]} · Logo {logoColorMode}
          {mode === 'sombra' && (
            <span className="ml-1 font-normal text-[#3D3D3D]/40">· Fundo sombra</span>
          )}
        </p>
        {note && (
          <p className="text-xs font-body text-[#3D3D3D]/55 leading-relaxed">{note}</p>
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
        <path
          d="M7 12C7 9.239 9.239 7 12 7C14.761 7 17 9.239 17 12C17 14.761 14.761 17 12 17"
          stroke={colorMode === 'branca' ? '#3e77db' : 'white'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 17C10.895 17 10 16.105 10 15C10 13.895 10.895 13 12 13"
          stroke={colorMode === 'branca' ? '#3e77db' : 'white'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-bold text-sm" style={{ color }}>Síndiconet</span>
    </div>
  )
}
