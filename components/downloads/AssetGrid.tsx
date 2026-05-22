'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AssetCard } from './AssetCard'
import { assets } from '@/data/assets'
import type { Asset } from '@/data/assets'
import type { ProductSlug } from '@/tokens/products'

const typeOptions = ['logo', 'icon', 'font', 'template'] as const
const formatOptions = ['svg', 'png'] as const
const productOptions: (ProductSlug | 'brand')[] = ['brand', 'conteudo', 'conviver', 'coteibem', 'cursos', 'pro']

const typeLabels: Record<string, string> = { logo: 'Logo', icon: 'Ícone', font: 'Fonte', template: 'Template' }
const productLabels: Record<string, string> = { brand: 'Marca Principal', conteudo: 'Conteúdo', conviver: 'Conviver/Creator', coteibem: 'Coteibem', cursos: 'Cursos', pro: 'PRO' }

interface Filters {
  types:    string[]
  formats:  string[]
  products: string[]
}

export function AssetGrid() {
  const [filters, setFilters] = useState<Filters>({ types: [], formats: [], products: [] })

  function toggle(key: keyof Filters, value: string) {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  function removeFilter(key: keyof Filters, value: string) {
    setFilters((prev) => ({ ...prev, [key]: prev[key].filter((v) => v !== value) }))
  }

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      if (filters.types.length && !filters.types.includes(a.type)) return false
      if (filters.formats.length && !a.formats.some((f) => filters.formats.includes(f.ext))) return false
      if (filters.products.length && (!a.product || !filters.products.includes(a.product))) return false
      return true
    })
  }, [filters])

  const activeFilters = [
    ...filters.types.map((v) => ({ key: 'types' as const, value: v, label: typeLabels[v] ?? v })),
    ...filters.formats.map((v) => ({ key: 'formats' as const, value: v, label: `.${v}` })),
    ...filters.products.map((v) => ({ key: 'products' as const, value: v, label: productLabels[v] ?? v })),
  ]

  return (
    <div>
      {/* Filter row */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body w-full sm:w-auto">
            Tipo
          </p>
          {typeOptions.map((t) => (
            <button
              key={t}
              onClick={() => toggle('types', t)}
              aria-pressed={filters.types.includes(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
                filters.types.includes(t) ? 'bg-[#101e37] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60 hover:text-[#3D3D3D]'
              }`}
            >
              {typeLabels[t]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body w-full sm:w-auto">
            Formato
          </p>
          {formatOptions.map((f) => (
            <button
              key={f}
              onClick={() => toggle('formats', f)}
              aria-pressed={filters.formats.includes(f)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold uppercase transition-colors ${
                filters.formats.includes(f) ? 'bg-[#3e77db] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60 hover:text-[#3D3D3D]'
              }`}
            >
              .{f}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body w-full sm:w-auto">
            Produto
          </p>
          {productOptions.map((p) => (
            <button
              key={p}
              onClick={() => toggle('products', p)}
              aria-pressed={filters.products.includes(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
                filters.products.includes(p) ? 'bg-[#101e37] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60 hover:text-[#3D3D3D]'
              }`}
            >
              {productLabels[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Active filter chips */}
      <AnimatePresence>
        {activeFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {activeFilters.map(({ key, value, label }) => (
              <button
                key={`${key}-${value}`}
                onClick={() => removeFilter(key, value)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3e77db] text-white text-[10px] font-semibold font-body hover:bg-[#3e77db] transition-colors"
              >
                {label}
                <span aria-hidden>×</span>
              </button>
            ))}
            <button
              onClick={() => setFilters({ types: [], formats: [], products: [] })}
              className="px-2.5 py-1 rounded-full bg-[#F4F6F8] text-[#3D3D3D]/50 text-[10px] font-semibold font-body hover:bg-[#e8edf3] transition-colors"
            >
              Limpar filtros
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid or empty */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <EmptyState hasFilters={activeFilters.length > 0} onClear={() => setFilters({ types: [], formats: [], products: [] })} />
      )}
    </div>
  )
}

function EmptyState({ hasFilters, onClear }: { hasFilters: boolean; onClear: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/10 bg-[#F4F6F8] px-8 py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-white border border-black/8 flex items-center justify-center mx-auto mb-5">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 3v13M7 11l5 5 5-5M3 20h18" stroke="#3e77db" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {hasFilters ? (
        <>
          <p className="font-headline font-semibold text-xl text-[#101e37] mb-2">Nenhum asset para esses filtros</p>
          <p className="text-sm font-body text-[#3D3D3D]/50 mb-4">Tente remover alguns filtros para ver mais resultados.</p>
          <button onClick={onClear} className="px-4 py-2 rounded-xl bg-[#3e77db] text-white text-xs font-semibold font-body hover:bg-[#3e77db] transition-colors">
            Limpar filtros
          </button>
        </>
      ) : (
        <>
          <p className="font-headline font-semibold text-xl text-[#101e37] mb-2">Assets em breve</p>
          <p className="text-sm font-body text-[#3D3D3D]/50 max-w-xs mx-auto">
            Adicione entradas ao array em{' '}
            <code className="font-mono bg-white px-1 py-0.5 rounded text-[#3e77db]">/data/assets.ts</code>{' '}
            e os arquivos em{' '}
            <code className="font-mono bg-white px-1 py-0.5 rounded text-[#3e77db]">/public/assets/</code>.
          </p>
        </>
      )}
    </div>
  )
}
