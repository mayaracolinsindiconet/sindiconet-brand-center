export interface Photo {
  id: string
  src?: string
  alt: string
  pillar: 'premium-silencioso' | 'editorial-corporativo-humano' | 'arquitetura-como-simbolo' | 'gestao-condominial'
  category: 'pessoas' | 'arquitetura' | 'ambiente' | 'detalhe' | 'servicos'
  attributes: string[]
  source: 'Magnific' | 'Pexels' | 'Envato' | 'Sindiconet'
  envatoUrl?: string
  isCorrect?: boolean
}

export const photos: Photo[] = [

  // ── PILAR 2: Editorial Corporativo Humano ─────────────────────────────────
  {
    id: 'ech-handshake',
    src: '/assets/photos/handshake-natural.jpg',
    alt: 'Dois profissionais se cumprimentando ao fim de reunião — luz natural, postura espontânea',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO', 'LUZ NATURAL'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'ech-reuniao',
    src: '/assets/photos/reuniao-documentos.jpg',
    alt: 'Três profissionais analisando documentos — síndico e moradores, prédio residencial visível pela janela',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO', 'TONS NEUTROS'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'ech-assinatura',
    src: '/assets/photos/assinatura-contrato.jpg',
    alt: 'Close-up de mãos assinando documento contratual — prestação de serviços condominiais',
    pillar: 'editorial-corporativo-humano',
    category: 'detalhe',
    attributes: ['EDITORIAL', 'COMPOSIÇÃO LIMPA'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'ech-consulta',
    src: '/assets/photos/consulta-profissional.jpg',
    alt: 'Profissional apresentando documento em consulta individual — síndico ou assessor condominial',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'ech-vista-cima',
    src: '/assets/photos/reuniao-vista-cima.jpg',
    alt: 'Reunião de profissionais vista de cima — ângulo editorial, composição geométrica',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'TONS NEUTROS'],
    source: 'Sindiconet',
    isCorrect: true,
  },

  // ── PILAR 3: Arquitetura como Símbolo ────────────────────────────────────
  {
    id: 'as-varandas-verde',
    src: '/assets/photos/edificio-varandas-verde.jpg',
    alt: 'Edifício residencial moderno com varandas e vegetação exuberante — arquitetura contemporânea',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL', 'COMPOSIÇÃO LIMPA'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'as-tropical',
    src: '/assets/photos/torre-plantas-tropicais.jpg',
    alt: 'Torre de apartamentos com plantas tropicais em primeiro plano — verticalidade e natureza urbana',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'as-litoral',
    src: '/assets/photos/edificios-litoraneos.jpg',
    alt: 'Conjunto de edifícios residenciais litorâneos — solidez e presença condominial',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'as-arvore',
    src: '/assets/photos/edificio-moderno-arvore.jpg',
    alt: 'Edifício residencial moderno com árvore em primeiro plano — composição limpa, luz natural',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL', 'COMPOSIÇÃO LIMPA'],
    source: 'Sindiconet',
    isCorrect: true,
  },

  // ── PILAR 4: Gestão Condominial ───────────────────────────────────────────
  {
    id: 'gc-reais',
    src: '/assets/photos/gestao-financeira-reais.jpg',
    alt: 'Gestão financeira condominial — cédulas de reais, maquete imobiliária e calculadora',
    pillar: 'gestao-condominial',
    category: 'ambiente',
    attributes: ['EDITORIAL'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'gc-eletricista',
    src: '/assets/photos/eletricista-painel.jpg',
    alt: 'Eletricista realizando manutenção em painel elétrico de condomínio',
    pillar: 'gestao-condominial',
    category: 'servicos',
    attributes: ['HUMANO'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'gc-encanador',
    src: '/assets/photos/encanador-hidraulica.jpg',
    alt: 'Encanador realizando serviço hidráulico em apartamento — manutenção condominial',
    pillar: 'gestao-condominial',
    category: 'servicos',
    attributes: ['HUMANO'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'gc-engenheiros',
    src: '/assets/photos/engenheiros-cobertura.jpg',
    alt: 'Dois engenheiros em equipamento de segurança na cobertura do condomínio — vistoria e manutenção',
    pillar: 'gestao-condominial',
    category: 'servicos',
    attributes: ['HUMANO', 'EDITORIAL'],
    source: 'Sindiconet',
    isCorrect: true,
  },
  {
    id: 'gc-inspecao',
    src: '/assets/photos/tecnico-inspecao-maquinas.jpg',
    alt: 'Técnico em colete laranja inspecionando casa de máquinas — gerador e bombas de água do condomínio',
    pillar: 'gestao-condominial',
    category: 'servicos',
    attributes: ['HUMANO'],
    source: 'Sindiconet',
    isCorrect: true,
  },

]
