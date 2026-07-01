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
  comparisonPair?: string
}

export const photos: Photo[] = [

  // ── PILAR 2: Editorial Corporativo Humano ─────────────────────────────────
  // Pessoas reais em ambientes reais — expressões naturais, diversidade, contexto condominial

  {
    id: 'ech-handshake',
    alt: 'Dois profissionais brasileiros se cumprimentando ao fim de reunião — luz natural de janela, postura espontânea',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO', 'LUZ NATURAL'],
    source: 'Envato',
    envatoUrl: 'https://app.envato.com/search/photos?term=business+handshake+office+window+natural+light',
    isCorrect: true,
  },
  {
    id: 'ech-reuniao',
    alt: 'Três profissionais analisando documentos em mesa — síndico e moradores, prédio residencial visível pela janela',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO', 'TONS NEUTROS'],
    source: 'Envato',
    envatoUrl: 'https://app.envato.com/search/photos?term=small+team+reviewing+documents+meeting+room+apartment+window',
    isCorrect: true,
  },
  {
    id: 'ech-assinatura',
    src: 'https://images.pexels.com/photos/4427610/pexels-photo-4427610.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Close-up de mãos assinando documento contratual — prestação de serviços condominiais',
    pillar: 'editorial-corporativo-humano',
    category: 'detalhe',
    attributes: ['EDITORIAL', 'COMPOSIÇÃO LIMPA'],
    source: 'Pexels',
    isCorrect: true,
  },
  {
    id: 'ech-consulta',
    src: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Profissional apresentando documento em reunião individual — consultoria condominial',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO'],
    source: 'Pexels',
    isCorrect: true,
  },
  {
    id: 'ech-vista-cima',
    src: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Reunião de equipe vista de cima — ângulo editorial, composição geométrica',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'TONS NEUTROS'],
    source: 'Pexels',
    isCorrect: true,
  },

  // ── PILAR 3: Arquitetura como Símbolo ────────────────────────────────────
  // Solidez, verticalidade, permanência — fachadas e ângulos que valorizam

  {
    id: 'as-varandas-verde',
    src: 'https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Edifício residencial moderno com varandas e vegetação exuberante — arquitetura contemporânea',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL', 'COMPOSIÇÃO LIMPA'],
    source: 'Pexels',
    isCorrect: true,
  },
  {
    id: 'as-tropical',
    src: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Torre de apartamentos com plantas tropicais em primeiro plano — verticalidade e natureza urbana',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL'],
    source: 'Pexels',
    isCorrect: true,
  },
  {
    id: 'as-litoral',
    src: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Conjunto de edifícios residenciais litorâneos — solidez e permanência condominial',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    source: 'Pexels',
    isCorrect: true,
  },
  {
    id: 'as-arvore',
    src: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Edifício residencial moderno com árvore no primeiro plano — composição limpa, luz natural',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL', 'COMPOSIÇÃO LIMPA'],
    source: 'Pexels',
    isCorrect: true,
  },

  // ── PILAR 4: Gestão Condominial ───────────────────────────────────────────
  // Serviços, manutenção e vida condominial — profissionais reais em ação

  {
    id: 'gc-reais',
    src: 'https://images.pexels.com/photos/6863343/pexels-photo-6863343.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Gestão financeira condominial — cédulas de reais, maquete imobiliária e calculadora',
    pillar: 'gestao-condominial',
    category: 'ambiente',
    attributes: ['EDITORIAL'],
    source: 'Pexels',
    isCorrect: true,
  },
  {
    id: 'gc-eletricista',
    src: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Eletricista realizando manutenção em painel elétrico de condomínio — segurança e profissionalismo',
    pillar: 'gestao-condominial',
    category: 'servicos',
    attributes: ['HUMANO'],
    source: 'Pexels',
    isCorrect: true,
  },
  {
    id: 'gc-encanador',
    src: 'https://img.magnific.com/free-photo/male-plumber-working-fix-problems-client-s-house_23-2150990698.jpg',
    alt: 'Encanador profissional realizando serviço hidráulico — manutenção condominial',
    pillar: 'gestao-condominial',
    category: 'servicos',
    attributes: ['HUMANO'],
    source: 'Magnific',
    isCorrect: true,
  },
  {
    id: 'gc-engenheiros',
    src: 'https://images.pexels.com/photos/5615665/pexels-photo-5615665.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Dois engenheiros em equipamento de segurança na cobertura do condomínio — vistoria e manutenção',
    pillar: 'gestao-condominial',
    category: 'servicos',
    attributes: ['HUMANO', 'EDITORIAL'],
    source: 'Pexels',
    isCorrect: true,
  },
  {
    id: 'gc-inspecao',
    alt: 'Técnico em colete laranja inspecionando casa de máquinas — gerador e bombas de água do condomínio',
    pillar: 'gestao-condominial',
    category: 'servicos',
    attributes: ['HUMANO'],
    source: 'Envato',
    envatoUrl: 'https://app.envato.com/search/photos?term=maintenance+technician+orange+vest+generator+room+inspection',
    isCorrect: true,
  },

]
