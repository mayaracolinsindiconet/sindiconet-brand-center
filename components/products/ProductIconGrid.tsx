'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductSlug } from '@/tokens/products'
import { products } from '@/tokens/products'
import { productIcons } from '@/data/icons'

interface ProductIconGridProps {
  product: ProductSlug
}

export function ProductIconGrid({ product }: ProductIconGridProps) {
  const [search, setSearch] = useState('')
  const [copied, setCopied]  = useState<string | null>(null)

  const icons = productIcons[product] ?? []
  const p     = products[product]

  const filtered = icons.filter((icon) =>
    icon.label.toLowerCase().includes(search.toLowerCase())
  )

  function handleCopyPath(path: string) {
    navigator.clipboard.writeText(path).then(() => {
      setCopied(path)
      setTimeout(() => setCopied(null), 1600)
    })
  }

  if (icons.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-[#F4F6F8] p-12 text-center">
        <p className="text-sm font-semibold font-body text-[#3D3D3D]/50">Sem ícones cadastrados</p>
        <p className="text-xs font-body text-[#3D3D3D]/35 mt-1">
          Adicione arquivos SVG em{' '}
          <code className="font-mono bg-white px-1 py-0.5 rounded">/public/assets/icons/{product}/</code>
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar ícone..."
          aria-label="Buscar ícone"
          className="w-full max-w-xs px-4 py-2 rounded-xl border border-black/10 bg-white text-sm font-body text-[#3D3D3D] focus:outline-none focus:ring-2 transition"
          style={{ '--tw-ring-color': p.colors.primary } as React.CSSProperties}
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filtered.map((icon) => (
            <div
              key={icon.slug}
              className="group flex flex-col items-center gap-3 rounded-2xl bg-white border border-black/8 p-4 hover:shadow-md transition-all"
            >
              {/* Icon preview */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image
                  src={icon.path}
                  alt={icon.label}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>

              {/* Label */}
              <p className="text-[11px] font-semibold font-body text-[#3D3D3D]/70 text-center leading-tight">
                {icon.label}
              </p>

              {/* Actions */}
              <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Copy path */}
                <button
                  onClick={() => handleCopyPath(icon.path)}
                  title="Copiar caminho"
                  className="p-1.5 rounded-lg bg-[#F4F6F8] hover:bg-[#e8edf3] transition-colors"
                  aria-label={`Copiar caminho de ${icon.label}`}
                >
                  {copied === icon.path ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="#318367" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <rect x="4" y="4" width="7" height="7" rx="1" stroke="#3D3D3D" strokeOpacity=".5" strokeWidth="1.2" />
                      <path d="M2 8V2a1 1 0 011-1h6" stroke="#3D3D3D" strokeOpacity=".5" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>

                {/* Download */}
                <a
                  href={icon.path}
                  download
                  title="Baixar SVG"
                  className="p-1.5 rounded-lg bg-[#F4F6F8] hover:bg-[#e8edf3] transition-colors"
                  aria-label={`Baixar ${icon.label}`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 1v7M3 6l3 3 3-3" stroke="#3D3D3D" strokeOpacity=".5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 10h10" stroke="#3D3D3D" strokeOpacity=".5" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center">
          <p className="text-sm font-body text-[#3D3D3D]/40">Nenhum ícone encontrado para "{search}"</p>
        </div>
      )}
    </div>
  )
}
