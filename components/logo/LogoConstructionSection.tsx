'use client'

import { SafeSpaceSimulator } from './SafeSpaceSimulator'

// ─── Grade de Construção ──────────────────────────────────────────────────────
function ConstructionGrid() {
  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">
      <div className="p-6 border-b border-black/8">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-1">
          Grade de Construção
        </p>
      </div>
      <div className="py-10 px-8 bg-white flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logos/sindiconet-gride-construcao.svg"
          alt="Grade de construção do logotipo Síndiconet"
          style={{ width: '100%', maxWidth: 600, height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}

// ─── Área de Segurança ────────────────────────────────────────────────────────
function SafeSpaceSection() {
  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">
      <div className="p-6 border-b border-black/8">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-1">
          Área de Segurança
        </p>
        <p className="font-body text-sm text-[#3D3D3D]/60 mb-4 max-w-2xl">
          Para preservar a visibilidade da marca, nenhum elemento gráfico deve ultrapassar
          a área delimitada. O módulo <strong className="text-[#101e37]">X</strong> equivale
          à altura da letra "i" do logo e define o espaçamento mínimo em todos os lados.
        </p>
      </div>
      <div className="py-10 px-8 bg-[#F9FAFB] flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/logos/sindiconet-margem-seguranca.svg"
          alt="Margem de segurança do logotipo Síndiconet"
          style={{ width: '100%', maxWidth: 600, height: 'auto', display: 'block' }}
        />
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
      note: 'Uso padrão em digital e impresso.',
    },
    {
      label: 'Versão mista — mínimo',
      src: '/assets/logos/sindiconet-mista-colorida.svg',
      digital: '30px',
      print: '2cm',
      width: 90,
      note: 'Apenas quando o espaço for muito limitado.',
    },
    {
      label: 'Símbolo',
      src: '/assets/logos/sindiconet-simbolo-colorida.svg',
      digital: '20px',
      print: '1cm',
      width: 28,
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
