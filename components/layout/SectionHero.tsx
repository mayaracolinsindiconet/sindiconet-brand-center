'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface SectionHeroProps {
  title: string
  description?: string
  breadcrumb?: { label: string; href: string }[]
  accentColor?: string
}

export function SectionHero({
  title,
  description,
  breadcrumb,
  accentColor = '#3e77db',
}: SectionHeroProps) {
  return (
    <div className="pt-32 pb-20 px-6 bg-[#1f3c6e] relative overflow-hidden">
      {/* subtle Principal blue radial */}
      <div
        className="absolute inset-0 opacity-[0.18] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 80% at 65% 40%, ${accentColor}, transparent 65%)`,
        }}
      />
      {/* bottom-left depth shadow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse 60% 60% at -10% 110%, #101e37 0%, transparent 55%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto relative">
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-6"
          >
            <Link
              href="/"
              className="text-xs font-body text-white/40 hover:text-white/70 transition-colors"
            >
              Brand Center
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <span className="text-white/20 text-xs">·</span>
                {i === breadcrumb.length - 1 ? (
                  <span className="text-xs font-body text-white/60">{crumb.label}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-xs font-body text-white/40 hover:text-white/70 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="font-headline font-bold text-4xl md:text-6xl text-white leading-tight mb-4"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            className="font-body text-lg text-white/60 max-w-2xl"
          >
            {description}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ backgroundColor: accentColor, originX: 0 }}
          className="mt-8 h-0.5 w-16 rounded-full"
        />
      </div>
    </div>
  )
}
