'use client'

import { LogoVariantCard } from './LogoVariantCard'

type LogoVariant   = 'mista' | 'simbolo' | 'mista-headline'
type LogoColorMode = 'colorida' | 'preta' | 'branca'

interface LogoVariantGridProps {
  selectedVariant?: LogoVariant
  selectedColorMode?: LogoColorMode
  onSelect: (variant: LogoVariant, colorMode: LogoColorMode) => void
}

const variants: LogoVariant[]   = ['mista', 'simbolo', 'mista-headline']
const colorModes: LogoColorMode[] = ['colorida', 'preta', 'branca']

const variantLabel: Record<LogoVariant, string> = {
  'mista':          'Mista',
  'simbolo':        'Símbolo',
  'mista-headline': 'Mista com Headline',
}

export function LogoVariantGrid({ selectedVariant, selectedColorMode, onSelect }: LogoVariantGridProps) {
  return (
    <div className="space-y-10">
      {variants.map((variant) => (
        <div key={variant}>
          <h3 className="font-headline font-semibold text-sm uppercase tracking-widest text-[#3D3D3D]/50 mb-4">
            {variantLabel[variant]}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {colorModes.map((colorMode) => (
              <LogoVariantCard
                key={`${variant}-${colorMode}`}
                variant={variant}
                colorMode={colorMode}
                selected={selectedVariant === variant && selectedColorMode === colorMode}
                onClick={() => onSelect(variant, colorMode)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
