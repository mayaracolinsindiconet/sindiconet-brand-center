import { ColorPaletteCard } from '@/components/shared/ColorPaletteCard'
import { products } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'

interface ProductPaletteSectionProps {
  product: ProductSlug
}

// PRO brand gradient (extracted from pro-simbolo-gradient.svg)
const PRO_GRADIENT = { start: '#3E1F59', end: '#BE9ED9' }

export function ProductPaletteSection({ product }: ProductPaletteSectionProps) {
  const p = products[product]
  const isPro = product === 'pro'

  const mainColors = [
    { hex: p.colors.primary,   name: 'Primária',   role: '60% Primária' },
    { hex: p.colors.secondary, name: 'Secundária', role: '30% Secundária' },
    { hex: p.colors.accent,    name: 'Accent',     role: '10% Accent' },
  ]

  const supportColors = [
    { hex: p.colors.primaryLight, name: 'Primária Light', role: 'Background' },
    { hex: p.colors.primaryDark,  name: 'Primária Dark',  role: 'Texto' },
    { hex: p.colors.onPrimary,    name: 'On Primary',     role: 'Texto sobre primária' },
  ]

  return (
    <div className="space-y-8">

      {/* Proporção 60·30·10 */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
          Proporção 60 · 30 · 10
        </p>
        <div className="flex rounded-xl overflow-hidden mb-4 h-14">
          {mainColors.map((c, i) => (
            <div
              key={c.hex}
              className="flex items-center justify-center text-[10px] font-semibold font-body"
              style={{
                backgroundColor: c.hex,
                flex: i === 0 ? 6 : i === 1 ? 3 : 1,
              }}
            >
              <span style={{ color: p.colors.onPrimary, opacity: 0.8 }}>
                {i === 0 ? '60%' : i === 1 ? '30%' : '10%'}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {mainColors.map((color) => (
            <ColorPaletteCard key={color.hex} hex={color.hex} name={color.name} role={color.role} />
          ))}
        </div>
      </div>

      {/* Cores de suporte */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
          Cores de suporte
        </p>
        <div className="grid grid-cols-3 gap-3">
          {supportColors.map((color) => (
            <ColorPaletteCard key={color.name} hex={color.hex} name={color.name} role={color.role} />
          ))}
        </div>
      </div>

      {/* Gradiente PRO — exclusivo */}
      {isPro && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
            Gradiente da marca
          </p>
          <div
            className="h-14 rounded-xl mb-4"
            style={{ background: `linear-gradient(to right, ${PRO_GRADIENT.start}, ${PRO_GRADIENT.end})` }}
          />
          <div className="grid grid-cols-2 gap-3">
            <ColorPaletteCard hex={PRO_GRADIENT.start} name="Gradient Start" role="Início" />
            <ColorPaletteCard hex={PRO_GRADIENT.end}   name="Gradient End"   role="Fim" />
          </div>
          <p className="mt-3 text-[11px] font-body text-[#3D3D3D]/50 leading-relaxed">
            O gradiente é exclusivo da versão símbolo do PRO e não deve ser usado como cor de fundo em textos ou layouts — apenas como elemento gráfico diferenciador.
          </p>
        </div>
      )}

    </div>
  )
}
