'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type LogoVariant   = 'mista' | 'simbolo' | 'mista-headline'
type LogoColorMode = 'colorida' | 'preta' | 'branca'
type BgOption      = 'branco' | 'cinza' | 'preto' | 'azul' | 'foto'

export interface SafeSpaceSimulatorProps {
  initialVariant?: LogoVariant
  initialColorMode?: LogoColorMode
}

const bgStyles: Record<BgOption, { style: React.CSSProperties; label: string; dark: boolean }> = {
  branco: { style: { backgroundColor: '#FFFFFF' },           label: 'Branco',          dark: false },
  cinza:  { style: { backgroundColor: '#F4F6F8' },           label: 'Cinza claro',     dark: false },
  preto:  { style: { backgroundColor: '#0d0d0d' },           label: 'Preto',           dark: true  },
  azul:   { style: { backgroundColor: '#3e77db' },           label: 'Azul Principal',  dark: true  },
  foto:   {
    style: {
      backgroundColor: '#5a6a7a',
      backgroundImage: 'url(/assets/photos/bg-foto.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    label: 'Fotografia',
    dark: true,
  },
}

const variantLabels: Record<LogoVariant, string>    = { mista: 'Mista', simbolo: 'Símbolo', 'mista-headline': 'Com Headline' }
const colorModeLabels: Record<LogoColorMode, string> = { colorida: 'Colorida', preta: 'Preta', branca: 'Branca' }

// ─── safe-area label colour: always contrast against the current background
function getLabelBg(bgKey: BgOption) {
  return bgStyles[bgKey].dark ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.85)'
}
function getLabelColor(bgKey: BgOption) {
  return bgStyles[bgKey].dark ? '#93b4e8' : '#3e77db'
}

// ─── guide-line colour
function getGuideColor(bgKey: BgOption) {
  return bgStyles[bgKey].dark ? 'rgba(147,180,232,0.45)' : 'rgba(62,119,219,0.4)'
}

export function SafeSpaceSimulator({
  initialVariant   = 'mista',
  initialColorMode = 'colorida',
}: SafeSpaceSimulatorProps) {
  const [variant,       setVariant]       = useState<LogoVariant>(initialVariant)
  const [colorMode,     setColorMode]     = useState<LogoColorMode>(initialColorMode)
  const [bg,            setBg]            = useState<BgOption>('branco')
  const [scale,         setScale]         = useState(100)
  const [showGuides,    setShowGuides]    = useState(true)
  const [showSafeSpace, setShowSafeSpace] = useState(true)
  const [logoSize,      setLogoSize]      = useState({ w: 0, h: 0 })

  const logoRef     = useRef<HTMLDivElement>(null)
  const observerRef = useRef<ResizeObserver | null>(null)

  const measure = useCallback(() => {
    if (logoRef.current) {
      setLogoSize({ w: logoRef.current.offsetWidth, h: logoRef.current.offsetHeight })
    }
  }, [])

  useEffect(() => {
    observerRef.current = new ResizeObserver(measure)
    if (logoRef.current) observerRef.current.observe(logoRef.current)
    return () => observerRef.current?.disconnect()
  }, [measure])

  // Re-measure whenever scale or variant changes (container dimensions change)
  useEffect(() => { measure() }, [scale, variant, measure])

  // Re-attach observer when variant changes (the div size changes, observer needs refresh)
  useEffect(() => {
    if (!logoRef.current) return
    observerRef.current?.disconnect()
    observerRef.current = new ResizeObserver(measure)
    observerRef.current.observe(logoRef.current)
  }, [variant, measure])

  // Module X = 1/8 of logo height (approximate)
  const unitX     = logoSize.h > 0 ? logoSize.h / 8 : 0
  const safeSpace = unitX * 2

  // Whether variant needs the Y-divider (symbol has none)
  const hasDivider = variant !== 'simbolo'

  const logoSrc = `/assets/logos/sindiconet-${variant}-${colorMode}.svg`
  const [imgError, setImgError] = useState(false)
  useEffect(() => { setImgError(false) }, [logoSrc])

  const guideColor    = getGuideColor(bg)
  const labelBg       = getLabelBg(bg)
  const labelColor    = getLabelColor(bg)

  const isSymbol = variant === 'simbolo'
  // For symbol the safe-area unit is Z, not X
  const safeLabel = isSymbol ? '2Z' : '2X'
  const moduleLabel = isSymbol ? 'Z' : 'X'

  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">

      {/* Header */}
      <div className="p-6 border-b border-black/8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-1">
            Área de Segurança — Simulador
          </p>
          <p className="font-body text-sm text-[#3D3D3D]/60 max-w-lg">
            Nenhum elemento gráfico deve invadir a área de proteção.
            O espaço mínimo em todos os lados equivale a&nbsp;
            <strong className="text-[#101e37]">2X</strong> na versão mista e&nbsp;
            <strong className="text-[#101e37]">2Z</strong> no símbolo.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

        {/* ── Controls ───────────────────────────────────────────────── */}
        <div className="border-b lg:border-b-0 lg:border-r border-black/8 p-5 space-y-5">

          {/* Variação */}
          <ControlGroup label="Variação">
            <div className="flex flex-wrap gap-1.5">
              {(['mista', 'simbolo', 'mista-headline'] as LogoVariant[]).map((v) => (
                <Chip key={v} active={variant === v} onClick={() => setVariant(v)}>
                  {variantLabels[v]}
                </Chip>
              ))}
            </div>
          </ControlGroup>

          {/* Modo de cor */}
          <ControlGroup label="Modo de cor">
            <div className="flex flex-wrap gap-1.5">
              {(['colorida', 'preta', 'branca'] as LogoColorMode[]).map((c) => (
                <Chip key={c} active={colorMode === c} onClick={() => setColorMode(c)}>
                  {colorModeLabels[c]}
                </Chip>
              ))}
            </div>
          </ControlGroup>

          {/* Fundo */}
          <ControlGroup label="Fundo">
            <div className="flex gap-2 flex-wrap">
              {(Object.entries(bgStyles) as [BgOption, typeof bgStyles[BgOption]][]).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => setBg(key)}
                  aria-pressed={bg === key}
                  aria-label={val.label}
                  title={val.label}
                  className={`w-8 h-8 rounded-lg border-2 transition-all ${
                    bg === key ? 'border-[#3e77db] scale-110' : 'border-black/10 hover:border-black/20'
                  }`}
                  style={val.style}
                />
              ))}
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

          {/* Toggles */}
          <div className="space-y-3">
            <Toggle checked={showGuides} onChange={setShowGuides} label="Grade de construção" />
            <Toggle checked={showSafeSpace} onChange={setShowSafeSpace} label="Área de segurança" />
          </div>

          {/* Metrics */}
          {unitX > 0 && (
            <div className="rounded-xl bg-[#F4F6F8] px-4 py-3 space-y-1.5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body">
                Métricas calculadas
              </p>
              <MetricRow label="Altura do logo" value={`${Math.round(logoSize.h)}px`} />
              <MetricRow label={`Módulo ${moduleLabel}`}  value={`${Math.round(unitX)}px`} />
              <MetricRow label={`Área de segurança (${safeLabel})`} value={`${Math.round(safeSpace)}px`} />
            </div>
          )}
        </div>

        {/* ── Preview ────────────────────────────────────────────────── */}
        <div
          className="relative min-h-[380px] flex items-center justify-center p-16 transition-colors duration-300"
          style={bgStyles[bg].style}
        >
          {/*
            logoRef wraps the logo tightly so guides + safe-area
            border are measured against the actual logo bounds.
            Width/height varies by variant.
          */}
          <div
            ref={logoRef}
            className="relative"
            style={
              isSymbol
                ? { width: `${scale * 0.5}px`, height: `${scale * 0.5}px` }
                : { width: `${scale * 2}px`, height: `${scale * 0.5}px` }
            }
          >
            {/* ── Logo image ── */}
            {!imgError ? (
              <Image
                src={logoSrc}
                alt={`Logo Síndiconet ${variantLabels[variant]} ${colorModeLabels[colorMode]}`}
                fill
                className="object-contain object-left"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <LogoFallback variant={variant} colorMode={colorMode} bg={bg} />
            )}

            {/* ── construction guides overlay ── */}
            <AnimatePresence>
              {showGuides && (
                <motion.div
                  key={`guides-${variant}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  {/* outer bounding box */}
                  <div className="absolute inset-0" style={{ border: `1px solid ${guideColor}` }} />

                  {/* vertical divider — symbol/wordmark boundary (~23%) */}
                  {hasDivider && (
                    <div
                      className="absolute top-0 bottom-0"
                      style={{ left: '23%', borderLeft: `1px dashed ${guideColor}` }}
                    />
                  )}

                  {/* horizontal centre line */}
                  <div
                    className="absolute left-0 right-0"
                    style={{ top: '50%', borderTop: `1px dashed ${guideColor}`, opacity: 0.6 }}
                  />

                  {/* corner module labels */}
                  {['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'].map((pos) => (
                    <span key={pos} className={`absolute ${pos} text-[8px] font-mono font-bold leading-none`}
                      style={{ color: labelColor }}>{moduleLabel}</span>
                  ))}

                  {/* Y-divider label */}
                  {hasDivider && (
                    <span
                      className="absolute text-[8px] font-mono font-bold leading-none"
                      style={{ top: '42%', left: '24%', color: labelColor }}
                    >Y</span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── safe-space dashed border ── */}
            <AnimatePresence>
              {showSafeSpace && safeSpace > 0 && (
                <motion.div
                  key="safe-border"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                  className="absolute pointer-events-none"
                  style={{
                    inset: -safeSpace,
                    border: `2px dashed ${labelColor}`,
                    borderRadius: 4,
                    opacity: 0.75,
                  }}
                >
                  {(['top', 'bottom', 'left', 'right'] as const).map((side) => (
                    <SafeLabel key={side} side={side} bg={labelBg} color={labelColor} text={safeLabel} />
                  ))}
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos) => (
                    <span key={pos} className={`absolute ${pos} text-[8px] font-mono leading-none`}
                      style={{ color: labelColor }}>+</span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Module legend footer */}
      <div className="px-6 py-5 border-t border-black/8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { mod: 'X', rule: 'Altura da letra "i" do logotipo. Unidade base de todas as proporções.' },
            { mod: 'Y', rule: 'Espaço entre monograma e tipografia = largura de Y.' },
            { mod: 'W', rule: 'Espaço entre monograma e tipografia = altura de W.' },
            { mod: 'Z', rule: 'Módulo Z = altura da letra "S" do monograma (símbolo).' },
          ].map((item) => (
            <div key={item.mod} className="flex items-center gap-3 bg-[#F4F6F8] rounded-xl px-3 py-2.5">
              <span className="w-6 h-6 rounded-lg bg-[#3e77db]/10 flex items-center justify-center font-mono text-[10px] font-bold text-[#3e77db] shrink-0">
                {item.mod}
              </span>
              <p className="font-body text-[11px] text-[#3D3D3D]/65 leading-snug">{item.rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SafeLabel({
  side, bg, color, text,
}: {
  side: 'top' | 'bottom' | 'left' | 'right'
  bg: string; color: string; text: string
}) {
  const base = 'absolute text-[9px] font-mono font-bold whitespace-nowrap px-1 py-0.5 rounded leading-none'
  const pos =
    side === 'top'    ? '-top-4 left-1/2 -translate-x-1/2' :
    side === 'bottom' ? '-bottom-4 left-1/2 -translate-x-1/2' :
    side === 'left'   ? 'top-1/2 -translate-y-1/2 -left-7' :
                        'top-1/2 -translate-y-1/2 -right-7'
  return (
    <span className={`${base} ${pos}`} style={{ background: bg, color }}>
      {text}
    </span>
  )
}

function ControlGroup({
  label, aside, children,
}: {
  label: string; aside?: React.ReactNode; children: React.ReactNode
}) {
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

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
        active
          ? 'bg-[#3e77db] text-white'
          : 'bg-[#F4F6F8] text-[#3D3D3D]/70 hover:bg-[#e8edf3]'
      }`}
    >
      {children}
    </button>
  )
}

function Toggle({
  checked, onChange, label,
}: {
  checked: boolean; onChange: (v: boolean) => void; label: string
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none w-full">
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative shrink-0 w-9 h-5 rounded-full transition-colors ${checked ? 'bg-[#3e77db]' : 'bg-black/15'}`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
      <span className="text-xs font-body text-[#3D3D3D]/70 flex-1 min-w-0">{label}</span>
    </label>
  )
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-xs font-body text-[#3D3D3D]/70 flex justify-between gap-2">
      {label}
      <span className="font-mono text-[#101e37] shrink-0">{value}</span>
    </p>
  )
}

function LogoFallback({
  variant, colorMode, bg,
}: {
  variant: LogoVariant; colorMode: LogoColorMode; bg: BgOption
}) {
  const isDark   = bgStyles[bg].dark
  const mainColor = colorMode === 'branca' ? '#FFFFFF' : colorMode === 'preta' ? '#000000' : '#3e77db'
  const textColor = colorMode === 'branca' ? '#FFFFFF' : isDark ? '#FFFFFF' : '#101e37'

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-3">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect width="40" height="40" rx="9" fill={mainColor} />
        <path d="M12 20C12 15.582 15.582 12 20 12C24.418 12 28 15.582 28 20C28 24.418 24.418 28 20 28"
          stroke={colorMode === 'branca' ? '#3e77db' : 'white'} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M20 28C17.791 28 16 26.209 16 24C16 21.791 17.791 20 20 20"
          stroke={colorMode === 'branca' ? '#3e77db' : 'white'} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      {(variant === 'mista' || variant === 'mista-headline') && (
        <div>
          <p className="font-bold text-xl leading-tight" style={{ color: textColor }}>Síndiconet</p>
          {variant === 'mista-headline' && (
            <p className="text-[9px] uppercase tracking-[0.2em] opacity-60" style={{ color: textColor }}>Brand Center</p>
          )}
        </div>
      )}
    </div>
  )
}
