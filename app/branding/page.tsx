'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  IconConteudo,
  IconCursos,
  IconCoteibem,
  IconConviver,
  IconPro,
  IconCreators,
  IconDownloads,
} from '@/components/products/ProductSvgIcons'

// ─── Section registry ─────────────────────────────────────────────────────────
const sections = [
  { id: 'contexto',       label: 'Contexto' },
  { id: 'mercado',        label: 'Mercado' },
  { id: 'golden-circle',  label: 'Golden Circle' },
  { id: 'posicionamento', label: 'Posicionamento' },
  { id: 'arquitetura',    label: 'Arquitetura de Marca' },
  { id: 'personalidade',  label: 'Personalidade & Voz' },
  { id: 'personas',       label: 'Personas' },
  { id: 'lideranca',      label: 'Liderança' },
  { id: 'cultura',        label: 'Cultura' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionBlock({ id, eyebrow, title, children }: {
  id: string; eyebrow: string; title: string; children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-0.5 h-6 rounded-full bg-[#3e77db] shrink-0" />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3e77db] font-body mb-0.5">{eyebrow}</p>
          <h2 className="font-headline font-bold text-2xl text-[#101e37]">{title}</h2>
        </div>
      </div>
      {children}
    </section>
  )
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-2xl border border-black/8 p-6 ${className}`}>{children}</div>
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="relative pl-6 border-l-2 border-[#3e77db] my-6">
      <p className="font-body text-[#3D3D3D]/75 text-lg leading-relaxed italic">{children}</p>
    </blockquote>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FundacaoPage() {
  const [active, setActive] = useState('contexto')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      if (entry.isIntersecting) { setActive(entry.target.id); break }
    }
  }, [])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, { rootMargin: '-20% 0px -60% 0px' })
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current!.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [handleObserver])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8]">

      {/* Hero */}
      <div className="bg-[#101e37] pt-28 pb-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 70% 30%, rgba(62,119,219,0.18) 0%, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto relative">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="text-[#6e99e4] text-xs font-semibold uppercase tracking-[0.2em] font-body mb-4">
            Brand Guide Estratégico · 2026
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
            className="font-headline font-bold text-5xl md:text-7xl text-white leading-[1.05] mb-4">
            Branding
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="font-body text-white/50 text-lg max-w-xl">
            Os alicerces estratégicos que definem nossa verdade, nosso lugar no mundo e como nos expressamos.
          </motion.p>
        </div>
      </div>

      {/* Mobile nav picker */}
      <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-black/8 px-4 py-3">
        <button onClick={() => setMobileMenuOpen((v) => !v)}
          className="flex items-center justify-between w-full text-sm font-medium font-body text-[#101e37]">
          <span>{sections.find((s) => s.id === active)?.label ?? 'Navegar'}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}>
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }} className="overflow-hidden mt-2">
              {sections.map((s) => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-body transition-colors ${active === s.id ? 'bg-[#cfddf6] text-[#3e77db] font-semibold' : 'text-[#3D3D3D]/60 hover:bg-[#F4F6F8]'}`}>
                  {s.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12">

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24" aria-label="Seções do brand guide">
              <ul className="space-y-0.5">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <button onClick={() => scrollTo(s.id)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all ${active === s.id ? 'bg-white text-[#3e77db] font-semibold shadow-sm' : 'text-[#3D3D3D]/55 hover:text-[#3D3D3D] hover:bg-white/60'}`}>
                      <span className={`shrink-0 text-[10px] font-mono font-bold transition-colors ${active === s.id ? 'text-[#3e77db]' : 'text-[#3D3D3D]/25'}`}>
                        0{i + 1}
                      </span>
                      {s.label}
                      {active === s.id && (
                        <motion.span layoutId="sidebar-indicator" className="ml-auto w-1 h-4 rounded-full bg-[#3e77db]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content */}
          <main className="space-y-20 min-w-0">

            {/* 01 · Contexto */}
            <SectionBlock id="contexto" eyebrow="01 · Contexto" title="A Próxima Evolução">
              <p className="font-body text-[#3D3D3D]/65 text-base leading-relaxed mb-8 max-w-2xl">
                Este documento não é um manual de regras visuais. É uma bússola estratégica que define nossa verdade, nosso lugar no mundo e como nos expressamos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { year: '1996', role: 'Resolvedor',   desc: 'O síndico resolvia problemas operacionais do dia a dia.', highlight: false },
                  { year: '2015', role: 'Gestor',        desc: 'Profissionalização da gestão condominial no Brasil.',     highlight: false },
                  { year: '2026', role: 'Estrategista',  desc: 'IA, dados e alta performance definem a nova era.',        highlight: true  },
                ].map((step) => (
                  <Card key={step.year} className={step.highlight ? 'border-[#3e77db]/20 bg-gradient-to-br from-[#3e77db]/5 to-white' : ''}>
                    <p className="text-[10px] font-mono font-bold text-[#3D3D3D]/30 mb-1">{step.year}</p>
                    <p className={`font-headline font-bold text-2xl mb-2 ${step.highlight ? 'text-[#3e77db]' : 'text-[#101e37]'}`}>{step.role}</p>
                    <p className="font-body text-sm text-[#3D3D3D]/60 leading-relaxed">{step.desc}</p>
                  </Card>
                ))}
              </div>
              <Quote>
                A nova identidade visual reflete essa maturidade: de ecossistema plural e fragmentado para plataforma unificada, sólida e de alta performance.
              </Quote>
            </SectionBlock>

            {/* 02 · Mercado */}
            <SectionBlock id="mercado" eyebrow="02 · Mercado" title="O Mercado em Números">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {[
                  { value: '327 mil', label: 'Condomínios ativos no Brasil' },
                  { value: '68 M',    label: 'Brasileiros vivem em condomínios' },
                  { value: '46%',     label: 'Dos síndicos já atuam profissionalmente' },
                  { value: '72%',     label: 'Buscaram cursos de qualificação' },
                ].map((stat) => (
                  <Card key={stat.label} className="text-center">
                    <p className="font-headline font-bold text-3xl text-[#3e77db] mb-1">{stat.value}</p>
                    <p className="font-body text-xs text-[#3D3D3D]/55 leading-snug">{stat.label}</p>
                  </Card>
                ))}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">Três ondas que redefiniram o papel do síndico</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { year: '2020', wave: '1ª Onda', name: 'Pandemia',            desc: 'Home-office intensificou a vida em condomínio. Moradores mais exigentes. Gestão exponencialmente mais complexa.' },
                  { year: '2024', wave: '2ª Onda', name: 'Profissionalização',  desc: 'Boom de síndicos profissionais: +32% nas contratações em 3 anos. Surgem certificações, franquias e mega-síndicos.' },
                  { year: '2026', wave: '3ª Onda', name: 'Inteligência',        desc: 'IA na gestão é caminho sem volta. Dados substituem achismo. O síndico se torna estrategista.' },
                ].map((w) => (
                  <Card key={w.wave}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-wider font-body bg-[#3e77db]/8 text-[#3e77db] px-2.5 py-1 rounded-lg">{w.wave}</span>
                      <span className="text-[10px] font-mono text-[#3D3D3D]/30">{w.year}</span>
                    </div>
                    <p className="font-headline font-bold text-lg text-[#101e37] mb-2">{w.name}</p>
                    <p className="font-body text-sm text-[#3D3D3D]/60 leading-relaxed">{w.desc}</p>
                  </Card>
                ))}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">Fundamentos estratégicos</p>
              <div className="rounded-2xl border border-black/8 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F4F6F8] border-b border-black/8">
                      {['Dado', 'Fonte', 'Implicação estratégica'].map((h) => (
                        <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { dado: '"Boa gestão" é fator #1 de satisfação',  fonte: 'Censo SíndicoNet 2024',    impl: 'Propósito ataca o que mais importa' },
                      { dado: '42,2% preferem modelo híbrido',           fonte: 'Pesquisa SíndicoNet 2025', impl: 'Necessidade do Pro + conexão humana' },
                      { dado: '66% não usam ou usam pouco IA',           fonte: 'Pesquisa SíndicoNet 2025', impl: 'Oportunidade massiva para IA' },
                      { dado: '68% gastam +2h/dia no operacional',       fonte: 'Censo SíndicoNet 2024',    impl: 'Urgência de automação' },
                    ].map((row, i) => (
                      <tr key={i} className={`border-b border-black/5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]/40'}`}>
                        <td className="px-5 py-4 text-sm font-body text-[#101e37] font-medium max-w-xs">{row.dado}</td>
                        <td className="px-5 py-4 text-xs font-body text-[#3D3D3D]/50 whitespace-nowrap">{row.fonte}</td>
                        <td className="px-5 py-4 text-xs font-body text-[#3D3D3D]/65">{row.impl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionBlock>

            {/* 03 · Golden Circle */}
            <SectionBlock id="golden-circle" eyebrow="03 · Golden Circle" title="Por que Existimos">
              <Quote>
                Acreditamos que uma gestão inteligente transforma a vida do síndico, do administrador e de milhões de pessoas. Quando o condomínio está em ordem, a vida de todos flui melhor.
              </Quote>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4 mt-10">Como fazemos — o tripé fundamental</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {[
                  { num: '01', title: 'Conteúdo',               desc: 'Curadoria rigorosa e informação de alto valor. Transformamos dados complexos em conhecimento acionável, garantindo que cada decisão do gestor seja embasada e segura.' },
                  { num: '02', title: 'Conexões',                desc: 'Uma comunidade vibrante de pares e especialistas. Fomentamos um ecossistema colaborativo onde as melhores práticas são compartilhadas, validadas e multiplicadas.' },
                  { num: '03', title: 'Inteligência Artificial', desc: 'O motor da gestão escalável. Soluções digitais que absorvem a carga operacional, reduzem o atrito diário e liberam o síndico para a estratégia.' },
                ].map((p) => (
                  <Card key={p.num}>
                    <span className="font-headline font-bold text-4xl text-[#cfddf6] leading-none block mb-3">{p.num}</span>
                    <p className="font-headline font-bold text-lg text-[#101e37] mb-2">{p.title}</p>
                    <p className="font-body text-sm text-[#3D3D3D]/60 leading-relaxed">{p.desc}</p>
                  </Card>
                ))}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">O que fazemos — plataforma integrada</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { num: '01', name: 'Conteúdo',   desc: 'A principal fonte de informação e atualização do mercado condominial.' },
                  { num: '02', name: 'Cursos',      desc: 'A trilha definitiva para a capacitação e certificação de excelência.' },
                  { num: '03', name: 'Coteibem',    desc: 'O maior e mais seguro marketplace do setor condominial.' },
                  { num: '04', name: 'Eventos',     desc: 'Experiências imersivas que unem conhecimento e networking qualificado.' },
                  { num: '05', name: 'PRO',         desc: 'O ecossistema premium impulsionado por IA para alta performance.' },
                  { num: '06', name: 'Conviver',    desc: 'O espaço seguro para troca de experiências e resolução colaborativa.' },
                  { num: '07', name: 'Conexão',     desc: 'Canal direto de relacionamento e engajamento com os principais players do setor.' },
                ].map((ch) => (
                  <div key={ch.num} className="flex items-start gap-4 bg-white rounded-xl border border-black/8 px-5 py-4">
                    <span className="font-mono text-[10px] font-bold text-[#3D3D3D]/25 shrink-0 mt-0.5">{ch.num}</span>
                    <div>
                      <p className="font-headline font-bold text-base text-[#101e37]">{ch.name}</p>
                      <p className="font-body text-xs text-[#3D3D3D]/55 mt-0.5 leading-relaxed">{ch.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionBlock>

            {/* 04 · Posicionamento */}
            <SectionBlock id="posicionamento" eyebrow="04 · Posicionamento" title="Evolução do Discurso">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <Card className="opacity-60">
                  <span className="text-[10px] font-semibold uppercase tracking-wider font-body bg-[#101e37]/8 text-[#101e37] px-2.5 py-1 rounded-lg">Antes</span>
                  <p className="font-headline font-bold text-xl text-[#3D3D3D] mt-4 mb-3">O maior portal de conteúdo para síndicos.</p>
                  <ul className="space-y-2">
                    {['Comunicação fragmentada por produtos independentes', 'Tom reativo: "Nós ajudamos a resolver o seu problema."', 'Síndico visto como administrador operacional'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm font-body text-[#3D3D3D]/60">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3D3D3D]/25 shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="border-[#3e77db]/20 bg-gradient-to-br from-[#3e77db]/5 to-white">
                  <span className="text-[10px] font-semibold uppercase tracking-wider font-body bg-[#3e77db]/8 text-[#3e77db] px-2.5 py-1 rounded-lg">2026</span>
                  <p className="font-headline font-bold text-xl text-[#101e37] mt-4 mb-3">A plataforma definitiva de gestão condominial.</p>
                  <ul className="space-y-2">
                    {['Marca única e forte com múltiplos canais integrados', 'Tom proativo: "Elevamos a sua gestão à alta performance."', 'Síndico visto como estrategista de negócios'].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm font-body text-[#3D3D3D]/70">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#3e77db] shrink-0" />{item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">Taglines</p>
              <div className="space-y-3">
                <Card>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-2">Principal</p>
                  <p className="font-headline font-bold text-2xl text-[#101e37]">Transformando gestores em estrategistas.</p>
                </Card>
                <Card>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-2">Suporte</p>
                  <p className="font-body text-base text-[#3D3D3D]/75 leading-relaxed">
                    "Conteúdo, conexões e inteligência artificial para gestores condominiais."
                  </p>
                  <p className="font-body text-xs text-[#3D3D3D]/40 mt-3">Ideal para assinaturas de e-mail, seções "Sobre Nós" e materiais institucionais.</p>
                </Card>
              </div>
            </SectionBlock>

            {/* 05 · Arquitetura de Marca */}
            <SectionBlock id="arquitetura" eyebrow="05 · Arquitetura de Marca" title="Uma Marca Forte. Múltiplos Canais.">
              <p className="font-body text-[#3D3D3D]/65 text-base leading-relaxed mb-8 max-w-2xl">
                Optamos por concentrar toda a nossa força e autoridade em um único nome: <strong className="text-[#101e37]">SíndicoNet</strong>. Criar submarcas dilui o poder do nosso ecossistema. Temos uma única marca forte que atua através de diferentes canais especializados.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Conteúdo',   bg: '#6e99e4', text: '#fff',     icon: IconConteudo  },
                  { name: 'Cursos',     bg: '#F57A0C', text: '#fff',     icon: IconCursos    },
                  { name: 'Coteibem',   bg: '#f6be52', text: '#3e3015',  icon: IconCoteibem  },
                  { name: 'Conviver',   bg: '#41ae89', text: '#fff',     icon: IconConviver  },
                  { name: 'PRO',        bg: '#7441AC', text: '#fff',     icon: IconPro       },
                  { name: 'Conexão',    bg: '#3e77db', text: '#fff',     icon: IconCreators  },
                  { name: 'Eventos',    bg: '#9fbbed', text: '#101e37',  icon: null          },
                  { name: 'Downloads',  bg: '#3D3D3D', text: '#fff',     icon: IconDownloads },
                ].map((ch) => {
                  const Icon = ch.icon
                  return (
                    <div key={ch.name} className="relative rounded-xl p-4 h-20 flex items-end" style={{ backgroundColor: ch.bg }}>
                      {Icon && (
                        <div className="absolute top-2 right-2 w-9 h-9" style={{ color: ch.text }}>
                          <Icon className="w-full h-full" />
                        </div>
                      )}
                      <p className="font-headline font-bold text-sm leading-tight" style={{ color: ch.text }}>{ch.name}</p>
                    </div>
                  )
                })}
              </div>
            </SectionBlock>

            {/* 06 · Personalidade & Voz */}
            <SectionBlock id="personalidade" eyebrow="06 · Personalidade & Voz" title="Como Nos Expressamos">
              <Card className="mb-8 !bg-[#101e37] border-transparent">
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                      <path d="M16 4L4 10v8c0 6.627 5.148 11.346 12 12 6.852-.654 12-5.373 12-12v-8L16 4z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M12 16l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 font-body mb-1">Arquétipo da Marca</p>
                    <p className="font-headline font-bold text-2xl text-white mb-2">The Guardian · O Guardião</p>
                    <p className="font-body text-white/60 text-sm leading-relaxed mb-4">Somos o porto seguro do gestor — base sólida para inovar com segurança.</p>
                    <div className="flex flex-wrap gap-2">
                      {['Proteção', 'Orientação', 'Estabilidade'].map((attr) => (
                        <span key={attr} className="px-3 py-1 rounded-lg bg-white/10 text-white/80 text-xs font-semibold font-body">{attr}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">Os 4 atributos do tom de voz</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  { attr: 'Autoritário', nuance: 'mas não arrogante',      desc: 'Falamos com a propriedade de quem conhece o mercado há décadas.' },
                  { attr: 'Empático',    nuance: 'mas não informal demais', desc: 'Entendemos as dores do síndico, mas mantemos a postura profissional.' },
                  { attr: 'Prático',     nuance: 'mas não raso',            desc: 'Entregamos soluções aplicáveis, sem jargões desnecessários.' },
                  { attr: 'Visionário',  nuance: 'mas pé no chão',          desc: 'Apontamos tendências (como IA), mas sempre com foco na aplicação real.' },
                ].map((t) => (
                  <Card key={t.attr} className="flex items-start gap-4">
                    <div className="w-0.5 h-10 rounded-full bg-[#3e77db] shrink-0 mt-1" />
                    <div>
                      <p className="font-headline font-bold text-lg text-[#101e37]">{t.attr}</p>
                      <p className="text-[10px] font-semibold text-[#3D3D3D]/40 font-body mb-2">{t.nuance}</p>
                      <p className="font-body text-sm text-[#3D3D3D]/60 leading-relaxed">{t.desc}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">O que dizemos vs. o que evitamos</p>
              <div className="rounded-2xl border border-black/8 overflow-hidden">
                <div className="grid grid-cols-2 bg-[#F4F6F8] border-b border-black/8">
                  <div className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-[#318367] font-body">✓ O que dizemos</div>
                  <div className="px-5 py-3 text-[10px] font-semibold uppercase tracking-widest text-[#D13D2A] font-body border-l border-black/8">✕ O que evitamos</div>
                </div>
                {[
                  { ok: '"A nova legislação exige adaptações. Veja o passo a passo para adequar seu condomínio."', no: '"Cuidado! Você pode ser multado se não fizer isso agora."', okTag: 'Foco na solução e clareza', noTag: 'Alarmismo e terrorismo' },
                  { ok: '"Dados do Censo SíndicoNet mostram que a inadimplência…"', no: '"Acreditamos que a melhor opção para o seu condomínio seja…"', okTag: 'Embasamento em dados', noTag: 'Achismo sem embasamento' },
                  { ok: '"Nossa plataforma otimiza seu tempo para você focar na estratégia."', no: '"Compre nosso produto porque ele é o melhor do mercado."', okTag: 'Empoderamento e benefício claro', noTag: 'Venda agressiva e arrogância' },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-2 border-b border-black/5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]/40'}`}>
                    <div className="px-5 py-4">
                      <p className="font-body text-sm text-[#101e37] leading-relaxed mb-1.5">{row.ok}</p>
                      <span className="text-[10px] font-semibold text-[#318367] font-body uppercase tracking-wide">{row.okTag}</span>
                    </div>
                    <div className="px-5 py-4 border-l border-black/8">
                      <p className="font-body text-sm text-[#3D3D3D]/50 leading-relaxed mb-1.5">{row.no}</p>
                      <span className="text-[10px] font-semibold text-[#D13D2A] font-body uppercase tracking-wide">{row.noTag}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4 mt-10">Diferenciais competitivos</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { num: '01', title: 'Pioneirismo e Autoridade',   desc: 'Quase 30 anos ditando os rumos do mercado condominial. Nossa história se confunde com a evolução da profissão de síndico no Brasil.' },
                  { num: '02', title: 'Ecossistema Completo',       desc: 'A única plataforma que integra conteúdo de ponta, educação certificada, marketplace seguro e comunidade engajada em um só lugar.' },
                  { num: '03', title: 'Curadoria Rigorosa',         desc: 'Informação validada por especialistas e fornecedores rigorosamente homologados. A confiança é o nosso principal ativo.' },
                  { num: '04', title: 'Inovação Contínua',          desc: 'Pioneiros na adoção de Inteligência Artificial e novas tecnologias para transformar a gestão condominial no Brasil.' },
                ].map((d) => (
                  <Card key={d.num} className="flex gap-4">
                    <span className="font-headline font-bold text-4xl text-[#cfddf6] leading-none shrink-0">{d.num}</span>
                    <div>
                      <p className="font-headline font-bold text-base text-[#101e37] mb-1">{d.title}</p>
                      <p className="font-body text-sm text-[#3D3D3D]/60 leading-relaxed">{d.desc}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </SectionBlock>

            {/* 07 · Personas */}
            <SectionBlock id="personas" eyebrow="07 · Personas" title="Com Quem Falamos">
              <p className="font-body text-[#3D3D3D]/65 text-base leading-relaxed mb-8 max-w-2xl">As quatro personas que servimos — cada uma com necessidades e expectativas distintas.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { num: '01', name: 'Síndico Morador',        photo: 'bruno.jpg',  busca: 'Praticidade, segurança jurídica e apoio para conciliar a gestão do condomínio com sua vida pessoal e profissional.',                                tags: ['Praticidade', 'Segurança jurídica', 'Equilíbrio'] },
                  { num: '02', name: 'Síndico Profissional',   photo: 'andre.jpg',  busca: 'Escala, eficiência operacional, networking qualificado e ferramentas de alta performance para gerir múltiplos condomínios.',                        tags: ['Escala', 'Eficiência', 'Alta performance'] },
                  { num: '03', name: 'Administradora',         photo: 'carla.jpg',  busca: 'Otimização de processos, atualização constante e soluções integradas para oferecer o melhor serviço aos seus condomínios clientes.',              tags: ['Otimização', 'Integração', 'Atualização'] },
                  { num: '04', name: 'Morador',                photo: 'diego.jpg',  busca: 'Transparência, conveniência, valorização do patrimônio e ferramentas que facilitem a boa convivência.',                                             tags: ['Transparência', 'Conveniência', 'Patrimônio'] },
                ].map((p) => (
                  <Card key={p.num} className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden bg-[#3e77db]/10 shrink-0 flex items-center justify-center">
                        <span className="font-headline font-bold text-xs text-[#3e77db]">{p.num}</span>
                        <img src={'/team/' + p.photo} alt={p.name} className="absolute inset-0 w-full h-full object-cover object-top" onError={(e) => (e.currentTarget.style.display='none')} />
                      </div>
                      <p className="font-headline font-bold text-lg text-[#101e37]">{p.name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-1.5">Busca</p>
                      <p className="font-body text-sm text-[#3D3D3D]/65 leading-relaxed">{p.busca}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold font-body bg-[#3e77db]/8 text-[#3e77db] px-2.5 py-1 rounded-lg">{tag}</span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </SectionBlock>

            {/* 08 · Liderança */}
            <SectionBlock id="lideranca" eyebrow="08 · Liderança" title="Liderança como Parte da Marca">
              <p className="font-body text-[#3D3D3D]/65 text-base leading-relaxed mb-8 max-w-2xl">
                A liderança do SíndicoNet não é apenas gestão — é posicionamento de marca. Perfis complementares que representam o passado, o presente e o futuro da plataforma.
              </p>

              {/* Perfis individuais */}
              <div className="space-y-6 mb-8">

                {/* Julio Paim */}
                <div className="rounded-2xl overflow-hidden border border-black/8 grid grid-cols-1 md:grid-cols-[280px_1fr]">
                  <div className="bg-[#101e37] p-8 flex flex-col justify-between min-h-[280px]">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 font-body mb-6">Fundador & Diretor Executivo</p>
                      <div className="w-full aspect-[3/4] max-h-44 rounded-xl bg-white/5 border border-white/10 mb-6 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                            <circle cx="24" cy="18" r="9" stroke="white" strokeOpacity=".3" strokeWidth="1.5" />
                            <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="white" strokeOpacity=".3" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                        <img src="/team/julio-paim.jpg" alt="Julio Paim" className="absolute inset-0 w-full h-full object-cover object-top" onError={(e) => (e.currentTarget.style.display='none')} />
                      </div>
                    </div>
                    <blockquote>
                      <p className="font-body text-sm text-white/70 leading-relaxed italic">
                        "Trinta anos de história se traduzem em autoridade insubstituível — a voz que o setor ouve antes de tomar decisão."
                      </p>
                    </blockquote>
                  </div>
                  <div className="bg-white p-8">
                    <h3 className="font-headline font-bold text-3xl text-[#101e37] mb-1">Julio Paim</h3>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3e77db] font-body mb-6">Fundador & Diretor Executivo</p>
                    <div className="space-y-4">
                      {[
                        { label: 'Pioneirismo',  desc: 'Quase 30 anos à frente de um mercado que ele ajudou a construir.' },
                        { label: 'Autoridade',   desc: 'A referência que o setor busca para entender tendências. Palestrante nos maiores eventos do mercado condominial.' },
                        { label: 'Visão',        desc: 'Antecipa movimentos do mercado com décadas de antecedência. Já previu a profissionalização, agora aponta a era da inteligência.' },
                      ].map((item) => (
                        <div key={item.label} className="bg-[#F4F6F8] rounded-xl px-5 py-4">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3e77db] font-body mb-1.5">{item.label}</p>
                          <p className="font-body text-sm text-[#3D3D3D]/65 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Marjorie Albuquerque */}
                <div className="rounded-2xl overflow-hidden border border-black/8 grid grid-cols-1 md:grid-cols-[280px_1fr]">
                  <div className="bg-[#1f3c6e] p-8 flex flex-col justify-between min-h-[280px]">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 font-body mb-6">CEO</p>
                      <div className="w-full aspect-[3/4] max-h-44 rounded-xl bg-white/5 border border-white/10 mb-6 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                            <circle cx="24" cy="18" r="9" stroke="white" strokeOpacity=".3" strokeWidth="1.5" />
                            <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="white" strokeOpacity=".3" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </div>
                        <img src="/team/marjorie-albuquerque.jpg" alt="Marjorie Albuquerque" className="absolute inset-0 w-full h-full object-cover object-top" onError={(e) => (e.currentTarget.style.display='none')} />
                      </div>
                    </div>
                    <blockquote>
                      <p className="font-body text-sm text-white/70 leading-relaxed italic">
                        "Síndica por dois mandatos, com mais de 20 anos de experiência em marketing e mercado condominial. A CEO que não apenas fala sobre tecnologia — decide e implementa."
                      </p>
                    </blockquote>
                  </div>
                  <div className="bg-white p-8">
                    <h3 className="font-headline font-bold text-3xl text-[#101e37] mb-1">Marjorie Albuquerque</h3>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3e77db] font-body mb-6">CEO</p>
                    <div className="space-y-4">
                      {[
                        { label: 'Liderança Estratégica', desc: '10+ anos estruturando o marketing do SíndicoNet. Liderou a aquisição pelo QuintoAndar e hoje conduz a transformação em plataforma de inteligência.' },
                        { label: 'Inovação & IA',          desc: 'Pioneira em trazer IA para a gestão condominial. Entusiasta de tecnologia desde sempre.' },
                        { label: 'Autenticidade',          desc: 'Única CEO do setor que é também síndica moradora. Vive as assembleias, as decisões difíceis e os resultados na pele.' },
                      ].map((item) => (
                        <div key={item.label} className="bg-[#F4F6F8] rounded-xl px-5 py-4">
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3e77db] font-body mb-1.5">{item.label}</p>
                          <p className="font-body text-sm text-[#3D3D3D]/65 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>



              {/* Posicionamento comparativo */}
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">Perfis de Liderança — Posicionamento</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Julio Paim',
                    items: [
                      { label: 'Papel na Marca',  desc: 'Voz do Fundador, guardião da história e da missão.' },
                      { label: 'Rebranding',      desc: 'Ponte entre o legado e a inovação.' },
                      { label: 'Posicionamento',  desc: 'Autoridade técnica e referência do setor.' },
                    ],
                  },
                  {
                    name: 'Marjorie Albuquerque',
                    items: [
                      { label: 'Papel na Marca',  desc: 'Voz da inovação, liderança executiva e transformação digital.' },
                      { label: 'Rebranding',      desc: 'Condutora da nova era AIFirst.' },
                      { label: 'Posicionamento',  desc: 'Proximidade com o síndico, experiência real de gestão condominial.' },
                    ],
                  },
                ].map((profile) => (
                  <Card key={profile.name} className="flex flex-col gap-4">
                    <p className="font-headline font-bold text-xl text-[#101e37]">{profile.name}</p>
                    <div className="space-y-3">
                      {profile.items.map((item) => (
                        <div key={item.label}>
                          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3e77db] font-body mb-1">{item.label}</p>
                          <p className="font-body text-sm text-[#3D3D3D]/65 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </SectionBlock>

            {/* 09 · Cultura */}
            <SectionBlock id="cultura" eyebrow="09 · Cultura" title="Nossos Princípios">
              <p className="font-body text-[#3D3D3D]/65 text-base leading-relaxed mb-8 max-w-2xl">
                Acreditamos que o sucesso do SíndicoNet é construído por pessoas que compartilham dos mesmos valores. Nossos princípios guiam todas as nossas decisões diárias.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {[
                  { num: '01', title: 'Existimos pelo cliente',     desc: 'Ouvimos atentamente os problemas e necessidades e traduzimos em soluções.' },
                  { num: '02', title: 'Temos coragem para o novo',  desc: 'Nos desafiamos a pensar diferente para propor e experimentar.' },
                  { num: '03', title: 'Entregamos',                 desc: 'Gostamos do desafio e só ficamos satisfeitos quando entregamos o combinado.' },
                  { num: '04', title: 'Juntos vamos mais longe',    desc: 'Confiamos uns nos outros e nos apoiamos para aprender e crescer.' },
                  { num: '05', title: 'Jogamos limpo',              desc: 'Fazemos o que é certo, sem atalhos nem jeitinhos.' },
                ].map((p) => (
                  <Card key={p.num}>
                    <span className="font-headline font-bold text-4xl text-[#cfddf6] leading-none block mb-3">{p.num}</span>
                    <p className="font-headline font-bold text-base text-[#101e37] mb-1.5">{p.title}</p>
                    <p className="font-body text-sm text-[#3D3D3D]/60 leading-relaxed">{p.desc}</p>
                  </Card>
                ))}
              </div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#3D3D3D]/35 font-body mb-4">Como atuamos no dia a dia</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { title: 'Resolve a dor dos clientes',    desc: 'Exerce escuta ativa e garante a resolução do problema, reconhecendo de forma empática as necessidades das pessoas.' },
                  { title: 'Abraça o novo',                 desc: 'Encontra e implementa soluções não óbvias, assumindo riscos, aprendendo com os erros e estimulando novas ideias.' },
                  { title: 'Entrega o que promete',         desc: 'Tem ambição e entrega resultados que agregam valor e encantam, se adaptando rapidamente às mudanças e prioridades.' },
                  { title: 'Protagoniza a carreira',        desc: 'Reconhece suas limitações e busca o autodesenvolvimento por meio do aprendizado proativo e feedbacks frequentes.' },
                  { title: 'Faz o certo',                   desc: 'Age estimulando a ética e o pertencimento, valorizando diferentes perspectivas e reforçando um ambiente seguro.' },
                  { title: 'Colabora para ir mais longe',   desc: 'Confia e inspira confiança, considerando a contribuição e contexto das demais pessoas para alcançar objetivos.' },
                ].map((b) => (
                  <div key={b.title} className="flex items-start gap-3 bg-white rounded-xl border border-black/8 px-4 py-4">
                    <div className="w-0.5 h-8 rounded-full bg-[#3e77db]/30 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-headline font-bold text-sm text-[#101e37] mb-1">{b.title}</p>
                      <p className="font-body text-xs text-[#3D3D3D]/55 leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionBlock>

          </main>
        </div>
      </div>
    </div>
  )
}
