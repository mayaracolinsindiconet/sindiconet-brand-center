'use client'

import { motion } from 'framer-motion'
import { products } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'

interface ProductSwitcherProps {
  activeProduct: ProductSlug
  onChange: (slug: ProductSlug) => void
  includeAll?: boolean
}

export function ProductSwitcher({ activeProduct, onChange, includeAll = false }: ProductSwitcherProps) {
  const entries = Object.entries(products) as [ProductSlug, (typeof products)[ProductSlug]][]

  return (
    <div
      role="tablist"
      aria-label="Selecionar produto"
      className="flex flex-wrap gap-2"
    >
      {entries.map(([slug, product]) => {
        const isActive = activeProduct === slug
        return (
          <button
            key={slug}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(slug)}
            className="relative px-4 py-1.5 rounded-full text-sm font-medium font-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              color: isActive ? product.colors.onPrimary : product.colors.primary,
            }}
          >
            {isActive && (
              <motion.span
                layoutId="product-switcher-pill"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: product.colors.primary }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {!isActive && (
              <span
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: product.colors.primary + '40' }}
              />
            )}
            <span className="relative">{product.name.replace('Síndiconet ', '')}</span>
          </button>
        )
      })}
    </div>
  )
}
