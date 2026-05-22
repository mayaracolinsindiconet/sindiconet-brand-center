'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const sections = [
  {
    href: '/identidade/logo',
    title: 'Logo',
    description: 'Variações, área de segurança e simulador interativo de uso.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/identidade/cores',
    title: 'Cores',
    description: 'Paleta completa da marca e identidade cromática dos produtos.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c1.657 0 2-1.343 2-3 0-.8-.3-1.5-.3-2.2 0-1.657 1.343-3 3-3H19c2.76 0 3-2.1 3-3C22 6.477 17.523 2 12 2z" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="7" cy="12" r="1.25" fill="currentColor" />
        <circle cx="10" cy="8" r="1.25" fill="currentColor" />
        <circle cx="15" cy="8" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: '/identidade/tipografia',
    title: 'Tipografia',
    description: 'Famílias tipográficas, escala e hierarquia visual.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16M4 12h10M4 18h7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/identidade/produtos',
    title: 'Produtos',
    description: 'Identidade visual dos 6 produtos do ecossistema Síndiconet.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    ),
  },
  {
    href: '/fotografia',
    title: 'Fotografia',
    description: 'Pilares do estilo fotográfico e moodboard de referências.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.75" />
        <path d="M9 6l1.5-2h3L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/downloads',
    title: 'Downloads',
    description: 'Assets, logos, fontes e templates prontos para uso.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3v13M7 11l5 5 5-5M3 20h18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export function SectionCardGrid() {
  return (
    <section className="bg-[#F4F6F8] py-24 px-6">
      <div className="max-w-[1280px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3e77db] font-body mb-3"
        >
          Explorar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="font-headline font-bold text-3xl md:text-4xl text-[#101e37] mb-12"
        >
          Tudo sobre a marca
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {sections.map((section) => (
            <motion.div key={section.href} variants={cardVariants}>
              <Link
                href={section.href}
                className="group flex flex-col h-full bg-white rounded-2xl p-7 border border-black/5 hover:border-[#9fbbed] hover:shadow-lg hover:shadow-[#3e77db]/5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-[#cfddf6] text-[#3e77db] flex items-center justify-center mb-5 group-hover:bg-[#3e77db] group-hover:text-white transition-colors duration-200">
                  {section.icon}
                </div>
                <h3 className="font-headline font-semibold text-xl text-[#101e37] mb-2">
                  {section.title}
                </h3>
                <p className="font-body text-sm text-[#3D3D3D]/55 leading-relaxed flex-1">
                  {section.description}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-[#3e77db] text-xs font-semibold font-body opacity-0 group-hover:opacity-100 transition-opacity">
                  Acessar
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
