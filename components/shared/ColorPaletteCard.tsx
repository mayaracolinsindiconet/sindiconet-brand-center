'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ColorPaletteCardProps {
  hex: string
  name: string
  rgb?: string
  cmyk?: string
  role?: string
}

export function ColorPaletteCard({ hex, name, rgb, cmyk, role }: ColorPaletteCardProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(hex).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }

  const isLight = isLightColor(hex)

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copiar cor ${name} — ${hex}`}
      className="group text-left w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e77db]"
    >
      <div
        className={`h-24 relative flex items-end p-3 ${isLight ? 'ring-1 ring-inset ring-black/10' : ''}`}
        style={{ backgroundColor: hex }}
      >
        <AnimatePresence>
          {copied && (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`absolute inset-0 flex items-center justify-center text-xs font-semibold font-body tracking-wide ${
                isLight ? 'text-black/60' : 'text-white/80'
              }`}
            >
              Copiado ✓
            </motion.span>
          )}
        </AnimatePresence>

        <span
          className={`text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity ${
            isLight ? 'text-black/50' : 'text-white/50'
          }`}
        >
          {hex}
        </span>
      </div>

      <div className="bg-white p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold font-body text-[#101e37] leading-tight">{name}</p>
          {role && (
            <span className="shrink-0 text-[10px] font-body text-[#3D3D3D]/50 uppercase tracking-wider">
              {role}
            </span>
          )}
        </div>
        {(rgb || cmyk) && (
          <div className="mt-1.5 flex flex-col gap-0.5">
            {rgb && <p className="text-[10px] font-mono text-[#3D3D3D]/40">{rgb}</p>}
            {cmyk && <p className="text-[10px] font-mono text-[#3D3D3D]/40">{cmyk}</p>}
          </div>
        )}
      </div>
    </button>
  )
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 128
}
