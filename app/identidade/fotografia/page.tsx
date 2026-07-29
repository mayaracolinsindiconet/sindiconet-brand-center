import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { PhotoPillarsSection } from '@/components/photography/PhotoPillarsSection'

export default function FotografiaPage() {
  return (
    <main>
      <SectionHero
        title="Fotografia"
        description="Os pilares fotográficos que orientam toda produção de imagem da marca, humana ou gerada por IA."
        breadcrumb={[
          { label: 'Identidade', href: '/identidade/logo' },
          { label: 'Fotografia', href: '/identidade/fotografia' },
        ]}
      />
      <SectionWrapper
        id="pilares"
        title="Pilares fotográficos"
        description="Três direções que sustentam toda a linguagem visual fotográfica do Síndiconet."
        background="white"
      >
        <PhotoPillarsSection />
      </SectionWrapper>
    </main>
  )
}
