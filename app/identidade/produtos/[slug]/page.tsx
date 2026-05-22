import { notFound } from 'next/navigation'
import { products } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'
import { ProductPanel } from '@/components/products/ProductPanel'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps) {
  const slug = params.slug as ProductSlug
  const product = products[slug]
  if (!product) return {}
  return {
    title: `${product.name} — Síndiconet Brand Center`,
    description: `Identidade visual completa do ${product.name}.`,
  }
}

export default function ProductPage({ params }: PageProps) {
  const slug = params.slug as ProductSlug
  if (!products[slug]) notFound()

  return <ProductPanel slug={slug} />
}
