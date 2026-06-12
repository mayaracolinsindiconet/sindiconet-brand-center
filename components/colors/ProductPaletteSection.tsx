import { ColorPaletteCard } from '@/components/shared/ColorPaletteCard'
import { products } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'

interface ProductPaletteSectionProps {
  product: ProductSlug
}

export function ProductPaletteSection({ product }: ProductPaletteSectionProps) {
  const p = products[product]
  const isPro = product === 'pro'

  // ── PRO ────────────────────────────────────────────────────────────────────
  if (isPro) {
    const proColors = products.pro.colors

    return (
      <div className="space-y-8">

        {/* Primárias */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
            Primárias
          </p>
          <div className="flex rounded-xl overflow-hidden mb-4 h-12">
            {proColors.primarias.map((hex) => (
              <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {proColors.primarias.map((hex, i) => (
              <ColorPaletteCard key={hex} hex={hex} name={`Primária ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Secundárias */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
            Secundárias
          </p>
          <div className="flex rounded-xl overflow-hidden mb-4 h-12">
            {proColors.secundarias.map((hex) => (
              <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {proColors.secundarias.map((hex, i) => (
              <ColorPaletteCard key={hex} hex={hex} name={`Secundária ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* Gradiente */}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
            Gradiente
          </p>
          <div
            className="h-14 rounded-xl mb-4"
            style={{
              background: `linear-gradient(to right, ${proColors.gradiente.start}, ${proColors.gradiente.end})`,
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <ColorPaletteCard hex={proColors.gradiente.start} name="Início" role="Gradient Start" />
            <ColorPaletteCard hex={proColors.gradiente.end} name="Fim" role="Gradient End" />
          </div>
        </div>

      </div>
    )
  }

  // ── Produtos não-PRO ────────────────────────────────────────────────────────
  const palette = p.colors.palette as readonly string[]
  // subtons = índices 0, 2, 4, 6 (o que não é primary, sombra ou luz)
  const subtons = [palette[0], palette[2], palette[4], palette[6]]

  return (
    <div className="space-y-8">

      {/* Paleta completa — 7 cores */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-3">
          Paleta completa
        </p>
        <div className="flex rounded-xl overflow-hidden h-10">
          {palette.map((hex) => (
            <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
          ))}
        </div>
      </div>

      {/* Cor Principal */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
          Cor principal
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ColorPaletteCard
            hex={p.colors.primary}
            name="Principal"
            role="Cor da marca"
          />
        </div>
      </div>

      {/* Secundárias — Sombra + Luz */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
          Secundárias
        </p>
        <div className="grid grid-cols-2 gap-3">
          <ColorPaletteCard
            hex={p.colors.sombra}
            name="Sombra"
            role="Escuro · contraste"
          />
          <ColorPaletteCard
            hex={p.colors.luz}
            name="Luz"
            role="Claro · fundo tint"
          />
        </div>
      </div>

      {/* Subtons */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-4">
          Subtons
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {subtons.map((hex, i) => (
            <ColorPaletteCard key={hex} hex={hex} name={`Subtom ${i + 1}`} />
          ))}
        </div>
      </div>

    </div>
  )
}
