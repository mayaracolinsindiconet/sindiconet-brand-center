'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { photos } from '@/data/photos'
import type { Photo } from '@/data/photos'
import { CorrectIncorrectToggle } from '@/components/shared/CorrectIncorrectToggle'

const categoryLabels: Record<string, string> = {
  pessoas: 'Pessoas',
  arquitetura: 'Arquitetura',
  ambiente: 'Ambiente',
  detalhe: 'Detalhe',
}

const pillarLabels: Record<string, string> = {
  'premium-silencioso': 'Premium Silencioso',
  'editorial-corporativo-humano': 'Editorial Corporativo',
  'arquitetura-como-simbolo': 'Arquitetura como Símbolo',
}

const pillarBadgeColors: Record<string, string> = {
  'premium-silencioso': 'bg-amber-100 text-amber-800',
  'editorial-corporativo-humano': 'bg-blue-100 text-blue-800',
  'arquitetura-como-simbolo': 'bg-slate-200 text-slate-700',
}

const pillarActiveColors: Record<string, string> = {
  'premium-silencioso': 'bg-amber-500 text-white',
  'editorial-corporativo-humano': 'bg-[#3e77db] text-white',
  'arquitetura-como-simbolo': 'bg-slate-600 text-white',
}

const attributeLabels = ['Luz natural', 'Composição limpa', 'Tons neutros', 'Editorial', 'Arquitetural', 'Humano', 'Premium']

function getHighResUrl(src: string): string {
  return src
    .replace('w=1200', 'w=4000')
    .replace('h=630', '')
    .replace('fit=crop&', '')
}

export function MoodboardPanel() {
  const [activePillar, setPillar]        = useState<string | null>(null)
  const [activeCategory, setCategory]   = useState<string | null>(null)
  const [activeAttributes, setAttrs]    = useState<string[]>([])
  const [mode, setMode]                 = useState<'correct' | 'incorrect'>('correct')
  const [comparisonMode, setComparison] = useState(false)
  const [lightbox, setLightbox]         = useState<Photo | null>(null)
  const [downloading, setDownloading]   = useState(false)

  const filtered = photos.filter((p) => {
    if (activePillar && p.pillar !== activePillar) return false
    if (activeCategory && p.category !== activeCategory) return false
    if (activeAttributes.length && !activeAttributes.some((a) => p.attributes.includes(a))) return false
    if (comparisonMode) return true
    return p.isCorrect === (mode === 'correct')
  })

  function toggleAttr(attr: string) {
    setAttrs((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    )
  }

  async function handleDownload(photo: Photo) {
    setDownloading(true)
    try {
      const highResUrl = getHighResUrl(photo.src)
      const res = await fetch('/api/download-photo?url=' + encodeURIComponent(highResUrl))
      if (!res.ok) throw new Error('download failed')
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = 'snt-foto-' + photo.id + '.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(objectUrl)
    } catch {
      window.open(getHighResUrl(photo.src), '_blank')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setPillar(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${activePillar === null ? 'bg-[#101e37] text-white' : 'bg-white border border-black/10 text-[#3D3D3D]/60 hover:border-black/20'}`}
          >
            Todos os pilares
          </button>
          {Object.entries(pillarLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPillar(key === activePillar ? null : key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${activePillar === key ? pillarActiveColors[key] : 'bg-white border border-black/10 text-[#3D3D3D]/60 hover:border-black/20'}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-wrap gap-1.5">
            <button onClick={() => setCategory(null)} className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${activeCategory === null ? 'bg-[#101e37] text-white' : 'bg-white border border-black/10 text-[#3D3D3D]/60'}`}>Todas</button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button key={key} onClick={() => setCategory(key === activeCategory ? null : key)} className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${activeCategory === key ? 'bg-[#101e37] text-white' : 'bg-white border border-black/10 text-[#3D3D3D]/60'}`}>{label}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {attributeLabels.map((attr) => (
              <button key={attr} onClick={() => toggleAttr(attr)} className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold font-body uppercase tracking-wide transition-colors ${activeAttributes.includes(attr) ? 'bg-[#3e77db] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/50'}`}>{attr}</button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-body text-[#3D3D3D]/60 cursor-pointer">
              <button role="switch" aria-checked={comparisonMode} onClick={() => setComparison((v) => !v)} className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${comparisonMode ? 'bg-[#3e77db]' : 'bg-black/15'}`}>
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${comparisonMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
              Certo vs. Errado
            </label>
            {!comparisonMode && <CorrectIncorrectToggle value={mode} onChange={setMode} />}
          </div>
        </div>
      </div>
      <p className="text-xs text-[#3D3D3D]/40 font-body mb-4">{filtered.length} foto{filtered.length !== 1 ? 's' : ''}</p>
      {filtered.length > 0 ? (
        <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((photo) => (
            <motion.div key={photo.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="group w-full break-inside-avoid">
              <button onClick={() => setLightbox(photo)} aria-label={'Ver foto: ' + photo.alt} className="w-full rounded-xl overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e77db]">
                <div className="relative bg-[#F4F6F8] aspect-[4/3]">
                  <Image src={photo.src} alt={photo.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-end p-2 pointer-events-none">
                    <span className={'text-[9px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ' + pillarBadgeColors[photo.pillar]}>
                      {pillarLabels[photo.pillar]}
                    </span>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      ) : (<EmptyState />)}
      <AnimatePresence>
        {lightbox && (
          <motion.div key="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.92, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 8 }} onClick={(e) => e.stopPropagation()} className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[#0d1929]">
              <div className="relative w-full aspect-[16/9]">
                <Image src={lightbox.src} alt={lightbox.alt} fill className="object-contain" />
              </div>
              <div className="p-4 flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={'text-[10px] font-bold px-2 py-0.5 rounded-full ' + pillarBadgeColors[lightbox.pillar]}>{pillarLabels[lightbox.pillar]}</span>
                    <span className={'text-[10px] font-bold px-2 py-0.5 rounded-full ' + (lightbox.isCorrect !== false ? 'bg-green-900/40 text-green-300' : 'bg-red-900/40 text-red-300')}>
                      {lightbox.isCorrect !== false ? '✓ Correto' : '✗ Evitar'}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 font-body truncate mb-2">{lightbox.alt}</p>
                  <div className="flex flex-wrap gap-1">
                    {lightbox.attributes.map((attr) => (
                      <span key={attr} className="text-[10px] bg-white/10 text-white/50 px-2 py-0.5 rounded-full font-body">{attr}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => handleDownload(lightbox)} disabled={downloading} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#3e77db] hover:bg-[#2d63c8] text-white text-xs font-semibold font-body transition-colors disabled:opacity-60">
                    {downloading ? (
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    )}
                    Baixar em alta
                  </button>
                  <button onClick={() => setLightbox(null)} aria-label="Fechar" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition-colors">×</button>
                </div>
              </div>
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
      <p className="font-headline font-semibold text-xl text-[#101e37] mb-2">Moodboard aguardando fotos</p>
      <p className="text-sm font-body text-[#3D3D3D]/50 max-w-xs mx-auto">
        Adicione objetos ao array em{' '}
        <code className="font-mono bg-white px-1 py-0.5 rounded text-[#3e77db]">/data/photos.ts</code>{' '}
        e os arquivos em{' '}
        <code className="font-mono bg-white px-1 py-0.5 rounded text-[#3e77db]">/public/assets/photos/</code>.
      </p>
    </div>
  )
}
