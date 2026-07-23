import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { PhotoBankPanel } from '@/components/photography/PhotoBankPanel'

export default function BancoImagensPage() {
  return (
    <main>
      <SectionHero
        title="Banco de Imagens"
        description="Gere imagens com IA seguindo os pilares fotograficos da marca e explore as imagens aprovadas do banco."
        breadcrumb={[{ label: 'Banco de Imagens', href: '/banco-imagens' }]}
      />

      <SectionWrapper
        id="banco-imagens"
        title="Gerar imagens"
        description="Descreva a cena, escolha o formato e confirme o prompt para gerar a imagem. Ao lado, as imagens ja aprovadas para uso."
        background="default"
      >
        <PhotoBankPanel />
      </SectionWrapper>
    </main>
  )
}
