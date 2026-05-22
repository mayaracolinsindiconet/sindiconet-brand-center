'use client'

import { motion } from 'framer-motion'

const pillars = [
  {
    number: '01',
    title: 'Premium Silencioso',
    headline: 'Sofisticação sem ostentação.',
    description: 'Imagens que comunicam qualidade através de composição e luz, não de artifícios visuais. O condomínio de alto padrão que fala por si.',
    do:  ['Luz natural difusa', 'Composição limpa', 'Materiais de qualidade visíveis', 'Espaço negativo generoso'],
    dont: ['Sobreposições de texto chamativas', 'Filtros ou tratamentos exagerados', 'Elementos em excesso no frame'],
  },
  {
    number: '02',
    title: 'Editorial Corporativo Humano',
    headline: 'Pessoas reais em ambientes reais.',
    description: 'Síndicos e moradores em situações autênticas. Postura confiante e natural, sem rigidez. O profissionalismo que não perde a humanidade.',
    do:  ['Expressões naturais', 'Olhar direto à câmera', 'Ambientes de condomínio reconhecíveis', 'Diversidade de perfis'],
    dont: ['Poses artificiais ou ensaiadas', 'Expressões forçadas', 'Stock photos com aspecto genérico'],
  },
  {
    number: '03',
    title: 'Arquitetura como Símbolo',
    headline: 'Solidez, verticalidade, permanência.',
    description: 'Fachadas e áreas comuns como protagonistas. A arquitetura que transmite confiança e a permanência de quem cuida do patrimônio.',
    do:  ['Ângulos que reforçam verticalidade', 'Luz que valoriza texturas', 'Composição com regra dos terços', 'Detalhes arquitetônicos'],
    dont: ['Grandes angulares distorcidas', 'HDR exagerado', 'Linhas de horizonte tortas sem intenção'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function PhotoPillarsSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="space-y-8"
    >
      {pillars.map((pillar) => (
        <motion.div
          key={pillar.number}
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 rounded-2xl border border-black/8 bg-white overflow-hidden"
        >
          <div className="bg-[#101e37] p-8 flex flex-col justify-between">
            <span className="font-headline font-bold text-7xl text-white/10 leading-none select-none">
              {pillar.number}
            </span>
            <div>
              <p className="text-[#6e99e4] text-xs font-semibold uppercase tracking-widest font-body mb-2">
                Pilar
              </p>
              <h3 className="font-headline font-bold text-2xl text-white mb-2">{pillar.title}</h3>
              <p className="font-body text-white/60 text-sm italic">"{pillar.headline}"</p>
            </div>
          </div>

          <div className="p-8">
            <p className="font-body text-[#3D3D3D]/70 text-base leading-relaxed mb-8">
              {pillar.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#318367] font-body mb-3">
                  ✓ Buscar
                </p>
                <ul className="space-y-2">
                  {pillar.do.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-body text-[#3D3D3D]/70">
                      <span className="text-[#318367] mt-0.5 shrink-0">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#D13D2A] font-body mb-3">
                  ✗ Evitar
                </p>
                <ul className="space-y-2">
                  {pillar.dont.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm font-body text-[#3D3D3D]/70">
                      <span className="text-[#D13D2A] mt-0.5 shrink-0">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
