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
        id="diretriz"
        title="Diretriz oficial"
        description="Para manter consistência visual em toda a marca, o Síndiconet adota uma única biblioteca de ícones oficial."
        background="white"
      >
        <div className="rounded-2xl border border-black/8 bg-gradient-to-br from-[#3e77db]/5 to-white p-6 mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3e77db] font-body mb-2">
            Biblioteca oficial
          </p>
          <p className="font-headline font-bold text-xl text-[#101e37] mb-2">Streamline Regular</p>
          <p className="font-body text-sm text-[#3D3D3D]/65 leading-relaxed mb-4">
            Família de ícones de linha (line icons), traço uniforme, cantos levemente arredondados e estilo
            minimalista — alinhada à sofisticação sóbria da identidade visual Síndiconet. Nenhum outro pacote
            de ícones (Font Awesome, Material Icons, Feather, Heroicons, etc.) deve ser usado em materiais de
            marca, produtos ou conteúdo.
          </p>
          <a
            href="https://www.streamlinehq.com/icons/streamline-regular"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold font-body text-[#3e77db] hover:text-[#1f3c6e] transition-colors"
          >
            streamlinehq.com/icons/streamline-regular
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">
          Regras de uso
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Fonte única', desc: 'Todo novo ícone precisa vir da família Streamline Regular. Não misturar com outras bibliotecas, mesmo em pequenos detalhes ou ícones pontuais.' },
            { title: 'Estilo "Regular"', desc: 'Usar sempre a variante Regular (traço fino/médio), evitando Bold, Filled ou outras variações que fujam do padrão visual leve e sofisticado da marca.' },
            { title: 'Cor herdada', desc: 'Ícones devem herdar a cor do contexto (azul #101e37, cinza #6C757D ou branco #F4F6F8), sem cores próprias ou gradientes.' },
            { title: 'Peso visual', desc: 'Manter proporção e peso de traço consistentes entre ícones usados lado a lado, para não gerar ruído visual na composição.' },
          ].map((r) => (
            <div key={r.title} className="rounded-2xl border border-black/8 bg-white p-6">
              <p className="font-headline font-bold text-base text-[#101e37] mb-1.5">{r.title}</p>
              <p className="font-body text-sm text-[#3D3D3D]/60 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="biblioteca"
        title="Biblioteca"
        description="Filtre por categoria, busque por nome, copie o SVG ou baixe o PNG."
        background="default"
      >
        <IconLibrary />
      </SectionWrapper>
    </main>
  )
}
