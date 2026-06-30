'use client'

import { useState } from 'react'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────
type Brand    = 'sindiconet' | 'pro'
type BgOption = 'branco' | 'cinza' | 'preto' | 'azul' | 'escuro'
type ProBgOption = 'branco' | 'cinza' | 'primario' | 'sombra' | 'escuro'
type LogoGroup = 'all' | 'mista' | 'simbolo' | 'box'

interface LogoOption {
  key:             string
  label:           string
  src:             string
  darkRecommended: boolean  // true = branca/dark = para fundos escuros
  group:           Exclude<LogoGroup, 'all'>
}

// ─── Síndiconet logos ─────────────────────────────────────────────────────────
const sindiLogos: LogoOption[] = [
  { key: 'mista-colorida',          label: 'Mista · Colorida',          src: '/assets/logos/sindiconet-mista-colorida.svg',          darkRecommended: false, group: 'mista' },
  { key: 'mista-cinza',             label: 'Mista · Cinza',             src: '/assets/logos/sindiconet-mista-cinza.svg',             darkRecommended: false, group: 'mista' },
  { key: 'mista-branca',            label: 'Mista · Branca',            src: '/assets/logos/sindiconet-mista-branca.svg',            darkRecommended: true,  group: 'mista' },
  { key: 'mista-preta',             label: 'Mista · Preta',             src: '/assets/logos/sindiconet-mista-preta.svg',             darkRecommended: false, group: 'mista' },
  { key: 'mista-headline-colorida', label: 'Com Headline · Colorida',   src: '/assets/logos/sindiconet-mista-headline-colorida.svg', darkRecommended: false, group: 'mista' },
  { key: 'mista-headline-cinza',    label: 'Com Headline · Cinza',      src: '/assets/logos/sindiconet-mista-headline-cinza.svg',    darkRecommended: false, group: 'mista' },
  { key: 'mista-headline-branca',   label: 'Com Headline · Branca',     src: '/assets/logos/sindiconet-mista-headline-branca.svg',   darkRecommended: true,  group: 'mista' },
  { key: 'mista-headline-preta',    label: 'Com Headline · Preta',      src: '/assets/logos/sindiconet-mista-headline-preta.svg',    darkRecommended: false, group: 'mista' },
  { key: 'simbolo-colorida',        label: 'Símbolo · Colorida',        src: '/assets/logos/sindiconet-simbolo-colorida.svg',        darkRecommended: false, group: 'simbolo' },
  { key: 'simbolo-cinza',           label: 'Símbolo · Cinza',           src: '/assets/logos/sindiconet-simbolo-cinza.svg',           darkRecommended: false, group: 'simbolo' },
  { key: 'simbolo-branca',          label: 'Símbolo · Branca',          src: '/assets/logos/sindiconet-simbolo-branca.svg',          darkRecommended: true,  group: 'simbolo' },
  { key: 'simbolo-preta',           label: 'Símbolo · Preta',           src: '/assets/logos/sindiconet-simbolo-preta.svg',           darkRecommended: false, group: 'simbolo' },
]

// ─── PRO logos ────────────────────────────────────────────────────────────────
const proLogos: LogoOption[] = [
  { key: 'pro-mista-colorida',    label: 'Mista · Colorida',   src: '/assets/logos/pro/pro-mista-colorida.svg',    darkRecommended: false, group: 'mista' },
  { key: 'pro-mista-cinza',       label: 'Mista · Cinza',      src: '/assets/logos/pro/pro-mista-cinza.svg',       darkRecommended: false, group: 'mista' },
  { key: 'pro-mista-branca',      label: 'Mista · Branca',     src: '/assets/logos/pro/pro-mista-branca.svg',      darkRecommended: true,  group: 'mista' },
  { key: 'pro-mista-dark',        label: 'Mista · Dark',       src: '/assets/logos/pro/pro-mista-dark.svg',        darkRecommended: true,  group: 'mista' },
  { key: 'pro-mista-outline',     label: 'Mista · Outline',    src: '/assets/logos/pro/pro-mista-outline.svg',     darkRecommended: false, group: 'mista' },
  { key: 'pro-simbolo-colorida',  label: 'Símbolo · Colorida', src: '/assets/logos/pro/pro-simbolo-colorida.svg',  darkRecommended: false, group: 'simbolo' },
  { key: 'pro-simbolo-gradient',  label: 'Símbolo · Gradient', src: '/assets/logos/pro/pro-simbolo-gradient.svg',  darkRecommended: false, group: 'simbolo' },
  { key: 'pro-simbolo-branca',    label: 'Símbolo · Branca',   src: '/assets/logos/pro/pro-simbolo-branca.svg',    darkRecommended: true,  group: 'simbolo' },
  { key: 'pro-simbolo-branca-1',  label: 'Símbolo · Branca 2', src: '/assets/logos/pro/pro-simbolo-branca-1.svg',  darkRecommended: true,  group: 'simbolo' },
  { key: 'pro-simbolo-cinza',     label: 'Símbolo · Cinza',    src: '/assets/logos/pro/pro-simbolo-cinza.svg',     darkRecommended: false, group: 'simbolo' },
  { key: 'pro-simbolo-cinza-1',   label: 'Símbolo · Cinza 2',  src: '/assets/logos/pro/pro-simbolo-cinza-1.svg',   darkRecommended: false, group: 'simbolo' },
  { key: 'pro-box-roxo-2',        label: 'Box · Roxo',         src: '/assets/logos/pro/pro-box-roxo-2.svg',        darkRecommended: false, group: 'box' },
  { key: 'pro-box-branca',        label: 'Box · Branca',       src: '/assets/logos/pro/pro-box-branca.svg',        darkRecommended: true,  group: 'box' },
  { key: 'pro-box-branca-1',      label: 'Box · Branca 2',     src: '/assets/logos/pro/pro-box-branca-1.svg',      darkRecommended: true,  group: 'box' },
  { key: 'pro-box-cinza',         label: 'Box · Cinza',        src: '/assets/logos/pro/pro-box-cinza.svg',         darkRecommended: false, group: 'box' },
  { key: 'pro-box-cinza-1',       label: 'Box · Cinza 2',      src: '/assets/logos/pro/pro-box-cinza-1.svg',       darkRecommended: false, group: 'box' },
  { key: 'pro-box-3',             label: 'Box · Dark',         src: '/assets/logos/pro/pro-box-3.svg',             darkRecommended: false, group: 'box' },
]

// ─── Backgrounds ──────────────────────────────────────────────────────────────
const bgStyles: Record<BgOption, { style: React.CSSProperties; label: string; dark: boolean }> = {
  branco: { style: { backgroundColor: '#FFFFFF' }, label: 'Branco',       dark: false },
  cinza:  { style: { backgroundColor: '#F4F6F8' }, label: 'Cinza claro',  dark: false },
  preto:  { style: { backgroundColor: '#0d0d0d' }, label: 'Preto',        dark: true  },
  azul:   { style: { backgroundColor: '#3e77db' }, label: 'Azul',         dark: true  },
  escuro: { style: { backgroundColor: '#3d3d3d' }, label: 'Cinza escuro', dark: true  },
}

const proBgStyles: Record<ProBgOption, { style: React.CSSProperties; label: string; dark: boolean }> = {
  branco:  { style: { backgroundColor: '#FFFFFF' }, label: 'Branco',   dark: false },
  cinza:   { style: { backgroundColor: '#F4F6F8' }, label: 'Cinza',    dark: false },
  primario:{ style: { backgroundColor: '#7441AC' }, label: 'Primário', dark: true  },
  sombra:  { style: { backgroundColor: '#3A2156' }, label: 'Sombra',   dark: true  },
  escuro:  { style: { backgroundColor: '#1D102B' }, label: 'Escuro',   dark: true  },
}

export interface SafeSpaceSimulatorProps {
  initialVariant?:   string
  initialColorMode?: string
}

export function SafeSpaceSimulator(_props: SafeSpaceSimulatorProps) {
  const [brand, setBrand]         = useState<Brand>('sindiconet')
  const [group, setGroup]         = useState<LogoGroup>('all')
  const [selectedKey, setSelectedKey] = useState<string>('mista-colorida')
  const [bg, setBg]               = useState<BgOption>('branco')
  const [proBg, setProBg]         = useState<ProBgOption>('branco')
  const [scale, setScale]         = useState(100)
  const [imgError, setImgError]   = useState(false)

  const logos    = brand === 'sindiconet' ? sindiLogos : proLogos
  const filtered = group === 'all' ? logos : logos.filter((l) => l.group === group)
  const selected = logos.find((l) => l.key === selectedKey) ?? logos[0]

  const activeBgInfo = brand === 'pro' ? proBgStyles[proBg] : bgStyles[bg]
  const isDark  = activeBgInfo.dark
  const correct = selected.darkRecommended === isDark

  // groups available for current brand
  const groups: { key: LogoGroup; label: string }[] = brand === 'sindiconet'
    ? [{ key: 'all', label: 'Todos' }, { key: 'mista', label: 'Mista' }, { key: 'simbolo', label: 'Símbolo' }]
    : [{ key: 'all', label: 'Todos' }, { key: 'mista', label: 'Mista' }, { key: 'simbolo', label: 'Símbolo' }, { key: 'box', label: 'Box' }]

  function selectBrand(b: Brand) {
    setBrand(b)
    setGroup('all')
    setSelectedKey(b === 'sindiconet' ? 'mista-colorida' : 'pro-mista-colorida')
    setImgError(false)
  }

  const accentColor = brand === 'pro' ? '#7441AC' : '#3e77db'

  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="p-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-4">
          {(['sindiconet', 'pro'] as Brand[]).map((b) => (
            <button key={b} onClick={() => selectBrand(b)} aria-pressed={brand === b}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ${
                brand === b
                  ? b === 'pro' ? 'bg-[#7441AC] text-white' : 'bg-[#3e77db] text-white'
                  : 'bg-[#F4F6F8] text-[#3D3D3D]/70 hover:bg-[#e8edf3]'
              }`}>
              {b === 'pro' ? 'PRO' : 'Síndiconet'}
            </button>
          ))}
        </div>
        <p className="font-body text-sm text-[#3D3D3D]/60 max-w-lg">
          Use a versão <strong className="text-[#101e37]">colorida ou cinza</strong> em fundos claros
          e a versão <strong className="text-[#101e37]">branca</strong> em fundos escuros.
          Garanta sempre contraste suficiente entre o logo e o fundo.
        </p>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">

        {/* ── Controls ─────────────────────────────────────────────── */}
        <div className="border-b lg:border-b-0 lg:border-r border-black/8 p-5 space-y-5 overflow-y-auto max-h-[600px]">

          {/* Filtro por grupo */}
          <ControlGroup label="Tipo">
            <div className="flex flex-wrap gap-1.5">
              {groups.map((g) => (
                <Chip key={g.key} active={group === g.key} onClick={() => setGroup(g.key)} accent={accentColor}>
                  {g.label}
                </Chip>
              ))}
            </div>
          </ControlGroup>

          {/* Grid de logos selecionáveis */}
          <ControlGroup label="Variação">
            <div className="grid grid-cols-2 gap-1.5">
              {filtered.map((logo) => (
                <button
                  key={logo.key}
                  onClick={() => { setSelectedKey(logo.key); setImgError(false) }}
                  aria-pressed={selectedKey === logo.key}
                  title={logo.label}
                  className={`relative h-14 rounded-xl border-2 flex items-center justify-center p-2 transition-all overflow-hidden ${
                    selectedKey === logo.key
                      ? 'border-[color:var(--accent)] shadow-sm'
                      : 'border-black/8 hover:border-black/20'
                  }`}
                  style={{ '--accent': accentColor } as React.CSSProperties}
                >
                  {/* thumbnail: logo over neutral bg */}
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: logo.darkRecommended ? '#2a2a2a' : '#F4F6F8' }}
                  />
                  <img
                    src={logo.src}
                    alt={logo.label}
                    className="relative w-full h-full object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  {selectedKey === logo.key && (
                    <span
                      className="absolute top-1 right-1 w-3 h-3 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentColor }}
                    >
                      <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                        <path d="M1 3.5l1.5 1.5 3-3" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
            {/* Label da selecionada */}
            <p className="mt-2 text-[10px] font-mono text-[#3D3D3D]/40 truncate">{selected.label}</p>
          </ControlGroup>

          {/* Fundo */}
          <ControlGroup label="Fundo">
            <div className="flex gap-2 flex-wrap">
              {brand === 'sindiconet'
                ? (Object.entries(bgStyles) as [BgOption, typeof bgStyles[BgOption]][]).map(([key, val]) => (
                    <button key={key} onClick={() => setBg(key)} aria-label={val.label} title={val.label}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${bg === key ? 'border-[#3e77db] scale-110' : 'border-black/10 hover:border-black/20'}`}
                      style={val.style} />
                  ))
                : (Object.entries(proBgStyles) as [ProBgOption, typeof proBgStyles[ProBgOption]][]).map(([key, val]) => (
                    <button key={key} onClick={() => setProBg(key)} aria-label={val.label} title={val.label}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${proBg === key ? 'border-[#7441AC] scale-110' : 'border-black/10 hover:border-black/20'}`}
                      style={val.style} />
                  ))
              }
            </div>
          </ControlGroup>

          {/* Escala */}
          <ControlGroup label="Escala" aside={<span className="text-xs font-mono" style={{ color: accentColor }}>{scale}%</span>}>
            <input type="range" min={40} max={200} value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full" style={{ accentColor }} />
          </ControlGroup>
        </div>

        {/* ── Preview ──────────────────────────────────────────────── */}
        <div
          className="relative min-h-[380px] flex flex-col items-center justify-center gap-6 p-16 transition-colors duration-300"
          style={activeBgInfo.style}
        >
          {/* Logo */}
          <div className="relative" style={{ width: `${scale * 2}px`, height: `${scale * 0.5}px`, maxWidth: '100%' }}>
            {!imgError ? (
              <Image
                src={selected.src}
                alt={selected.label}
                fill
                className="object-contain object-center"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs font-mono opacity-40" style={{ color: isDark ? '#fff' : '#000' }}>
                  {selected.key}
                </p>
              </div>
            )}
          </div>

          {/* ── Status ── */}
          {!correct ? (
            <div className="flex flex-col gap-3 px-5 py-4 rounded-xl w-full max-w-sm"
              style={{ backgroundColor: 'rgba(209,61,42,0.15)', border: '1px solid rgba(209,61,42,0.35)' }}>
              <div className="flex items-start gap-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="9" cy="9" r="8.5" stroke="#D13D2A" />
                  <path d="M9 5v5" stroke="#D13D2A" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="9" cy="13" r="1" fill="#D13D2A" />
                </svg>
                <div>
                  <p className="text-xs font-semibold font-body" style={{ color: isDark ? '#ff8a7a' : '#c0392b' }}>
                    Aplicação incorreta
                  </p>
                  <p className="text-[11px] font-body mt-0.5" style={{ color: isDark ? 'rgba(255,138,122,0.8)' : 'rgba(192,57,43,0.75)' }}>
                    {selected.darkRecommended
                      ? 'Esta versão é para fundos escuros. Escolha uma versão colorida, cinza ou preta para este fundo.'
                      : 'Esta versão não tem contraste suficiente em fundos escuros. Escolha a versão branca ou dark.'}
                  </p>
                </div>
              </div>
              {/* Sugestão rápida */}
              <div className="flex flex-wrap gap-2">
                {logos
                  .filter((l) => l.darkRecommended === isDark && l.group === selected.group)
                  .slice(0, 3)
                  .map((l) => (
                    <button key={l.key}
                      onClick={() => { setSelectedKey(l.key); setImgError(false) }}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-semibold font-body transition-colors"
                      style={{
                        backgroundColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(192,57,43,0.1)',
                        color: isDark ? '#fff' : '#c0392b',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(192,57,43,0.25)'}`,
                      }}>
                      {l.label.split(' · ')[1]}
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ backgroundColor: 'rgba(49,131,103,0.15)', border: '1px solid rgba(49,131,103,0.30)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="6.5" stroke="#318367" />
                <path d="M4 7l2 2 4-4" stroke="#318367" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-[11px] font-semibold font-body" style={{ color: isDark ? '#5ecfad' : '#318367' }}>
                Aplicação correta
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function ControlGroup({ label, aside, children }: { label: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body">{label}</p>
        {aside}
      </div>
      {children}
    </div>
  )
}

function Chip({ active, onClick, accent, children }: { active: boolean; onClick: () => void; accent: string; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-pressed={active}
      className="px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors"
      style={active ? { backgroundColor: accent, color: '#fff' } : undefined}
      {...(!active ? { className: 'px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors bg-[#F4F6F8] text-[#3D3D3D]/70 hover:bg-[#e8edf3]' } : {})}>
      {children}
    </button>
  )
}
