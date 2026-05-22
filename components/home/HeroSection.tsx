'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
const words = 'O sistema visual da Síndiconet.'.split(' ')

export function HeroSection() {
  const scrollTarget = useRef<HTMLDivElement>(null)

  function handleExplore() {
    scrollTarget.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen bg-[#1f3c6e] flex flex-col justify-center relative overflow-hidden">
      {/* Principal blue glow — right-center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 65% 38%, rgba(62,119,219,0.55) 0%, transparent 65%)',
        }}
      />
      {/* Subtom 900 depth — bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at -5% 105%, #101e37 0%, transparent 55%)',
        }}
      />
      {/* Luz soft highlight — top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 95% 5%, rgba(159,187,237,0.12) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-[1280px] mx-auto px-6 pt-32 pb-24 relative">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#6e99e4] text-xs font-semibold uppercase tracking-[0.2em] font-body mb-8"
        >
          Brand Center
        </motion.p>

        <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-8 max-w-4xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.2 + i * 0.05,
                ease: 'easeOut',
              }}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.65 }}
          className="font-body text-white/50 text-lg md:text-xl max-w-xl mb-12"
        >
          Diretrizes, assets e sistemas de identidade visual da marca e dos seus produtos — em um único lugar.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.8 }}
          onClick={handleExplore}
          aria-label="Rolar para explorar as seções"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium font-body border border-white/10 hover:border-white/20 transition-all"
        >
          Explorar
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 2v10M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

      <div ref={scrollTarget} />
    </section>
  )
}
