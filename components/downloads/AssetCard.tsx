'use client'

import { useState } from 'react'
import Image from 'next/image'
import { UsageTag } from '@/components/shared/UsageTag'
import { FormatSelector } from './FormatSelector'
import type { Asset } from '@/data/assets'

interface AssetCardProps {
  asset: Asset
}

const typeIcon: Record<Asset['type'], React.ReactNode> = {
  logo: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  icon: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  font: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 13L7 3h2l4 10M5 9h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  template: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6h12M6 6v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
}

export function AssetCard({ asset }: AssetCardProps) {
  const [selectorOpen, setSelectorOpen] = useState(false)

  const isMultiFormat = asset.formats.length > 1

  function handleDownload() {
    if (isMultiFormat) {
      setSelectorOpen((v) => !v)
    } else if (asset.formats[0]) {
      const a = document.createElement('a')
      a.href = asset.formats[0].path
      a.download = ''
      a.click()
    }
  }

  return (
    <div className="group bg-white rounded-2xl border border-black/5 overflow-hidden hover:border-[#9fbbed] hover:shadow-md transition-all duration-200">
      <div className="h-28 bg-[#F4F6F8] flex items-center justify-center relative">
        {asset.previewUrl ? (
          <Image src={asset.previewUrl} alt={asset.name} fill className="object-contain p-6" />
        ) : (
          <div className="text-[#3D3D3D]/20">
            {typeIcon[asset.type]}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className="text-xs font-semibold font-body text-[#101e37] leading-tight">{asset.name}</p>
          <span className="shrink-0 flex items-center gap-1 text-[10px] font-mono text-[#3D3D3D]/40">
            {typeIcon[asset.type]}
          </span>
        </div>
        <p className="text-[10px] font-body text-[#3D3D3D]/50 mb-3 line-clamp-2">{asset.usageContext}</p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-1.5 flex-wrap">
            {asset.formats.map((f) => (
              <span key={f.ext} className="text-[9px] font-mono font-semibold bg-[#F4F6F8] text-[#3D3D3D]/50 px-1.5 py-0.5 rounded uppercase">
                {f.ext}
              </span>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={handleDownload}
              aria-label={`Baixar ${asset.name}`}
              className="shrink-0 px-3 py-1.5 rounded-lg bg-[#3e77db] text-white text-[10px] font-semibold font-body hover:bg-[#3e77db] transition-colors"
            >
              Baixar
            </button>
            {isMultiFormat && (
              <FormatSelector
                asset={asset}
                open={selectorOpen}
                onClose={() => setSelectorOpen(false)}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-black/5">
          <span className="text-[9px] font-mono text-[#3D3D3D]/30">v{asset.version} · {asset.updatedAt}</span>
        </div>
      </div>
    </div>
  )
}
