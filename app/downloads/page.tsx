import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { AssetGrid } from '@/components/downloads/AssetGrid'

export default function DownloadsPage() {
  return (
    <main>
      <SectionHero
        title="Downloads"
        description="Todos os assets da marca — logos, ícones, fontes e templates — prontos para uso."
        breadcrumb={[{ label: 'Downloads', href: '/downloads' }]}
      />
      <SectionWrapper
        id="assets"
        title="Assets disponíveis"
        description="Filtre por tipo, formato ou produto. Clique em Baixar para fazer o download."
        background="white"
      >
        <AssetGrid />
      </SectionWrapper>
    </main>
  )
}
