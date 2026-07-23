import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { PhotoBankPanel } from '@/components/photography/PhotoBankPanel'

export default function BancoImagensPage() {
  return (
    <main>
      <SectionHero
        title="Banco de Imagens"
        description="Geracao de imagens com IA a partir dos pilares fotograficos da marca, com revisao semanal obrigatoria antes de qualquer imagem entrar no banco oficial."
        breadcrumb={[{ label: 'Banco de Imagens', href: '/banco-imagens' }]}
      />

      <SectionWrapper
        id="banco-imagens"
        title="Geracao e revisao"
        description="Gere novas imagens, revise o que foi gerado na semana e acompanhe o banco de imagens aprovadas."
        background="default"
      >
        <PhotoBankPanel />
      </SectionWrapper>
    </main>
  )
}
