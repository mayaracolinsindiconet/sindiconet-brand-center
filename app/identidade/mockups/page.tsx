import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'

export default function MockupsPage() {
  return (
    <main>
      <SectionHero
        title="Mockups"
        description="Visualizações da marca aplicada em materiais, superfícies e contextos reais."
        breadcrumb={[
          { label: 'Identidade', href: '/identidade/logo' },
          { label: 'Mockups', href: '/identidade/mockups' },
        ]}
      />
      <SectionWrapper id="mockups" background="white">
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <span className="text-4xl">🖼</span>
          <p className="font-headline font-bold text-xl text-[#101e37]">Em breve</p>
          <p className="font-body text-sm text-[#3D3D3D]/50 max-w-sm">
            Os mockups de aplicação da marca serão adicionados aqui.
          </p>
        </div>
      </SectionWrapper>
    </main>
  )
}
