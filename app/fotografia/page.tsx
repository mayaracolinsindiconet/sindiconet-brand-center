import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { PhotoPillarsSection } from '@/components/photography/PhotoPillarsSection'
import { MoodboardPanel } from '@/components/photography/MoodboardPanel'
import { PromptCreator } from '@/components/photography/PromptCreator'

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
        id="biblioteca-de-fotos"
        title="Biblioteca de fotos"
        description="Referências visuais organizadas por pilar, categoria e atributo."
        background="white"
      >
        <MoodboardPanel />
      </SectionWrapper>

      <SectionWrapper
        id="criador-de-prompt"
        title="Criador de prompt"
        description="Descreva o que precisa fotografar, selecione o estilo visual e receba um prompt otimizado para geração de imagem com IA."
        background="default"
      >
        <PromptCreator />
      </SectionWrapper>
    </main>
  )
}
