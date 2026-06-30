'use client'

import { useState } from 'react'
import Image from 'next/image'
import { UsageTag } from '@/components/shared/UsageTag'

type LogoVariant   = 'mista' | 'simbolo' | 'mista-headline'
type LogoColorMode = 'colorida' | 'preta' | 'branca'

interface LogoVariantCardProps {
  variant: LogoVariant
  colorMode: LogoColorMode
  onClick?: () => void
  selected?: boolean
}

const bgForMode: Record<LogoColorMode, string> = {
  colorida: '#F4F6F8',
  preta:    '#3d3d3d',
  branca:   '#3e77db',
}

const usageForMode: Record<LogoColorMode, Parameters<typeof UsageTag>[0]['variant']> = {
  colorida:  'fundo-claro',
  preta:     'fundo-escuro',
  branca:    'fundo-escuro',
}

const variantLabel: Record<LogoVariant, string> = {
  'mista':          'Mista',
  'simbolo':        'Símbolo',
  'mista-headline': 'Mista com Headline',
}

const colorModeLabel: Record<LogoColorMode, string> = {
  colorida: 'Colorida',
  preta:    'Preta',
  branca:   'Branca',
}

export function LogoVariantCard({ variant, colorMode, onClick, selected }: LogoVariantCardProps) {
  const src = `/assets/logos/sindiconet-${variant}-${colorMode}.svg`
  const filename = `sindiconet-${variant}-${colorMode}.svg`
  const [imgError, setImgError] = useState(false)

  return (
    <button
      onClick={onClick}
      aria-label={`Logo ${variantLabel[variant]} ${colorModeLabel[colorMode]} — clique para abrir no simulador`}
      aria-pressed={selected}
      className={`group text-left w-full rounded-2xl overflow-hidden border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e77db] ${
        selected
          ? 'border-[#3e77db] shadow-md shadow-[#3e77db]/10'
          : 'border-black/8 hover:border-[#9fbbed] hover:shadow-md'
      }`}
    >
      <div
        className="h-28 flex items-center justify-center p-6 relative"
        style={{ backgroundColor: bgForMode[colorMode] }}
      >
        <div className="relative w-full h-full">
          {!imgError ? (
            <Image
              src={src}
              alt={`Logo Síndiconet — ${variantLabel[variant]} ${colorModeLabel[colorMode]}`}
              fill
              className="object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <LogoPlaceholder variant={variant} colorMode={colorMode} />
          )}
        </div>
      </div>

      <div className="bg-white px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-xs font-semibold font-body text-[#101e37]">{colorModeLabel[colorMode]}</p>
            <p className="text-[10px] font-mono text-[#3D3D3D]/40 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              {filename}
            </p>
          </div>
          <UsageTag variant={usageForMode[colorMode]} />
        </div>
      </div>
    </button>
  )
}

function LogoPlaceholder({ variant, colorMode }: { variant: LogoVariant; colorMode: LogoColorMode }) {
  const color = colorMode === 'branca' ? '#ffffff' : colorMode === 'preta' ? '#000000' : '#3e77db'
  const textColor = colorMode === 'branca' ? '#ffffff' : '#101e37'
  const showIcon = variant === 'simbolo' || variant === 'mista' || variant === 'mista-headline'
  const showText = variant === 'mista' || variant === 'mista-headline'
  const showTagline = variant === 'mista-headline'

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-2">
      {showIcon && (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect width="32" height="32" rx="7" fill={color} />
          <path
            d="M10 16C10 12.686 12.686 10 16 10C19.314 10 22 12.686 22 16C22 19.314 19.314 22 16 22"
            stroke={colorMode === 'branca' ? '#3e77db' : 'white'}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M16 22C14.343 22 13 20.657 13 19C13 17.343 14.343 16 16 16"
            stroke={colorMode === 'branca' ? '#3e77db' : 'white'}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {showText && (
        <div className="flex flex-col">
          <span style={{ color: textColor }} className="font-bold text-sm leading-tight" aria-hidden="true">
            Síndiconet
          </span>
          {showTagline && (
            <span style={{ color: textColor, opacity: 0.5 }} className="text-[8px] uppercase tracking-[0.15em] leading-tight" aria-hidden="true">
              Brand Center
            </span>
          )}
        </div>
      )}
    </div>
  )
}
