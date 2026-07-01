'use client'

import type { ComponentType } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { products, productList } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'
import {
  IconConteudo,
  IconCursos,
  IconCoteibem,
  IconConviver,
  IconPro,
  IconCreators,
} from '@/components/products/ProductSvgIcons'

const productDescriptions: Record<ProductSlug, string> = {
  conteudo: 'Conteúdo especializado para síndicos e gestores de condomínio.',
  conviver: 'Plataforma de relacionamento, vida em comunidade e criadores de conteúdo condominial.',
  coteibem: 'Cotações e serviços para o condomínio.',
  cursos:   'Capacitação e educação para síndicos.',
  empregos: 'Vagas e oportunidades do universo condominial.',
  pro:      'Solução premium de gestão profissional.',
  creators: 'Conexão entre criadores de conteúdo e o universo condominial.',
}

const productIconMap: Partial<Record<ProductSlug, ComponentType<{ className?: string }>>> = {
  conteudo: IconConteudo,
  cursos:   IconCursos,
  coteibem: IconCoteibem,
  conviver: IconConviver,
  pro:      IconPro,
  creators: IconCreators,
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function ProductsOverview() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {productList.map((slug) => {
        const product = products[slug]
        const Icon = productIconMap[slug]
        return (
          <motion.div key={slug} variants={cardVariants}>
            <Link
              href={`/identidade/produtos/${slug}`}
              className="group block rounded-2xl overflow-hidden border border-black/5 hover:shadow-lg transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3e77db]"
            >
              <div
                className="h-36 relative flex items-end p-6 transition-transform duration-250 group-hover:scale-[1.01]"
                style={{ backgroundColor: product.colors.primary }}
              >
                {/* Subtle gradient using sombra */}
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    background: `radial-gradient(ellipse at 80% 20%, ${product.colors.sombra}, transparent 65%)`,
                  }}
                />
                {/* Product icon — top right, no background */}
                {Icon && (
                  <div
                    className="absolute top-3 right-3 w-14 h-14 opacity-50 group-hover:opacity-70 transition-opacity"
                    style={{ color: product.colors.onPrimary }}
                  >
                    <Icon className="w-full h-full" />
                  </div>
                )}
                <div className="relative">
                  <p
                    className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] mb-1"
                    style={{ color: product.colors.onPrimary, opacity: 0.6 }}
                  >
                    Produto
                  </p>
                  <h3
                    className="font-headline font-bold text-xl leading-tight"
                    style={{ color: product.colors.onPrimary }}
                  >
                    {product.name.replace('Síndiconet ', '')}
                  </h3>
                </div>
              </div>
              <div className="bg-white p-5">
                <p className="text-sm font-body text-[#3D3D3D]/60 leading-relaxed">
                  {productDescriptions[slug]}
                </p>
                <div
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold font-body opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: product.colors.primary }}
                >
                  Ver identidade
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
