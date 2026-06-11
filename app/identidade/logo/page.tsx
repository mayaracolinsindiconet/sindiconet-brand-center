'use client'

import { SectionHero } from '@/components/layout/SectionHero'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { LogoVariantGrid } from '@/components/logo/LogoVariantGrid'
import { ProLogoGrid } from '@/components/logo/ProLogoGrid'
import { LogoConstructionSection } from '@/components/logo/LogoConstructionSection'

export default function LogoPage() {
  return (
    <main>
      <SectionHero
        title="Logo"
        description="Variações, modos de cor, grade de construção e área de segurança do logotipo Síndiconet."
        breadcrumb={[
          { label: 'Identidade', href: '/identidade/logo' },
          { label: 'Logo', href: '/identidade/logo' },
        ]}
      />

      <SectionWrapper
        id="variacoes"
        title="Variações — Marca Principal"
        description="3 variações × 3 modos de cor do logotipo Síndiconet."
        background="white"
      >
        <LogoVariantGrid onSelect={() => {}} />
      </SectionWrapper>

      <SectionWrapper
        id="variacoes-pro"
        title="Variações — PRO"
        description="Versões exclusivas do logotipo Síndiconet PRO com identidade cromática própria."
        background="default"
      >
        <ProLogoGrid />
      </SectionWrapper>

      <SectionWrapper
        id="construcao"
        title="Construção & Segurança"
        description="Grade de construção, área de segurança interativa e limites de redução do logotipo."
        background="default"
      >
        <LogoConstructionSection />
      </SectionWrapper>

      <SectionWrapper
        id="regras"
        title="Regras de uso"
        background="default"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RuleCard
            type="correct"
            title="Uso correto"
            rules={[
              'Sempre respeitar a área de segurança mínima de 2X',
              'Usar a variação adequada ao contexto (mista para uso geral, símbolo para espaços reduzidos)',
              'Garantir contraste suficiente entre o logo e o fundo',
              'Versão branca em fundos escuros ou fotográficos',
              'Manter as proporções originais ao redimensionar',
            ]}
          />
          <RuleCard
            type="incorrect"
            title="O que evitar"
            rules={[
              'Não distorcer ou alterar as proporções do logo',
              'Não aplicar cores fora do sistema de identidade',
              'Não usar o logo sobre fundos de baixo contraste',
              'Não adicionar efeitos como sombra, contorno ou gradiente',
              'Não recriar o logo ou substituir a tipografia',
            ]}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="usos-incorretos"
        title="Exemplos de uso incorreto"
        description="Nunca aplique o logotipo nestas situações."
        background="white"
      >
        <IncorrectUsageGrid />
      </SectionWrapper>
    </main>
  )
}

// ─── Incorrect usage examples ──────────────────────────────────────────────

const INCORRECT_EXAMPLES = [
  {
    id: 'distorted',
    label: 'Não distorcer proporções',
    description: 'O logo nunca deve ser esticado ou comprimido horizontalmente.',
    imgStyle: { transform: 'scaleX(1.65)', transformOrigin: 'center' },
    bg: '#F4F6F8',
  },
  {
    id: 'rotated',
    label: 'Não rotacionar',
    description: 'O logo deve sempre estar na posição horizontal padrão.',
    imgStyle: { transform: 'rotate(20deg)' },
    bg: '#F4F6F8',
  },
  {
    id: 'low-contrast',
    label: 'Não usar em baixo contraste',
    description: 'Evite fundos que se confundam com as cores do logotipo.',
    imgStyle: {},
    bg: '#A8C0E8',
  },
  {
    id: 'shadow',
    label: 'Não adicionar sombra ou efeitos',
    description: 'Nenhum efeito visual deve ser aplicado sobre o logo.',
    imgStyle: { filter: 'drop-shadow(4px 6px 10px rgba(0,0,0,0.55))' },
    bg: '#F4F6F8',
  },
  {
    id: 'recolored',
    label: 'Não alterar as cores',
    description: 'Usar apenas as variações de cor oficiais do sistema de identidade.',
    imgStyle: { filter: 'hue-rotate(130deg) saturate(2.2)' },
    bg: '#F4F6F8',
  },
  {
    id: 'opacity',
    label: 'Não usar com baixa opacidade',
    description: 'O logotipo nunca deve ser aplicado com transparência.',
    imgStyle: { opacity: 0.22 },
    bg: '#F4F6F8',
  },
]

function IncorrectUsageGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {INCORRECT_EXAMPLES.map((ex) => (
        <div
          key={ex.id}
          className="rounded-2xl overflow-hidden border border-[#e89e95]/50"
        >
          {/* Preview area */}
          <div
            className="relative flex items-center justify-center h-32 overflow-hidden"
            style={{ backgroundColor: ex.bg }}
          >
            {/* Red X badge */}
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#D13D2A] flex items-center justify-center z-10 shadow-sm">
              <span className="text-white text-[10px] font-bold leading-none">✕</span>
            </div>
            {/* Logo with incorrect treatment */}
            <div style={ex.imgStyle as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/logos/sindiconet-mista-colorida.svg"
                alt={ex.label}
                width={140}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
          {/* Label */}
          <div className="bg-[#f3cfca]/30 px-4 py-3 border-t border-[#e89e95]/30">
            <p className="text-xs font-semibold font-body text-[#691f15] mb-0.5">
              {ex.label}
            </p>
            <p className="text-xs font-body text-[#3D3D3D]/60 leading-relaxed">
              {ex.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Rule card ─────────────────────────────────────────────────────────────

function RuleCard({ type, title, rules }: { type: 'correct' | 'incorrect'; title: string; rules: string[] }) {
  const isCorrect = type === 'correct'
  return (
    <div className={`rounded-2xl p-6 border ${isCorrect ? 'border-[#a0d7c4] bg-[#d0ebe2]/30' : 'border-[#e89e95] bg-[#f3cfca]/30'}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-sm font-semibold ${isCorrect ? 'text-[#215745]' : 'text-[#691f15]'}`}>
          {isCorrect ? '✓' : '✗'} {title}
        </span>
      </div>
      <ul className="space-y-2">
        {rules.map((rule, i) => (
          <li key={i} className="flex items-start gap-2 text-sm font-body text-[#3D3D3D]/70">
            <span className={`shrink-0 mt-0.5 ${isCorrect ? 'text-[#318367]' : 'text-[#D13D2A]'}`}>
              {isCorrect ? '·' : '·'}
            </span>
            {rule}
          </li>
        ))}
      </ul>
    </div>
  )
}
