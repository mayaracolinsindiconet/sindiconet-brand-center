'use client'

import { useState } from 'react'
import Image from 'next/image'

type LogoVariant   = 'mista' | 'simbolo' | 'mista-headline'
type LogoColorMode = 'colorida' | 'preta' | 'branca'
type BgOption      = 'branco' | 'cinza' | 'preto' | 'azul' | 'escuro'
type ProBgOption   = 'branco' | 'cinza' | 'sombra' | 'escuro' | 'primario'
type Brand         = 'sindiconet' | 'pro'

export interface SafeSpaceSimulatorProps {
  initialVariant?:   LogoVariant
  initialColorMode?: LogoColorMode
}

// ─── Síndiconet backgrounds ────────────────────────────────────────────────
const bgStyles: Record<BgOption, { style: React.CSSProperties; label: string; dark: boolean }> = {
  branco: { style: { backgroundColor: '#FFFFFF' }, label: 'Branco',      dark: false },
  cinza:  { style: { backgroundColor: '#F4F6F8' }, label: 'Cinza claro', dark: false },
  preto:  { style: { backgroundColor: '#0d0d0d' }, label: 'Preto',       dark: true  },
  azul:   { style: { backgroundColor: '#3e77db' }, label: 'Azul',        dark: true  },
  escuro: { style: { backgroundColor: '#3d3d3d' }, label: 'Cinza escuro',dark: true  },
}

// ─── PRO backgrounds ───────────────────────────────────────────────────────
const proBgStyles: Record<ProBgOption, { style: React.CSSProperties; label: string; dark: boolean }> = {
  branco:  { style: { backgroundColor: '#FFFFFF' }, label: 'Branco',   dark: false },
  cinza:   { style: { backgroundColor: '#F4F6F8' }, label: 'Cinza',    dark: false },
  primario:{ style: { backgroundColor: '#7441AC' }, label: 'Primário', dark: true  },
  sombra:  { style: { backgroundColor: '#3A2156' }, label: 'Sombra',   dark: true  },
  escuro:  { style: { backgroundColor: '#1D102B' }, label: 'Escuro',   dark: true  },
}

const variantLabels: Record<LogoVariant, string> = {
  mista: 'Mista', simbolo: 'Símbolo', 'mista-headline': 'Com Headline',
}
const colorModeLabels: Record<LogoColorMode, string> = {
  colorida: 'Colorida', preta: 'Cinza', branca: 'Branca',
}

// ─── Combinação correta? ───────────────────────────────────────────────────
function isCorrect(brand: Brand, colorMode: LogoColorMode, dark: boolean): boolean {
  if (brand === 'pro') {
    // PRO: colorida e preta só em fundos claros; branca só em fundos escuros
    if (colorMode === 'colorida' || colorMode === 'preta') return !dark
    if (colorMode === 'branca') return dark
  }
  // Síndiconet
  if (colorMode === 'colorida' || colorMode === 'preta') return !dark
  if (colorMode === 'branca') return dark
  return true
}

// ─── Logo src ──────────────────────────────────────────────────────────────
function getLogoSrc(brand: Brand, variant: LogoVariant, colorMode: LogoColorMode): string {
  if (brand === 'pro') {
    if (variant === 'simbolo') {
      return colorMode === 'branca'
        ? '/assets/logos/pro/pro-simbolo-branca.svg'
        : '/assets/logos/pro/pro-simbolo-colorida.svg'
    }
    // mista / mista-headline → PRO só tem mista
    return colorMode === 'branca'
      ? '/assets/logos/pro/pro-mista-branca.svg'
      : colorMode === 'preta'
      ? '/assets/logos/pro/pro-mista-cinza.svg'
      : '/assets/logos/pro/pro-mista-colorida.svg'
  }
  return `/assets/logos/sindiconet-${variant}-${colorMode}.svg`
}

export function SafeSpaceSimulator({
  initialVariant   = 'mista',
  initialColorMode = 'colorida',
}: SafeSpaceSimulatorProps) {
  const [brand, setBrand]         = useState<Brand>('sindiconet')
  const [variant, setVariant]     = useState<LogoVariant>(initialVariant)
  const [colorMode, setColorMode] = useState<LogoColorMode>(initialColorMode)
  const [bg, setBg]               = useState<BgOption>('branco')
  const [proBg, setProBg]         = useState<ProBgOption>('branco')
  const [scale, setScale]         = useState(100)
  const [imgError, setImgError]   = useState(false)

  const activeBgInfo = brand === 'pro' ? proBgStyles[proBg] : bgStyles[bg]
  const isDark = activeBgInfo.dark
  const correct = isCorrect(brand, colorMode, isDark)
  const logoSrc = getLogoSrc(brand, variant, colorMode)

  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="p-6 border-b border-black/8">
        {/* Brand switcher */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setBrand('sindiconet')}
            aria-pressed={brand === 'sindiconet'}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ${
              brand === 'sindiconet'
                ? 'bg-[#3e77db] text-white'
                : 'bg-[#F4F6F8] text-[#3D3D3D]/70 hover:bg-[#e8edf3]'
            }`}
          >
            Síndiconet
          </button>
          <button
            onClick={() => setBrand('pro')}
            aria-pressed={brand === 'pro'}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ${
              brand === 'pro'
                ? 'bg-[#7441AC] text-white'
                : 'bg-[#F4F6F8] text-[#3D3D3D]/70 hover:bg-[#e8edf3]'
            }`}
          >
            PRO
          </button>
        </div>

        <p className="font-body text-sm text-[#3D3D3D]/60 max-w-lg">
          Use a versão <strong className="text-[#101e37]">colorida ou preta</strong> em fundos claros
          e a versão <strong className="text-[#101e37]">branca</strong> em fundos escuros.
          Garanta sempre contraste suficiente entre o logo e o fundo.
        </p>
      </div>

      {/* ── Body ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

        {/* ── Controls ─────────────────────────────────────────────── */}
        <div className="border-b lg:border-b-0 lg:border-r border-black/8 p-5 space-y-5">

          {/* Variação */}
          <ControlGroup label="Variação">
            <div className="flex flex-wrap gap-1.5">
              {(['mista', 'simbolo', 'mista-headline'] as LogoVariant[]).map((v) => (
                <Chip
                  key={v} active={variant === v}
                  onClick={() => { setVariant(v); setImgError(false) }}
                  brand={brand}
                >
                  {variantLabels[v]}
                </Chip>
              ))}
            </div>
          </ControlGroup>

          {/* Modo de cor */}
          <ControlGroup label="Modo de cor">
            <div className="flex flex-wrap gap-1.5">
              {(['colorida', 'preta', 'branca'] as LogoColorMode[]).map((c) => (
                <Chip
                  key={c} active={colorMode === c}
                  onClick={() => { setColorMode(c); setImgError(false) }}
                  brand={brand}
                >
                  {colorModeLabels[c]}
                </Chip>
              ))}
            </div>
          </ControlGroup>

          {/* Fundo */}
          <ControlGroup label="Fundo">
            <div className="flex gap-2 flex-wrap">
              {brand === 'sindiconet'
                ? (Object.entries(bgStyles) as [BgOption, typeof bgStyles[BgOption]][]).map(([key, val]) => (
                    <button
                      key={key} onClick={() => setBg(key)}
                      aria-pressed={bg === key} aria-label={val.label} title={val.label}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        bg === key ? 'border-[#3e77db] scale-110' : 'border-black/10 hover:border-black/20'
                      }`}
                      style={val.style}
                    />
                  ))
                : (Object.entries(proBgStyles) as [ProBgOption, typeof proBgStyles[ProBgOption]][]).map(([key, val]) => (
                    <button
                      key={key} onClick={() => setProBg(key)}
                      aria-pressed={proBg === key} aria-label={val.label} title={val.label}
                      className={`w-8 h-8 rounded-lg border-2 transition-all ${
                        proBg === key ? 'border-[#7441AC] scale-110' : 'border-black/10 hover:border-black/20'
                      }`}
                      style={val.style}
                    />
                  ))
              }
            </div>
          </ControlGroup>

          {/* Escala */}
          <ControlGroup label="Escala" aside={<span className="text-xs font-mono text-[#3e77db]">{scale}%</span>}>
            <input
              type="range" min={40} max={200} value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              aria-label="Escala do logo"
              className="w-full accent-[#3e77db]"
            />
          </ControlGroup>
        </div>

        {/* ── Preview ──────────────────────────────────────────────── */}
        <div
          className="relative min-h-[380px] flex flex-col items-center justify-center gap-6 p-16 transition-colors duration-300"
          style={activeBgInfo.style}
        >
          {/* Logo */}
          <div
            className="relative"
            style={
              variant === 'simbolo'
                ? { width: `${scale * 0.5}px`, height: `${scale * 0.5}px` }
                : { width: `${scale * 2}px`,   height: `${scale * 0.5}px` }
            }
          >
            {!imgError ? (
              <Image
                src={logoSrc}
                alt={`Logo ${brand === 'pro' ? 'PRO' : 'Síndiconet'} — ${variantLabels[variant]} ${colorModeLabels[colorMode]}`}
                fill
                className="object-contain object-left"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <LogoFallback variant={variant} colorMode={colorMode} brand={brand} isDark={isDark} />
            )}
          </div>

          {/* ── Aviso de aplicação incorreta ── */}
          {!correct && (
            <div className="flex items-start gap-3 px-5 py-4 rounded-xl max-w-sm"
              style={{ backgroundColor: 'rgba(209,61,42,0.15)', border: '1px solid rgba(209,61,42,0.35)' }}>
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
                  {colorMode === 'branca'
                    ? 'A versão branca não tem contraste suficiente em fundos claros.'
                    : 'Esta versão não tem contraste suficiente em fundos escuros. Use a versão branca.'}
                </p>
              </div>
            </div>
          )}

          {/* ── Indicador de correto ── */}
          {correct && (
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

function Chip({ active, onClick, brand, children }: { active: boolean; onClick: () => void; brand: Brand; children: React.ReactNode }) {
  const activeColor = brand === 'pro' ? 'bg-[#7441AC] text-white' : 'bg-[#3e77db] text-white'
  return (
    <button
      onClick={onClick} aria-pressed={active}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
        active ? activeColor : 'bg-[#F4F6F8] text-[#3D3D3D]/70 hover:bg-[#e8edf3]'
      }`}
    >
      {children}
    </button>
  )
}

function LogoFallback({ variant, colorMode, brand, isDark }: {
  variant: LogoVariant; colorMode: LogoColorMode; brand: Brand; isDark: boolean
}) {
  const accentColor = brand === 'pro' ? '#7441AC' : '#3e77db'
  const mainColor = colorMode === 'branca' ? '#FFFFFF' : colorMode === 'preta' ? '#3D3D3D' : accentColor
  const textColor = colorMode === 'branca' ? '#FFFFFF' : isDark ? '#FFFFFF' : '#101e37'
  const innerColor = colorMode === 'branca' ? accentColor : 'white'

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill={mainColor} />
        <path d="M12 20C12 15.582 15.582 12 20 12C24.418 12 28 15.582 28 20C28 24.418 24.418 28 20 28"
          stroke={innerColor} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 28C17.791 28 16 26.209 16 24C16 21.791 17.791 20 20 20"
          stroke={innerColor} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {(variant === 'mista' || variant === 'mista-headline') && (
        <div>
          <p className="font-bold text-xl leading-tight" style={{ color: textColor }}>
            Síndiconet{brand === 'pro' && <span className="ml-1.5 text-sm font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: accentColor, color: '#fff' }}>PRO</span>}
          </p>
          {variant === 'mista-headline' && (
            <p className="text-[9px] uppercase tracking-[0.2em] opacity-60" style={{ color: textColor }}>Brand Center</p>
          )}
        </div>
      )}
    </div>
  )
}
