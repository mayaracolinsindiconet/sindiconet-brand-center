'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Asset } from '@/data/assets'

interface FormatSelectorProps {
  asset: Asset
  open: boolean
  onClose: () => void
}

const formatUsage: Record<string, string> = {
  svg:   'Uso digital, escalável, web e apps',
  png:   'Documentos, apresentações, social media',
  pdf:   'Impressão e documentos formais',
  woff2: 'Web — fontes auto-hospedadas',
  ai:    'Edição em Adobe Illustrator',
}

export function FormatSelector({ asset, open, onClose }: FormatSelectorProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 right-0 z-50 w-64 bg-white rounded-2xl border border-black/8 shadow-xl p-3"
            role="dialog"
            aria-label={`Selecionar formato de ${asset.name}`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body px-2 mb-2">
              Escolher formato
            </p>
            <ul className="space-y-1">
              {asset.formats.map((fmt) => (
                <li key={fmt.ext}>
                  <a
                    href={fmt.path}
                    download
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F4F6F8] transition-colors group"
                  >
                    <span className="w-10 text-center text-[10px] font-mono font-semibold text-white bg-[#3e77db] rounded-lg py-0.5 uppercase">
                      {fmt.ext}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold font-body text-[#101e37]">.{fmt.ext}</p>
                      <p className="text-[10px] font-body text-[#3D3D3D]/50 truncate">
                        {fmt.usage ?? formatUsage[fmt.ext] ?? ''}
                      </p>
                    </div>
                    {fmt.size && (
                      <span className="text-[10px] font-mono text-[#3D3D3D]/30 shrink-0">{fmt.size}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
