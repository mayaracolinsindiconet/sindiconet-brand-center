'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// --- Nav structure ----------------------------------------------------------

const allLinks = [
  { href: '/branding',      label: 'Branding'    },
  { href: '/identidade',    label: 'Identidade'  },
  { href: '/banco-imagens', label: 'Banco de Imagens' },
  { href: '/downloads',     label: 'Downloads'   },
  { href: '/tom-de-voz',    label: 'Tom de Voz IA', highlight: true },
]

// --- Component ---------------------------------------------------------------

export function BrandNav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // scroll listener
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 80) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const onDark = !scrolled && !mobileOpen

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  // text colours
  const activeColor   = onDark ? 'text-white'                         : 'text-[#3e77db]'
  const inactiveColor = onDark ? 'text-white/65 hover:text-white'     : 'text-[#3D3D3D]/65 hover:text-[#3D3D3D]'
  const underlineColor = onDark ? 'bg-white'                          : 'bg-[#3e77db]'

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-[#1f3c6e] border-b border-white/10'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" aria-label="Síndiconet Brand Center — início">
            <SindiconetLogo scrolled={scrolled || mobileOpen} />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {allLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium font-body transition-colors rounded-lg ${
                    isActive(link.href) ? activeColor : inactiveColor
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full ${underlineColor}`}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            {['top', 'mid', 'bot'].map((pos) => (
              <span
                key={pos}
                className={`block w-5 h-px transition-all duration-200 ${
                  scrolled || mobileOpen ? 'bg-[#3D3D3D]' : 'bg-white'
                } ${
                  pos === 'top' ? (mobileOpen ? 'translate-y-[3px] rotate-45'  : '-translate-y-1') :
                  pos === 'mid' ? (mobileOpen ? 'opacity-0'                     : 'opacity-100')    :
                                  (mobileOpen ? '-translate-y-[3px] -rotate-45' : 'translate-y-1')
                }`}
              />
            ))}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-x-0 top-16 z-40 bg-white border-b border-black/5 shadow-lg md:hidden"
          >
            <ul className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              {allLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium font-body transition-colors ${
                      isActive(link.href)
                        ? 'bg-[#cfddf6] text-[#3e77db]'
                        : 'text-[#3D3D3D]/70 hover:bg-[#F4F6F8]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// --- Logo ----------------------------------------------------------------------

function SindiconetLogo({ scrolled }: { scrolled: boolean }) {
  const src = scrolled
    ? '/assets/logos/sindiconet-mista-colorida.svg'
    : '/assets/logos/sindiconet-mista-branca.svg'

  return (
    <div className="relative flex items-center gap-2.5">
      <div className="relative w-[120px] h-[28px]">
        <Image
          src={src}
          alt="Síndiconet"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
      <span
        className={`hidden sm:inline text-[9px] font-body font-semibold uppercase tracking-[0.18em] opacity-50 ${
          scrolled ? 'text-[#3D3D3D]' : 'text-white'
        }`}
      >
        Brand Center
      </span>
    </div>
  )
}
