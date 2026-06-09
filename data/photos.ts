export interface Photo {
  id: string
  src: string
  alt: string
  pillar: 'premium-silencioso' | 'editorial-corporativo-humano' | 'arquitetura-como-simbolo'
  category: 'pessoas' | 'arquitetura' | 'ambiente' | 'detalhe'
  attributes: string[]
  isCorrect?: boolean
  comparisonPair?: string
}

// ─── Notas de uso ──────────────────────────────────────────────────────────────
// Fotos de referência via Magnific free CDN (gratuitas, sem download necessário).
// Fonte: https://www.magnific.com — licença free, hotlink permitido.
// Para substituir por imagens do Envato Elements:
//   1. Faça o download da imagem
//   2. Coloque em /public/assets/photos/
//   3. Substitua o 'src' pelo caminho local: '/assets/photos/nome-do-arquivo.jpg'

export const photos: Photo[] = [

  // ── PILAR 1: Premium Silencioso ───────────────────────────────────────────
  // "Sofisticação sem ostentação" — luz natural, composição limpa, materiais de qualidade

  {
    id: 'ps-01',
    src: 'https://img.magnific.com/free-photo/beautiful-contemporary-modern-design-apartment-with-natural-light-fron-bir-window-white-curtain_609648-70.jpg',
    alt: 'Apartamento contemporâneo com design moderno e luz natural pela janela',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['LUZ NATURAL', 'COMPOSIÇÃO LIMPA', 'PREMIUM'],
    isCorrect: true,
  },
  {
    id: 'ps-02',
    src: 'https://img.magnific.com/free-photo/lobby-condominium-building_1262-3037.jpg',
    alt: 'Hall de entrada de condomínio de alto padrão com espaço negativo generoso',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['TONS NEUTROS', 'PREMIUM', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'ps-03',
    src: 'https://img.magnific.com/free-photo/indoor-hotel-view_1417-1562.jpg',
    alt: 'Vista interior de hotel sofisticado com composição limpa e materiais nobres',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['LUZ NATURAL', 'PREMIUM', 'TONS NEUTROS'],
    isCorrect: true,
  },
  {
    id: 'ps-04',
    src: 'https://img.magnific.com/free-photo/elegant-stools-table-huge-bright-hall_1127-3339.jpg',
    alt: 'Hall amplo e luminoso com banquetas elegantes — sofisticação sem ostentação',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['COMPOSIÇÃO LIMPA', 'PREMIUM', 'TONS NEUTROS'],
    isCorrect: true,
  },
  {
    id: 'ps-05',
    src: 'https://img.magnific.com/free-photo/beautiful-hotel-insights-details_23-2149160768.jpg',
    alt: 'Detalhes premium de hotel — materiais nobres e acabamento de qualidade',
    pillar: 'premium-silencioso',
    category: 'detalhe',
    attributes: ['LUZ NATURAL', 'COMPOSIÇÃO LIMPA', 'PREMIUM'],
    isCorrect: true,
  },
  {
    id: 'ps-06',
    src: 'https://img.magnific.com/free-photo/top-view-swimming-pool-with-deck-chairs_1203-1516.jpg',
    alt: 'Vista aérea de piscina com espreguiçadeiras — área de lazer premium',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['TONS NEUTROS', 'PREMIUM', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'ps-07',
    src: 'https://img.magnific.com/free-photo/hallway-hotel-floor_23-2149304103.jpg',
    alt: 'Corredor de hotel com iluminação artificial — exemplo a evitar',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['COMPOSIÇÃO LIMPA'],
    isCorrect: false,
    comparisonPair: 'ps-02',
  },

  // ── PILAR 2: Editorial Corporativo Humano ─────────────────────────────────
  // "Pessoas reais em ambientes reais" — expressões naturais, diversidade, contexto condominial

  {
    id: 'ech-01',
    src: 'https://img.magnific.com/free-photo/front-view-real-estate-agent-working_23-2150322089.jpg',
    alt: 'Agente imobiliário profissional em frente a edifício — postura confiante',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO'],
    isCorrect: true,
  },
  {
    id: 'ech-02',
    src: 'https://img.magnific.com/free-photo/front-view-real-estate-agent-working_23-2150322086.jpg',
    alt: 'Profissional do setor imobiliário em ambiente externo — expressão natural',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['HUMANO', 'EDITORIAL'],
    isCorrect: true,
  },
  {
    id: 'ech-03',
    src: 'https://img.magnific.com/free-photo/closeup-smiling-adult-businesswoman-balcony_1262-1758.jpg',
    alt: 'Executiva sorrindo em varanda — postura confiante e expressão autêntica',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO'],
    isCorrect: true,
  },
  {
    id: 'ech-04',
    src: 'https://img.magnific.com/free-photo/portrait-confidence-athlete-young-man-looking-camera-standing-against-building_23-2148124068.jpg',
    alt: 'Homem jovem confiante diante de edifício — olhar direto, postura segura',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['HUMANO', 'EDITORIAL'],
    isCorrect: true,
  },
  {
    id: 'ech-05',
    src: 'https://img.magnific.com/free-photo/side-view-woman-posing-outdoors_23-2150322078.jpg',
    alt: 'Mulher profissional ao ar livre — composição lateral, expressão natural',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO'],
    isCorrect: true,
  },
  {
    id: 'ech-06',
    src: 'https://img.magnific.com/free-photo/middle-aged-hispanic-business-people_23-2151099207.jpg',
    alt: 'Profissionais brasileiros em contexto corporativo — diversidade e naturalidade',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['HUMANO', 'EDITORIAL'],
    isCorrect: true,
  },
  {
    id: 'ech-07',
    src: 'https://img.magnific.com/free-photo/people-working-as-team-company_23-2149136845.jpg',
    alt: 'Grupo em pose encenada e artificial — exemplo a evitar',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL'],
    isCorrect: false,
    comparisonPair: 'ech-01',
  },

  // ── PILAR 3: Arquitetura como Símbolo ─────────────────────────────────────
  // "Solidez, verticalidade, permanência" — fachadas, áreas comuns, ângulos que valorizam

  {
    id: 'as-01',
    src: 'https://img.magnific.com/free-photo/high-apartment-buildings-with-modern-design_1268-15586.jpg',
    alt: 'Edifícios residenciais modernos com verticalidade marcante',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-02',
    src: 'https://img.magnific.com/free-photo/modern-apartment-building-facade-with-balconies-varied-hues_84443-73937.jpg',
    alt: 'Fachada de edifício com varandas em tons variados — estilo residencial brasileiro',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL'],
    isCorrect: true,
  },
  {
    id: 'as-03',
    src: 'https://img.magnific.com/free-photo/modern-architecture-with-rhythm-balconies-urban-style_169016-69191.jpg',
    alt: 'Arquitetura moderna com ritmo de varandas — estilo urbano contemporâneo',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-04',
    src: 'https://img.magnific.com/free-photo/low-angle-view-modern-building-with-balconies-against-blue-sky_181624-27085.jpg',
    alt: 'Vista de ângulo baixo de edifício moderno com varandas contra o céu azul',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA', 'LUZ NATURAL'],
    isCorrect: true,
  },
  {
    id: 'as-05',
    src: 'https://img.magnific.com/free-photo/facade-modern-new-building_23-2147694757.jpg',
    alt: 'Fachada de edifício novo moderno — linhas limpas e acabamento de qualidade',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-06',
    src: 'https://img.magnific.com/free-photo/apartment-building-city-with-vegetation_23-2148798603.jpg',
    alt: 'Edifício de apartamentos na cidade com vegetação — arquitetura integrada à natureza',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL'],
    isCorrect: true,
  },
  {
    id: 'as-07',
    src: 'https://img.magnific.com/free-photo/business-building-downtown-concept_53876-42976.jpg',
    alt: 'Edifício corporativo no centro urbano — solidez e presença institucional',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-08',
    src: 'https://img.magnific.com/free-photo/window-pattern-textures-background_74190-2390.jpg',
    alt: 'Detalhe de fachada envidraçada — textura de janelas sem contexto arquitetônico',
    pillar: 'arquitetura-como-simbolo',
    category: 'detalhe',
    attributes: ['ARQUITETURAL'],
    isCorrect: false,
    comparisonPair: 'as-01',
  },
  {
    id: 'as-09',
    src: 'https://img.magnific.com/free-photo/symmetrical-concrete-building_1122-1154.jpg',
    alt: 'Edifício de concreto simétrico — composição equilibrada e solidez estrutural',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-10',
    src: 'https://img.magnific.com/free-photo/balcony-resorts-nesebar-town-bulgaria_627829-7549.jpg',
    alt: 'Varandas de condomínio residencial com vegetação exuberante — estilo tropical',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA', 'TONS NEUTROS'],
    isCorrect: true,
  },
]
