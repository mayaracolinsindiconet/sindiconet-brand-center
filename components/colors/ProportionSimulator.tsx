'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ProductSwitcher } from '@/components/shared/ProductSwitcher'
import { products } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'

export function ProportionSimulator() {
  const [activeProduct, setActiveProduct]   = useState<ProductSlug>('conteudo')
  const [secondProduct, setSecondProduct]   = useState<ProductSlug>('conviver')
  const [multiMode, setMultiMode]           = useState(false)
  const [freeMode, setFreeMode]             = useState(false)
  const [primaryPct, setPrimaryPct]         = useState(60)

  const p  = products[activeProduct]
  const p2 = products[secondProduct]

  const sombraPct = Math.round((100 - primaryPct) * 0.75)
  const luzPct    = 100 - primaryPct - sombraPct

  const inRange = primaryPct >= 50 && primaryPct <= 70
  const badgeOk = inRange && !freeMode

  return (
    <div className="rounded-2xl border border-black/8 bg-white overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr]">

        {/* Controls */}
        <div className="border-b lg:border-b-0 lg:border-r border-black/8 p-6 space-y-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-3">
              Produto
            </p>
            <ProductSwitcher activeProduct={activeProduct} onChange={setActiveProduct} />
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                role="switch"
                aria-checked={multiMode}
                onClick={() => setMultiMode((v) => !v)}
                className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${multiMode ? 'bg-[#3e77db]' : 'bg-black/15'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${multiMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-xs font-body text-[#3D3D3D]/70">Modo multi-produto</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <button
                role="switch"
                aria-checked={freeMode}
                onClick={() => setFreeMode((v) => !v)}
                className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${freeMode ? 'bg-[#3e77db]' : 'bg-black/15'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${freeMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-xs font-body text-[#3D3D3D]/70">Modo livre (sliders)</span>
            </label>
          </div>

          <AnimatePresence>
            {multiMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-3">
                  Segundo produto
                </p>
                <ProductSwitcher activeProduct={secondProduct} onChange={setSecondProduct} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {freeMode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden space-y-4"
              >
                <div>
                  <div className="flex justify-between mb-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body">
                      Primária
                    </p>
                    <span className="text-xs font-mono text-[#3e77db]">{primaryPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={80}
                    value={primaryPct}
                    onChange={(e) => setPrimaryPct(Number(e.target.value))}
                    aria-label="Proporção da cor primária"
                    className="w-full accent-[#3e77db]"
                  />
                  <div className="flex justify-between text-[10px] text-[#3D3D3D]/30 font-mono mt-0.5">
                    <span>Som: {sombraPct}%</span>
                    <span>Luz: {luzPct}%</span>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {inRange ? (
                    <motion.div
                      key="ok"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#d0ebe2] text-[#215745] text-xs font-semibold font-body"
                    >
                      ✓ Dentro da proporção
                    </motion.div>
                  ) : (
                    <motion.div
                      key="warn"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#fdefd4] text-[#7b5f29] text-xs font-semibold font-body"
                    >
                      ⚠ Fora da proporção recomendada
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Visualização */}
        <div className="p-6 space-y-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-3">
              Proporção de cores
            </p>

            {!multiMode ? (
              <ProportionBar
                colors={freeMode
                  ? [
                      { color: p.colors.primary, pct: primaryPct, label: `${primaryPct}% Primária` },
                      { color: p.colors.sombra,  pct: sombraPct,  label: `${sombraPct}% Sombra`   },
                      { color: p.colors.luz,     pct: luzPct,     label: `${luzPct}% Luz`          },
                    ]
                  : [
                      { color: p.colors.primary, pct: 60, label: '60% Primária' },
                      { color: p.colors.sombra,  pct: 30, label: '30% Sombra'   },
                      { color: p.colors.luz,     pct: 10, label: '10% Luz'      },
                    ]
                }
                onPrimary={p.colors.onPrimary}
              />
            ) : (
              <div className="space-y-3">
                <ProportionBar
                  colors={[
                    { color: p.colors.primary, pct: 60, label: '60%' },
                    { color: p.colors.sombra,  pct: 30, label: '30%' },
                    { color: p.colors.luz,     pct: 10, label: '10%' },
                  ]}
                  onPrimary={p.colors.onPrimary}
                  label={p.name}
                />
                <ProportionBar
                  colors={[
                    { color: p2.colors.primary, pct: 60, label: '60%' },
                    { color: p2.colors.sombra,  pct: 30, label: '30%' },
                    { color: p2.colors.luz,     pct: 10, label: '10%' },
                  ]}
                  onPrimary={p2.colors.onPrimary}
                  label={p2.name}
                />
                <div className="mt-2 px-3 py-2 rounded-lg bg-[#cfddf6] text-[#3e77db] text-xs font-semibold font-body">
                  {activeProduct !== secondProduct
                    ? '✓ Convivência harmônica — produtos com identidades distintas'
                    : '⚠ Selecione produtos diferentes para comparar a convivência'}
                </div>
              </div>
            )}
          </div>

          {/* Mini mockup */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body mb-3">
              Mockup de composição
            </p>
            <MockupCard product={p} freePct={freeMode ? primaryPct : 60} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProportionBar({
  colors,
  onPrimary,
  label,
}: {
  colors: { color: string; pct: number; label: string }[]
  onPrimary: string
  label?: string
}) {
  return (
    <div>
      {label && <p className="text-xs font-body text-[#3D3D3D]/50 mb-1.5">{label}</p>}
      <div className="flex rounded-xl overflow-hidden h-16">
        {colors.map((c) => (
          <motion.div
            key={c.color + c.pct}
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex items-center justify-center text-[10px] font-semibold font-body"
            style={{ backgroundColor: c.color, flex: c.pct, color: onPrimary }}
          >
            <span style={{ opacity: 0.8 }}>{c.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function MockupCard({
  product,
  freePct,
}: {
  product: (typeof products)[ProductSlug]
  freePct: number
}) {
  const sombraPct = Math.round((100 - freePct) * 0.75)

  return (
    <motion.div
      layout
      className="rounded-2xl overflow-hidden border border-black/5 max-w-sm"
    >
      <motion.div
        layout
        className="h-20"
        style={{ backgroundColor: product.colors.primary }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div
          className="h-full w-full flex items-end p-4"
          style={{ width: `${freePct}%`, backgroundColor: product.colors.primary }}
        />
      </motion.div>
      <div className="bg-white p-4 flex gap-3">
        <motion.div
          layout
          className="rounded-lg"
          style={{ backgroundColor: product.colors.sombra, width: `${sombraPct}%`, height: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        <motion.div
          layout
          className="rounded-lg"
          style={{ backgroundColor: product.colors.luz, width: `${100 - freePct - sombraPct}%`, height: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>
      <div className="bg-white px-4 pb-4 flex flex-col gap-2">
        <div className="h-2 rounded-full bg-[#F4F6F8]" />
        <div className="h-2 rounded-full bg-[#F4F6F8] w-3/4" />
        <div className="mt-2 self-start px-3 py-1.5 rounded-lg text-xs font-semibold font-body"
          style={{ backgroundColor: product.colors.primary, color: product.colors.onPrimary }}>
          Ação principal
        </div>
      </div>
    </motion.div>
  )
}
