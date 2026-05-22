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
    </main>
  )
}

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
