'use client'

import { SafeSpaceSimulator } from './SafeSpaceSimulator'

const G  = 'rgba(62,119,219,0.38)'   // guide line
const GL = 'rgba(62,119,219,0.18)'   // guide line light
const LC = '#3e77db'                  // label colour

// ─── Grade de Construção ──────────────────────────────────────────────────────
function ConstructionGrid() {
  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">
      <div className="p-6 border-b border-black/8">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-1">
          Grade de Construção
        </p>
        <p className="font-body text-sm text-[#3D3D3D]/60 max-w-lg">
          O logotipo é construído em uma grade modular. O módulo base{' '}
          <strong className="text-[#101e37]">X</strong> é derivado da altura da
          letra "i" do wordmark e determina todas as proporções internas.
        </p>
      </div>

      {/* Logo com overlay de construção */}
      <div className="py-12 px-10 bg-white flex items-center justify-center">
        {/* Container com altura definida pelo SVG natural — sem overflow */}
        <div className="relative inline-block" style={{ width: 480 }}>

          {/* Logo — img direto para respeitar aspecto real do SVG */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logos/sindiconet-mista-colorida.svg"
            alt="Logo Síndiconet — grade de construção"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />

          {/* Caixa externa */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ border: `1.5px solid ${G}` }}
          />

          {/* Área do símbolo (esq. ~24%) com linhas geométricas de construção */}
          <div
            className="absolute top-0 bottom-0 left-0 pointer-events-none overflow-hidden"
            style={{ width: '24%' }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0"
            >
              {/* Diagonais principais */}
              <line x1="0" y1="0" x2="100" y2="100" stroke={GL} strokeWidth="1.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke={GL} strokeWidth="1.5" />
              {/* Cruzeta central */}
              <line x1="50" y1="0" x2="50" y2="100" stroke={GL} strokeWidth="1" strokeDasharray="5 3" />
              <line x1="0" y1="50" x2="100" y2="50" stroke={GL} strokeWidth="1" strokeDasharray="5 3" />
              {/* Linhas de quarto — proporções do hexágono */}
              <line x1="0" y1="25" x2="100" y2="25" stroke={GL} strokeWidth="0.7" strokeDasharray="3 4" opacity="0.7" />
              <line x1="0" y1="75" x2="100" y2="75" stroke={GL} strokeWidth="0.7" strokeDasharray="3 4" opacity="0.7" />
              <line x1="25" y1="0" x2="25" y2="100" stroke={GL} strokeWidth="0.7" strokeDasharray="3 4" opacity="0.7" />
              <line x1="75" y1="0" x2="75" y2="100" stroke={GL} strokeWidth="0.7" strokeDasharray="3 4" opacity="0.7" />
              {/* Diagonais secundárias (centro → arestas) */}
              <line x1="0"   y1="0"   x2="50" y2="50"  stroke={GL} strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
              <line x1="100" y1="0"   x2="50" y2="50"  stroke={GL} strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
              <line x1="0"   y1="100" x2="50" y2="50"  stroke={GL} strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
              <line x1="100" y1="100" x2="50" y2="50"  stroke={GL} strokeWidth="0.6" strokeDasharray="2 4" opacity="0.55" />
            </svg>
          </div>

          {/* Divisor vertical símbolo / wordmark */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: '24%', borderLeft: `1.5px dashed ${G}` }}
          />

          {/* Linha central horizontal */}
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ top: '50%', borderTop: `1px dashed ${GL}` }}
          />

          {/* Labels X nos 4 cantos */}
          {(['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'] as const).map((pos) => (
            <span
              key={pos}
              className={`absolute ${pos} text-[9px] font-mono font-bold leading-none select-none`}
              style={{ color: LC }}
            >
              X
            </span>
          ))}

          {/* Label Y no divisor */}
          <span
            className="absolute text-[9px] font-mono font-bold leading-none select-none"
            style={{ top: '36%', left: '25.5%', color: LC }}
          >
            Y
          </span>
        </div>
      </div>

      {/* Legenda */}
      <div className="px-10 pb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { mod: 'X', label: 'Módulo X', desc: 'Altura da letra "i" do logotipo. Unidade base de todas as proporções.' },
          { mod: 'Y', label: 'Módulo Y', desc: 'Espaço entre o monograma e a tipografia = largura de Y.' },
          { mod: 'Z', label: 'Módulo Z', desc: 'Módulo do símbolo = altura da letra "S" do monograma.' },
        ].map((item) => (
          <div key={item.mod} className="flex items-start gap-3">
            <span className="shrink-0 mt-0.5 w-6 h-6 rounded-lg bg-[#3e77db]/10 flex items-center justify-center font-mono text-[10px] font-bold text-[#3e77db]">
              {item.mod}
            </span>
            <div>
              <p className="font-headline font-bold text-sm text-[#101e37]">{item.label}</p>
              <p className="font-body text-xs text-[#3D3D3D]/55 leading-relaxed mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Área de Segurança — 3 previews estáticos ─────────────────────────────────
function SafeSpaceSection() {
  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">

      {/* Header + descrição */}
      <div className="p-6 border-b border-black/8">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-1">
          Área de Segurança
        </p>
        <p className="font-body text-sm text-[#3D3D3D]/60 mb-4 max-w-2xl">
          Para preservar a visibilidade da marca, nenhum elemento gráfico deve ultrapassar
          a área delimitada.
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-1.5">
          {[
            ['X', 'O módulo X equivale à altura da letra "i" do logo.'],
            ['Y', 'O espaço entre monograma e tipografia equivale à largura de Y.'],
            ['W', 'O espaço entre monograma e tipografia equivale à altura de W.'],
            ['Z', 'O módulo Z equivale à altura da letra "S" do monograma.'],
          ].map(([mod, text], i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-[#3e77db]/10 flex items-center justify-center font-mono text-[8px] font-bold text-[#3e77db]">
                {mod}
              </span>
              <span className="text-xs font-body text-[#3D3D3D]/60 leading-relaxed">{text}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 3 previews */}
      <div className="p-6 space-y-4">

        {/* 1 · Mista — tamanho padrão */}
        <SafePreview
          variant="mista"
          logoW={280}
          safeMargin={18}
          cornerLabel="X"
          topBottomLabel="X"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 2 · Mista — com label W */}
          <SafePreview
            variant="mista"
            logoW={180}
            safeMargin={14}
            cornerLabel="X"
            topBottomLabel="W"
            leftRightLabel="X"
          />
          {/* 3 · Símbolo */}
          <SafePreview
            variant="simbolo"
            logoW={52}
            safeMargin={14}
            cornerLabel="Z"
            topBottomLabel="Z"
            leftRightLabel="Z"
          />
        </div>
      </div>
    </div>
  )
}

interface SafePreviewProps {
  variant: 'mista' | 'simbolo'
  logoW: number
  safeMargin: number
  cornerLabel: string
  topBottomLabel?: string
  leftRightLabel?: string
}

function SafePreview({
  variant, logoW, safeMargin,
  cornerLabel, topBottomLabel, leftRightLabel,
}: SafePreviewProps) {
  const borderColor = 'rgba(62,119,219,0.5)'
  const labelColor  = '#3e77db'
  const pad = safeMargin + 24  // padding so corner labels aren't clipped

  return (
    <div
      className="bg-[#F9FAFB] rounded-xl flex items-center justify-center border border-black/5"
      style={{ padding: pad }}
    >
      {/* Logo — inline-block so container height = natural SVG height */}
      <div className="relative inline-block" style={{ width: logoW }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/assets/logos/sindiconet-${variant}-colorida.svg`}
          alt=""
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Caixa interna sólida do logo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ border: `1px solid ${borderColor}` }}
        />

        {/* Borda dashed da área de segurança */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: -safeMargin,
            border: `1.5px dashed ${borderColor}`,
          }}
        >
          {/* Labels nos 4 cantos */}
          <span className="absolute text-[8px] font-mono font-bold leading-none" style={{ top: -2, left: -2, transform: 'translate(-100%,-100%)', color: labelColor }}>{cornerLabel}</span>
          <span className="absolute text-[8px] font-mono font-bold leading-none" style={{ top: -2, right: -2, transform: 'translate(100%,-100%)', color: labelColor }}>{cornerLabel}</span>
          <span className="absolute text-[8px] font-mono font-bold leading-none" style={{ bottom: -2, left: -2, transform: 'translate(-100%,100%)', color: labelColor }}>{cornerLabel}</span>
          <span className="absolute text-[8px] font-mono font-bold leading-none" style={{ bottom: -2, right: -2, transform: 'translate(100%,100%)', color: labelColor }}>{cornerLabel}</span>

          {/* Label top / bottom */}
          {topBottomLabel && (
            <>
              <span className="absolute left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold leading-none" style={{ top: -2, transform: 'translate(-50%,-130%)', color: labelColor }}>{topBottomLabel}</span>
              <span className="absolute left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold leading-none" style={{ bottom: -2, transform: 'translate(-50%,130%)', color: labelColor }}>{topBottomLabel}</span>
            </>
          )}

          {/* Label left / right */}
          {leftRightLabel && (
            <>
              <span className="absolute top-1/2 -translate-y-1/2 text-[8px] font-mono font-bold leading-none" style={{ left: -2, transform: 'translate(-130%,-50%)', color: labelColor }}>{leftRightLabel}</span>
              <span className="absolute top-1/2 -translate-y-1/2 text-[8px] font-mono font-bold leading-none" style={{ right: -2, transform: 'translate(130%,-50%)', color: labelColor }}>{leftRightLabel}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Redução Mínima ───────────────────────────────────────────────────────────
function MinimumSizes() {
  const sizes = [
    {
      label: 'Versão mista',
      src: '/assets/logos/sindiconet-mista-colorida.svg',
      digital: '45px',
      print: '3cm',
      width: 140,
      height: 32,
      note: 'Uso padrão em digital e impresso.',
    },
    {
      label: 'Versão mista — mínimo',
      src: '/assets/logos/sindiconet-mista-colorida.svg',
      digital: '30px',
      print: '2cm',
      width: 90,
      height: 20,
      note: 'Apenas quando o espaço for muito limitado.',
    },
    {
      label: 'Símbolo',
      src: '/assets/logos/sindiconet-simbolo-colorida.svg',
      digital: '20px',
      print: '1cm',
      width: 28,
      height: 28,
      note: 'Favicon, app icon, avatar.',
    },
  ]

  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">
      <div className="p-6 border-b border-black/8">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-1">
          Redução Mínima
        </p>
        <p className="font-body text-sm text-[#3D3D3D]/60 max-w-lg">
          Abaixo dos tamanhos indicados a legibilidade fica comprometida. Nunca use o logo menor do que os limites definidos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-black/8">
        {sizes.map((s) => (
          <div key={s.label} className="p-8 flex flex-col items-center gap-6">
            <div className="flex items-center justify-center bg-[#F4F6F8] rounded-xl w-full h-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.label} style={{ width: s.width, height: 'auto' }} />
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-sm text-[#101e37] bg-[#F4F6F8] px-3 py-1.5 rounded-lg">
                {s.digital}
              </span>
              <span className="text-xs text-[#3D3D3D]/35 font-body">|</span>
              <span className="font-mono font-bold text-sm text-[#101e37] bg-[#F4F6F8] px-3 py-1.5 rounded-lg">
                {s.print}
              </span>
            </div>

            <div className="text-center">
              <p className="font-headline font-bold text-sm text-[#101e37] mb-1">{s.label}</p>
              <p className="font-body text-xs text-[#3D3D3D]/50 leading-relaxed">{s.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-6 mb-6 flex items-start gap-3 bg-[#fdefd4] rounded-xl px-4 py-3">
        <span className="text-[#7b5f29] font-bold text-base shrink-0">⚠</span>
        <p className="font-body text-xs text-[#7b5f29] leading-relaxed">
          Em tamanhos menores que os limites mínimos, use sempre o arquivo SVG vetorial para garantir nitidez em qualquer resolução.
        </p>
      </div>
    </div>
  )
}

// ─── Simulador interativo ─────────────────────────────────────────────────────
function SimulatorSection() {
  return (
    <div>
      <div className="mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body">
          Simulador interativo
        </p>
        <p className="font-body text-sm text-[#3D3D3D]/55 mt-0.5">
          Teste o logo em diferentes fundos e escalas com os guias de construção e área de segurança sobrepostos.
        </p>
      </div>
      <SafeSpaceSimulator />
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function LogoConstructionSection() {
  return (
    <div className="space-y-6">
      <ConstructionGrid />
      <SafeSpaceSection />
      <MinimumSizes />
      <SimulatorSection />
    </div>
  )
}
