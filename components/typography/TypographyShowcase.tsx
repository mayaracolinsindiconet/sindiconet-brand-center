'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const weights = [
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '700', label: 'Bold' },
]

export function TypographyShowcase() {
  const [size, setSize]       = useState(48)
  const [weight, setWeight]   = useState('700')
  const [text, setText]       = useState('Síndiconet')
  const [copied, setCopied]   = useState(false)
  const [font, setFont]       = useState<'headline' | 'body'>('headline')

  const fontFamily = font === 'headline'
    ? '"Stack Sans", system-ui, sans-serif'
    : 'var(--font-open-sans), "Open Sans", system-ui, sans-serif'

  function handleCopyCSS() {
    const css = `font-family: ${fontFamily};\nfont-size: ${size}px;\nfont-weight: ${weight};`
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">
      {/* Controls */}
      <div className="border-b border-black/8 p-6 flex flex-wrap gap-6 items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-2">
            Família
          </p>
          <div className="flex gap-1.5">
            {(['headline', 'body'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFont(f)}
                aria-pressed={font === f}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
                  font === f ? 'bg-[#101e37] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60 hover:text-[#3D3D3D]'
                }`}
              >
                {f === 'headline' ? 'Stack Sans' : 'Open Sans'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body">
              Tamanho
            </p>
            <span className="text-[10px] font-mono text-[#3e77db] ml-8">{size}px</span>
          </div>
          <input
            type="range"
            min={12}
            max={96}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            aria-label="Tamanho da fonte"
            className="w-40 accent-[#3e77db]"
          />
        </div>

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-2">
            Peso
          </p>
          <div className="flex gap-1.5">
            {weights.map((w) => (
              <button
                key={w.value}
                onClick={() => setWeight(w.value)}
                aria-pressed={weight === w.value}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors font-body ${
                  weight === w.value ? 'bg-[#101e37] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60 hover:text-[#3D3D3D]'
                }`}
                style={{ fontWeight: w.value }}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCopyCSS}
          className={`ml-auto px-4 py-2 rounded-xl text-xs font-semibold font-body transition-colors ${
            copied
              ? 'bg-[#318367] text-white'
              : 'bg-[#F4F6F8] text-[#3D3D3D]/70 hover:text-[#3D3D3D]'
          }`}
        >
          {copied ? 'Copiado ✓' : 'Copiar CSS'}
        </button>
      </div>

      {/* Preview */}
      <div className="p-8 bg-[#F4F6F8] min-h-[200px] flex items-center">
        <div className="w-full">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Texto de preview tipográfico"
            className="w-full bg-transparent border-none outline-none text-[#101e37] resize-none"
            style={{ fontFamily, fontSize: size, fontWeight: weight, lineHeight: 1.1 }}
          />
        </div>
      </div>
    </div>
  )
}
