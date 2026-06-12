'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// ─── Sidebar nav items ────────────────────────────────────────────────────────

const sidebarItems = [
  {
    href: '/identidade/logo',
    label: 'Logo',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="3.5" width="14" height="9" rx="1.8" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="5" cy="8" r="1.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    href: '/identidade/cores',
    label: 'Paleta',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="5.5" cy="6" r="3.2" fill="currentColor" fillOpacity="0.9" />
        <circle cx="10.5" cy="6" r="3.2" fill="currentColor" fillOpacity="0.55" />
        <circle cx="8" cy="10.5" r="3.2" fill="currentColor" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    href: '/identidade/tipografia',
    label: 'Tipografia',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2.5 4h11M8 4v8M5 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/identidade/produtos',
    label: 'Produtos',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2 5.5L8 2.5L14 5.5V10.5L8 13.5L2 10.5V5.5Z"
          stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: '/identidade/icones',
    label: 'Ícones',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 1.5L9.8 6.2H14.5L10.7 8.9L12 13.5L8 10.8L4 13.5L5.3 8.9L1.5 6.2H6.2L8 1.5Z"
          stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
]

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function IdentidadeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <div className="min-h-screen">

      {/* Sidebar — fixed, sempre visível no desktop */}
      <aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-56 border-r border-black/6 bg-white z-40 overflow-y-auto">
        <div className="px-4 py-6">

          {/* Section label */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D3D3D]/35 font-body mb-4 px-2">
            Identidade
          </p>

          <nav aria-label="Seções de identidade">
            <ul className="flex flex-col gap-0.5">
              {sidebarItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium font-body transition-colors ${
                        active
                          ? 'bg-[#cfddf6] text-[#3e77db]'
                          : 'text-[#3D3D3D]/60 hover:bg-[#F4F6F8] hover:text-[#3D3D3D]'
                      }`}
                    >
                      <span className={active ? 'text-[#3e77db]' : 'text-[#3D3D3D]/40'}>
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile top bar for sidebar nav — fixed abaixo do header */}
      <div className="md:hidden fixed top-16 inset-x-0 z-40 bg-white border-b border-black/6 overflow-x-auto">
        <nav aria-label="Seções de identidade" className="flex gap-1 px-4 py-2">
          {sidebarItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium font-body transition-colors ${
                  active
                    ? 'bg-[#cfddf6] text-[#3e77db]'
                    : 'text-[#3D3D3D]/60 hover:bg-[#F4F6F8]'
                }`}
              >
                <span className={active ? 'text-[#3e77db]' : 'text-[#3D3D3D]/40'}>
                  {item.icon}
                </span>
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content — margem esquerda para não ficar atrás da sidebar */}
      <div className="md:ml-56 mt-10 md:mt-0 min-w-0">
        {children}
      </div>

    </div>
  )
}
