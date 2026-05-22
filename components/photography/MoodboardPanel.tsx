'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { photos } from '@/data/photos'
import type { Photo } from '@/data/photos'
import { CorrectIncorrectToggle } from '@/components/shared/CorrectIncorrectToggle'

const categoryLabels = { pessoas: 'Pessoas', arquitetura: 'Arquitetura', ambiente: 'Ambiente', detalhe: 'Detalhe' }
const attributeLabels = ['Luz natural', 'Composição limpa', 'Tons neutros', 'Editorial', 'Arquitetural', 'Humano', 'Premium']

export function MoodboardPanel() {
  const [activeCategory, setCategory]   = useState<string | null>(null)
  const [activeAttributes, setAttrs]    = useState<string[]>([])
  const [mode, setMode]                 = useState<'correct' | 'incorrect'>('correct')
  const [comparisonMode, setComparison] = useState(false)
  const [lightbox, setLightbox]         = useState<Photo | null>(null)

  const filtered = photos.filter((p) => {
    if (activeCategory && p.category !== activeCategory) return false
    if (activeAttributes.length && !activeAttributes.some((a) => p.attributes.includes(a))) return false
    if (comparisonMode) return true
    return p.isCorrect === (mode === 'correct')
  })

  function toggleAttr(attr: string) {
    setAttrs((prev) => prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr])
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCategory(null)}
            aria-pressed={activeCategory === null}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
              activeCategory === null ? 'bg-[#101e37] text-white' : 'bg-white border border-black/10 text-[#3D3D3D]/60'
            }`}
          >
            Todas
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key === activeCategory ? null : key)}
              aria-pressed={activeCategory === key}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
                activeCategory === key ? 'bg-[#101e37] text-white' : 'bg-white border border-black/10 text-[#3D3D3D]/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {attributeLabels.map((attr) => (
            <button
              key={attr}
              onClick={() => toggleAttr(attr)}
              aria-pressed={activeAttributes.includes(attr)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold font-body uppercase tracking-wide transition-colors ${
                activeAttributes.includes(attr) ? 'bg-[#3e77db] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/50'
              }`}
            >
              {attr}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-body text-[#3D3D3D]/60 cursor-pointer">
            <button
              role="switch"
              aria-checked={comparisonMode}
              onClick={() => setComparison((v) => !v)}
              className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${comparisonMode ? 'bg-[#3e77db]' : 'bg-black/15'}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${comparisonMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </button>
            Certo vs. Errado
          </label>
          {!comparisonMode && (
            <CorrectIncorrectToggle value={mode} onChange={setMode} />
          )}
        </div>
      </div>

      {/* Grid or empty state */}
      {filtered.length > 0 ? (
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((photo) => (
            <motion.button
              key={photo.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(photo)}
              aria-label={`Ver foto: ${photo.alt}`}
              className="group w-full break-inside-avoid rounded-xl overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e77db]"
            >
              <div className="relative bg-[#F4F6F8] aspect-[4/3]">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <EmptyState />
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-black"
            >
              <div className="relative w-full aspect-[16/9]">
                <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" />
              </div>
              <button
                onClick={() => setLightbox(null)}
                aria-label="Fechar lightbox"
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-black/10 bg-[#F4F6F8] px-8 py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-white border border-black/8 flex items-center justify-center mx-auto mb-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="#3e77db" strokeWidth="1.75" />
          <circle cx="12" cy="12" r="3" stroke="#3e77db" strokeWidth="1.75" />
          <path d="M10 5l1.5-2h1L14 5" stroke="#3e77db" strokeWidth="1.75" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="font-headline font-semibold text-xl text-[#101e37] mb-2">
        Moodboard aguardando fotos
      </p>
      <p className="text-sm font-body text-[#3D3D3D]/50 max-w-xs mx-auto mb-2">
        Adicione objetos ao array em{' '}
        <code className="font-mono bg-white px-1 py-0.5 rounded text-[#3e77db]">/data/photos.ts</code>{' '}
        e os arquivos de imagem em{' '}
        <code className="font-mono bg-white px-1 py-0.5 rounded text-[#3e77db]">/public/assets/photos/</code>.
      </p>
    </div>
  )
}
