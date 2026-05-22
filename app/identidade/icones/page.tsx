import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { IconLibrary } from '@/components/icons/IconLibrary'

export default function IconesPage() {
  return (
    <main>
      <SectionHero
        title="Ícones"
        description="Biblioteca de ícones da marca Síndiconet e dos seus produtos."
        breadcrumb={[
          { label: 'Identidade', href: '/identidade/logo' },
          { label: 'Ícones', href: '/identidade/icones' },
        ]}
      />
      <SectionWrapper
        id="biblioteca"
        title="Biblioteca"
        description="Filtre por categoria, busque por nome, copie o SVG ou baixe o PNG."
        background="white"
      >
        <IconLibrary />
      </SectionWrapper>
    </main>
  )
}
