import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { ProductsOverview } from '@/components/products/ProductsOverview'

export default function ProdutosPage() {
  return (
    <main>
      <SectionHero
        title="Produtos"
        description="Cada produto Síndiconet tem sua própria identidade visual derivada da marca principal."
        breadcrumb={[
          { label: 'Identidade', href: '/identidade/logo' },
          { label: 'Produtos', href: '/identidade/produtos' },
        ]}
      />
      <SectionWrapper
        id="produtos"
        title="Os 6 produtos"
        description="Clique em um produto para explorar sua identidade visual completa."
        background="white"
      >
        <ProductsOverview />
      </SectionWrapper>
    </main>
  )
}
