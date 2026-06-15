'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { products, productList } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'
import { ProductPaletteSection } from '@/components/colors/ProductPaletteSection'
import { ProductIconGrid } from './ProductIconGrid'
import { LogoApplicationCard } from './LogoApplicationCard'

interface ProductPanelProps {
  slug: ProductSlug
}

const productDescriptions: Record<ProductSlug, { tagline: string; description: string }> = {
  conteudo: {
    tagline: 'Conhecimento para quem administra.',
    description: 'A principal fonte de conteúdo especializado para síndicos e gestores condominiais do Brasil.',
  },
  conviver: {
    tagline: 'Comunidade e criação em um só lugar.',
    description: 'Plataforma que aproxima moradores, facilita a comunicação e dá voz aos criadores de conteúdo do universo condominial.',
  },
  coteibem: {
    tagline: 'O melhor preço para o seu condomínio.',
    description: 'Conecte seu condomínio aos melhores fornecedores e serviços com cotações transparentes.',
  },
  cursos: {
    tagline: 'Capacite-se para liderar melhor.',
    description: 'Cursos e certificações para síndicos que querem se profissionalizar e ampliar sua atuação.',
  },
  empregos: {
    tagline: 'As melhores vagas do universo condominial.',
    description: 'Conectamos síndicos e gestores às oportunidades de emprego e contratação do setor condominial.',
  },
  pro: {
    tagline: 'Gestão profissional de alto nível.',
    description: 'A solução completa para síndicos profissionais que precisam de ferramentas robustas e suporte dedicado.',
  },
}

const sections = [
  { id: 'hero',     label: 'Visão geral' },
  { id: 'cores',    label: 'Cores' },
  { id: 'logo',     label: 'Logo' },
  { id: 'icones',   label: 'Ícones' },
  { id: 'exemplos', label: 'Exemplos' },
]

// ─── Short name labels shown in the switcher ──────────────────────────────────
const shortNames: Record<ProductSlug, string> = {
  conteudo: 'Conteúdo',
  conviver: 'Conviver',
  coteibem: 'Coteibem',
  cursos:   'Cursos',
  empregos: 'Empregos',
  pro:      'PRO',
}

export function ProductPanel({ slug }: ProductPanelProps) {
  const router = useRouter()
  const p    = products[slug]
  const info = productDescriptions[slug]

  const [activeSection, setActiveSection] = useState('hero')
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id]
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  function scrollTo(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div data-product={slug} className="min-h-screen">

      {/* ── Product Switcher — sticky below site header ───────────────── */}
      <nav
        aria-label="Navegar entre produtos"
        className="sticky top-16 z-40 bg-white border-b border-black/8 overflow-x-auto"
      >
        <ul className="flex items-center gap-2 px-6 py-2.5 min-w-max">
          {productList.map((s) => {
            const prod    = products[s]
            const isActive = s === slug
            return (
              <li key={s}>
                <button
                  onClick={() => router.push(`/identidade/produtos/${s}`)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-body whitespace-nowrap transition-all ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-[#3D3D3D]/55 hover:bg-[#F4F6F8] hover:text-[#3D3D3D]'
                  }`}
                  style={isActive ? { backgroundColor: prod.colors.primary } : undefined}
                >
                  {/* Color dot — visible when not active */}
                  {!isActive && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: prod.colors.primary }}
                    />
                  )}
                  {shortNames[s]}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <main>
        {/* ── Hero banner ───────────────────────────────────────────────── */}
        <section
          id="hero"
          ref={(el) => { sectionRefs.current['hero'] = el }}
          className="relative overflow-hidden"
          style={{ backgroundColor: p.colors.primary }}
        >
          {/* Depth glow using sombra */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 70% 60% at 80% 30%, ${p.colors.sombra}55, transparent 65%)` }}
          />

          {/* Product info */}
          <div className="relative max-w-[1280px] mx-auto px-8 pb-10 pt-8">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-[10px] font-semibold uppercase tracking-[0.22em] font-body mb-3"
              style={{ color: p.colors.onPrimary, opacity: 0.55 }}
            >
              Produto
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="font-headline font-bold text-5xl md:text-7xl mb-4"
              style={{ color: p.colors.onPrimary }}
            >
              {p.name.replace(/^Síndiconet\s+(?:e\s+)?/, '')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-body text-xl mb-4 max-w-xl"
              style={{ color: p.colors.onPrimary, opacity: 0.75 }}
            >
              {info.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="font-body text-base max-w-lg"
              style={{ color: p.colors.onPrimary, opacity: 0.55 }}
            >
              {info.description}
            </motion.p>
          </div>

          {/* ── Section nav — sticky inside product color area ── */}
          <nav
            aria-label="Seções do produto"
            className="sticky top-[calc(2.5rem+2.5rem)] z-30 border-t"
            style={{ backgroundColor: p.colors.primary, borderColor: `${p.colors.onPrimary}18` }}
          >
            <div className="max-w-[1280px] mx-auto px-8 flex items-center gap-4">
              {/* Fixed product name */}
              <span
                className="shrink-0 text-sm font-semibold font-body whitespace-nowrap"
                style={{ color: p.colors.onPrimary }}
              >
                {p.name}
              </span>
              {/* Divider */}
              <div className="shrink-0 w-px h-4" style={{ backgroundColor: `${p.colors.onPrimary}30` }} />
              {/* Section links */}
              <ul className="flex gap-1 py-2 overflow-x-auto">
                {sections.map(({ id, label }) => (
                  <li key={id} className="shrink-0">
                    <button
                      onClick={() => scrollTo(id)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium font-body whitespace-nowrap transition-all ${
                        activeSection === id ? 'bg-white/15 font-semibold' : 'hover:bg-white/10'
                      }`}
                      style={{ color: p.colors.onPrimary, opacity: activeSection === id ? 1 : 0.6 }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </section>

        {/* ── Paleta ─────────────────────────────────────────────────── */}
        <section
          id="cores"
          ref={(el) => { sectionRefs.current['cores'] = el }}
          className="py-16 px-8 max-w-[1280px] mx-auto"
        >
          <SectionTitle color={p.colors.primary}>Paleta de cores</SectionTitle>
          <ProductPaletteSection product={slug} />
        </section>

        {/* ── Logo aplicado ───────────────────────────────────────────── */}
        <section
          id="logo"
          ref={(el) => { sectionRefs.current['logo'] = el }}
          className="py-16 px-8 bg-[#F4F6F8]"
        >
          <div className="max-w-[1280px] mx-auto">
            <SectionTitle color={p.colors.primary}>Logo aplicado</SectionTitle>

            {slug === 'pro' ? (
              /* ── PRO: logos específicas do produto ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <LogoApplicationCard
                  product={slug}
                  logoVariant="mista"
                  mode="gradient"
                  customLogoSrc="/assets/logos/pro/pro-mista-dark.svg"
                  note="Logo PRO branca sobre gradient escuro — aplicação principal em fundos escuros."
                />
                <LogoApplicationCard
                  product={slug}
                  logoVariant="mista"
                  mode="correct"
                  customLogoSrc="/assets/logos/pro/pro-mista-colorida.svg"
                  customBg="#FFFFFF"
                  note="Logo PRO colorida sobre fundo branco — aplicação em fundos claros."
                />
                <LogoApplicationCard
                  product={slug}
                  logoVariant="simbolo"
                  mode="correct"
                  customLogoSrc="/assets/logos/pro/pro-simbolo-gradient.svg"
                  customBg="#FFFFFF"
                  note="Símbolo gradient em contextos reduzidos, sobre fundo branco."
                />
                <LogoApplicationCard
                  product={slug}
                  logoVariant="mista"
                  mode="sombra"
                  customLogoSrc="/assets/logos/pro/pro-mista-colorida.svg"
                  note="Evite usar a logo colorida sobre fundo escuro — baixo contraste."
                />
              </div>
            ) : (
              /* ── Demais produtos ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <LogoApplicationCard
                  product={slug}
                  logoVariant="mista"
                  mode="correct"
                  note="Versão branca sobre cor primária do produto."
                />
                <LogoApplicationCard
                  product={slug}
                  logoVariant="mista"
                  mode="sombra-logo"
                  note="Logo na cor sombra sobre fundo primário — variação monocromática."
                />
                <LogoApplicationCard
                  product={slug}
                  logoVariant="mista"
                  mode="sombra"
                  note="Evite usar logo branca sobre fundo sombra do produto."
                />
                <LogoApplicationCard
                  product={slug}
                  logoVariant="mista"
                  mode="incorrect"
                  note="Evite usar a versão colorida sobre fundo colorido."
                />
              </div>
            )}
          </div>
        </section>

        {/* ── Ícones ──────────────────────────────────────────────────── */}
        <section
          id="icones"
          ref={(el) => { sectionRefs.current['icones'] = el }}
          className="py-16 px-8 max-w-[1280px] mx-auto"
        >
          <SectionTitle color={p.colors.primary}>Ícones do produto</SectionTitle>
          <ProductIconGrid product={slug} />
        </section>

        {/* ── Exemplos ────────────────────────────────────────────────── */}
        <section
          id="exemplos"
          ref={(el) => { sectionRefs.current['exemplos'] = el }}
          className="py-16 px-8 max-w-[1280px] mx-auto"
        >
          <SectionTitle color={p.colors.primary}>Exemplos de aplicação</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-dashed border-black/10 bg-[#F4F6F8] p-10 text-center"
              >
                <p className="text-xs font-body text-[#3D3D3D]/40">Mockup {n}</p>
                <p className="text-[10px] font-body text-[#3D3D3D]/30 mt-1">Em produção</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-0.5 h-6 rounded-full" style={{ backgroundColor: color }} />
      <h2 className="font-headline font-bold text-2xl text-[#101e37]">{children}</h2>
    </div>
  )
}
