'use client'

import { useState } from 'react'
import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { BrandPaletteSection } from '@/components/colors/BrandPaletteSection'
import { ProductPaletteSection } from '@/components/colors/ProductPaletteSection'
import { ProductSwitcher } from '@/components/shared/ProductSwitcher'
import type { ProductSlug } from '@/tokens/products'

export default function CoresPage() {
  const [activeProduct, setActiveProduct] = useState<ProductSlug>('conteudo')

  return (
    <main>
      <SectionHero
        title="Cores"
        description="A paleta Síndiconet e as identidades cromáticas de cada produto."
        breadcrumb={[
          { label: 'Identidade', href: '/identidade/logo' },
          { label: 'Cores', href: '/identidade/cores' },
        ]}
      />

      <SectionWrapper
        id="paleta-marca"
        title="Paleta da marca"
        description="As cores institucionais da Síndiconet. Clique em qualquer cor para copiar o valor HEX."
        background="white"
      >
        <BrandPaletteSection />
      </SectionWrapper>

      <SectionWrapper
        id="paletas-produto"
        title="Paletas por produto"
        description="Cada produto tem sua própria identidade cromática derivada da paleta da marca, seguindo a proporção 60 · 30 · 10."
        background="default"
      >
        <div className="mb-8">
          <ProductSwitcher activeProduct={activeProduct} onChange={setActiveProduct} />
        </div>
        <ProductPaletteSection product={activeProduct} />
      </SectionWrapper>
    </main>
  )
}
