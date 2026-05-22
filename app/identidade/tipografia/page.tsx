import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { TypographyShowcase } from '@/components/typography/TypographyShowcase'
import { TypographyScaleTable } from '@/components/typography/TypographyScaleTable'

export default function TipografiaPage() {
  return (
    <main>
      <SectionHero
        title="Tipografia"
        description="Stack Sans para headlines. Open Sans para corpo de texto. Uma hierarquia clara e consistente."
        breadcrumb={[
          { label: 'Identidade', href: '/identidade/logo' },
          { label: 'Tipografia', href: '/identidade/tipografia' },
        ]}
      />

      <SectionWrapper
        id="showcase"
        title="Espécime interativa"
        description="Explore as famílias tipográficas, pesos e tamanhos. Edite o texto de preview e copie o CSS."
        background="white"
      >
        <TypographyShowcase />
      </SectionWrapper>

      <SectionWrapper
        id="escala"
        title="Escala tipográfica"
        description="Os estilos tipográficos definidos para o sistema de design Síndiconet."
        background="default"
      >
        <TypographyScaleTable />
      </SectionWrapper>

      <SectionWrapper id="fontes" title="Fontes do sistema" background="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FontCard
            name="Stack Sans Headline"
            role="Headlines & Display"
            weights={['Regular 400', 'Medium 500', 'Bold 700']}
            specimen="Gestão condominial inteligente."
            fontFamily='var(--font-headline)'
            usages={['Hero sections', 'Manifesto', 'Título de página', 'Título de seção', 'Etiquetas de seção', 'Tags']}
            note="Self-hosted. Arquivos TTF em /public/assets/fonts/"
          />
          <FontCard
            name="Open Sans"
            role="Body & Interface"
            weights={['Regular 400', 'Medium 500', 'Bold 700']}
            specimen="Tecnologia para síndicos e moradores."
            fontFamily='var(--font-body)'
            usages={['Texto corrido', 'Leads', 'Texto padrão', 'Texto secundário', 'Legendas', 'Labels']}
            note="Carregada via Next.js Font Optimization (Google Fonts)."
          />
        </div>
      </SectionWrapper>
    </main>
  )
}

function FontCard({
  name, role, weights, specimen, fontFamily, usages, note,
}: {
  name: string
  role: string
  weights: string[]
  specimen: string
  fontFamily: string
  usages: string[]
  note: string
}) {
  return (
    <div className="rounded-2xl border border-black/8 overflow-hidden">
      {/* Specimen */}
      <div className="bg-[#101e37] px-8 py-10">
        <p className="font-body text-white/40 text-xs mb-3">{role}</p>
        <p className="text-white text-2xl leading-snug" style={{ fontFamily, fontWeight: 700 }}>
          {specimen}
        </p>
        {/* Weight samples */}
        <div className="flex gap-6 mt-6">
          {([400, 500, 700] as const).map((w) => (
            <span key={w} className="text-white/60 text-sm" style={{ fontFamily, fontWeight: w }}>
              {w === 400 ? 'Regular' : w === 500 ? 'Medium' : 'Bold'}
            </span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-white p-6 space-y-4">
        <div>
          <p className="font-headline font-bold text-lg text-[#101e37]">{name}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {weights.map((w) => (
              <span key={w} className="text-[10px] font-mono bg-[#F4F6F8] text-[#3D3D3D]/60 px-2 py-1 rounded-md">{w}</span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-2">
            Usado em
          </p>
          <div className="flex flex-wrap gap-1.5">
            {usages.map((u) => (
              <span key={u} className="text-[10px] font-body bg-[#3e77db]/8 text-[#3e77db] px-2 py-0.5 rounded-md font-medium">
                {u}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs font-body text-[#3D3D3D]/35">{note}</p>
      </div>
    </div>
  )
}
