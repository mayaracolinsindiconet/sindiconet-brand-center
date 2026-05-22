import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { PhotoPillarsSection } from '@/components/photography/PhotoPillarsSection'
import { MoodboardPanel } from '@/components/photography/MoodboardPanel'

export default function FotografiaPage() {
  return (
    <main>
      <SectionHero
        title="Fotografia"
        description="Três pilares definem o estilo visual da Síndiconet: Premium Silencioso, Editorial Corporativo Humano e Arquitetura como Símbolo."
        breadcrumb={[{ label: 'Fotografia', href: '/fotografia' }]}
      />

      <SectionWrapper
        id="pilares"
        title="Pilares fotográficos"
        description="Os três princípios que orientam toda a escolha e produção de imagens da marca."
        background="default"
      >
        <PhotoPillarsSection />
      </SectionWrapper>

      <SectionWrapper
        id="moodboard"
        title="Moodboard"
        description="Referências visuais organizadas por categoria e atributo. Adicione fotos em /data/photos.ts."
        background="white"
      >
        <MoodboardPanel />
      </SectionWrapper>
    </main>
  )
}
