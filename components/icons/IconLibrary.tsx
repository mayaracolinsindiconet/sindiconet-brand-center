'use client'

import { useState } from 'react'

const categories = ['comunicacao', 'documentos', 'navegacao', 'condominio', 'pessoas', 'configuracoes']
const categoryLabels: Record<string, string> = {
  comunicacao:   'Comunicação',
  documentos:    'Documentos',
  navegacao:     'Navegação',
  condominio:    'Condomínio',
  pessoas:       'Pessoas',
  configuracoes: 'Configurações',
}

export function IconLibrary() {
  const [search, setSearch]           = useState('')
  const [activeCategory, setCategory] = useState<string | null>(null)

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar ícone..."
          aria-label="Buscar ícone na biblioteca"
          className="w-full sm:max-w-xs px-4 py-2.5 rounded-xl border border-black/10 bg-white text-sm font-body text-[#3D3D3D] focus:outline-none focus:ring-2 focus:ring-[#3e77db] transition"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            aria-pressed={activeCategory === null}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
              activeCategory === null ? 'bg-[#101e37] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60 hover:text-[#3D3D3D]'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat === activeCategory ? null : cat)}
              aria-pressed={activeCategory === cat}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
                activeCategory === cat ? 'bg-[#101e37] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60 hover:text-[#3D3D3D]'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-black/10 bg-[#F4F6F8] px-8 py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white border border-black/8 flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3e77db" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-headline font-semibold text-xl text-[#101e37] mb-2">
          Biblioteca de ícones em construção
        </p>
        <p className="text-sm font-body text-[#3D3D3D]/50 max-w-sm mx-auto mb-6">
          Adicione arquivos SVG nas pastas de categoria dentro de{' '}
          <code className="font-mono bg-white px-1.5 py-0.5 rounded text-[#3e77db]">/public/assets/icons/</code>{' '}
          para que apareçam automaticamente aqui.
        </p>
        <div className="inline-flex flex-wrap gap-2 justify-center max-w-md mx-auto">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-[10px] font-mono bg-white border border-black/8 text-[#3D3D3D]/40 px-2 py-1 rounded-md"
            >
              /icons/{cat}/
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
