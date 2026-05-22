'use client'

import { useState } from 'react'

type ProVariant = {
  key: string
  label: string
  bg: string
  dark: boolean
  note: string
}

const PRO_VARIANTS: ProVariant[] = [
  {
    key:   'pro-mista-colorida',
    label: 'Mista Colorida',
    bg:    '#F4F6F8',
    dark:  false,
    note:  'Uso principal em fundos claros.',
  },
  {
    key:   'pro-mista-dark',
    label: 'Mista Dark',
    bg:    '#2A0C49',
    dark:  true,
    note:  'Uso em fundos escuros do produto.',
  },
  {
    key:   'pro-mista-outline',
    label: 'Mista Outline',
    bg:    '#F4F6F8',
    dark:  false,
    note:  'Versão outline para situações especiais.',
  },
  {
    key:   'pro-simbolo-colorida',
    label: 'Símbolo Colorido',
    bg:    '#F4F6F8',
    dark:  false,
    note:  'Ícone principal — favicon, avatar.',
  },
  {
    key:   'pro-simbolo-gradient',
    label: 'Símbolo Gradient',
    bg:    '#F4F6F8',
    dark:  false,
    note:  'Versão com gradiente da marca PRO.',
  },
]

export function ProLogoGrid() {
  return (
    <div>
      {/* PRO brand accent */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-0.5 h-5 rounded-full"
          style={{ background: 'linear-gradient(to bottom, #855DEA, #2A0C49)' }}
        />
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] font-body text-[#3D3D3D]/50">
          Síndiconet PRO
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {PRO_VARIANTS.map((v) => (
          <ProCard key={v.key} variant={v} />
        ))}
      </div>
    </div>
  )
}

function ProCard({ variant }: { variant: ProVariant }) {
  const [imgError, setImgError] = useState(false)
  const src = `/assets/logos/pro/${variant.key}.svg`

  return (
    <div className="rounded-2xl overflow-hidden border border-black/8 text-left">
      {/* Preview */}
      <div
        className="h-28 flex items-center justify-center p-5"
        style={{ backgroundColor: variant.bg }}
      >
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={`Logo PRO — ${variant.label}`}
            style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <ProFallback dark={variant.dark} />
        )}
      </div>

      {/* Label */}
      <div className="bg-white px-3 py-3">
        <p className="text-xs font-semibold font-body text-[#101e37] leading-tight">{variant.label}</p>
        <p className="text-[10px] font-body text-[#3D3D3D]/45 mt-0.5 leading-relaxed">{variant.note}</p>
      </div>
    </div>
  )
}

function ProFallback({ dark }: { dark: boolean }) {
  const color = dark ? '#FFFFFF' : '#5D2E85'
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="13.5" fill={dark ? '#5D2E85' : '#F0E8F8'} stroke={color} />
        <text x="14" y="19" textAnchor="middle" fontSize="12" fontWeight="700" fill={color}>P</text>
      </svg>
      <span className="font-bold text-sm" style={{ color }}>PRO</span>
    </div>
  )
}
