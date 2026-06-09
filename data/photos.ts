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
// Fotos de referência via Pexels CDN (gratuitas e sem download necessário).
// Para substituir por imagens do Envato Elements ou Magnific:
// 1. Faça o download da imagem
// 2. Coloque em /public/assets/photos/
// 3. Substitua o 'src' pelo caminho local: '/assets/photos/nome-do-arquivo.jpg'

export const photos: Photo[] = [

  // ── PILAR 1: Premium Silencioso ───────────────────────────────────────────
  // "Sofisticação sem ostentação" — luz natural, composição limpa, materiais de qualidade

  {
    id: 'ps-01',
    src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Sala de estar premium com luz natural difusa e materiais de qualidade',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['LUZ NATURAL', 'COMPOSIÇÃO LIMPA', 'PREMIUM'],
    isCorrect: true,
  },
  {
    id: 'ps-02',
    src: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Hall de entrada de condomínio de alto padrão com espaço negativo generoso',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['TONS NEUTROS', 'PREMIUM', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'ps-03',
    src: 'https://images.pexels.com/photos/35683831/pexels-photo-35683831.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Edifício residencial moderno com praia tropical e palmeiras ao fundo, Brasil',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['LUZ NATURAL', 'PREMIUM', 'TONS NEUTROS'],
    isCorrect: true,
  },
  {
    id: 'ps-04',
    src: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Detalhe de materiais nobres — mármore e madeira em área comum',
    pillar: 'premium-silencioso',
    category: 'detalhe',
    attributes: ['COMPOSIÇÃO LIMPA', 'PREMIUM', 'TONS NEUTROS'],
    isCorrect: true,
  },
  {
    id: 'ps-05',
    src: 'https://images.pexels.com/photos/11032469/pexels-photo-11032469.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Pátio interno moderno em São Paulo com mobiliário de design e vegetação exuberante',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['LUZ NATURAL', 'COMPOSIÇÃO LIMPA', 'PREMIUM'],
    isCorrect: true,
  },
  {
    id: 'ps-06',
    src: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Área de convivência limpa com mobiliário de qualidade',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['TONS NEUTROS', 'PREMIUM', 'LUZ NATURAL'],
    isCorrect: true,
  },
  {
    id: 'ps-07',
    src: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Corredor de condomínio com composição simétrica e iluminação adequada',
    pillar: 'premium-silencioso',
    category: 'ambiente',
    attributes: ['COMPOSIÇÃO LIMPA', 'PREMIUM'],
    isCorrect: false,
    comparisonPair: 'ps-02',
  },

  // ── PILAR 2: Editorial Corporativo Humano ─────────────────────────────────
  // "Pessoas reais em ambientes reais" — expressões naturais, diversidade brasileira, contexto condominial

  {
    id: 'ech-01',
    src: 'https://images.pexels.com/photos/7109061/pexels-photo-7109061.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Equipe multiétnica confiante em escritório moderno, representando diversidade brasileira',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO'],
    isCorrect: true,
  },
  {
    id: 'ech-02',
    src: 'https://images.pexels.com/photos/7163398/pexels-photo-7163398.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Três profissionais em reunião natural em escritório bem decorado com plantas',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['HUMANO', 'EDITORIAL'],
    isCorrect: true,
  },
  {
    id: 'ech-03',
    src: 'https://images.pexels.com/photos/20596938/pexels-photo-20596938.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Mulher executiva elegante em terno branco, postura confiante e natural',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO'],
    isCorrect: true,
  },
  {
    id: 'ech-04',
    src: 'https://images.pexels.com/photos/7109063/pexels-photo-7109063.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Grupo diverso de profissionais em postura confiante em escritório moderno',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['HUMANO', 'EDITORIAL'],
    isCorrect: true,
  },
  {
    id: 'ech-05',
    src: 'https://images.pexels.com/photos/8297444/pexels-photo-8297444.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Três mulheres profissionais em escritório moderno, diversidade e segurança',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL', 'HUMANO'],
    isCorrect: true,
  },
  {
    id: 'ech-06',
    src: 'https://images.pexels.com/photos/9363120/pexels-photo-9363120.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Jovem executivo negro com terno formal segurando documento, postura assertiva',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['HUMANO', 'EDITORIAL'],
    isCorrect: true,
  },
  {
    id: 'ech-07',
    src: 'https://images.pexels.com/photos/30464453/pexels-photo-30464453.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Grupo em pose exagerada de estúdio, expressão encenada — exemplo a evitar',
    pillar: 'editorial-corporativo-humano',
    category: 'pessoas',
    attributes: ['EDITORIAL'],
    isCorrect: false,
    comparisonPair: 'ech-01',
  },

  // ── PILAR 3: Arquitetura como Símbolo ─────────────────────────────────────
  // "Solidez, verticalidade, permanência" — fachadas brasileiras, áreas comuns, ângulos que valorizam

  {
    id: 'as-01',
    src: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Fachada de edifício residencial com verticalidade marcante',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-02',
    src: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Conjunto de torres residenciais ao entardecer com luz valorizada',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'LUZ NATURAL'],
    isCorrect: true,
  },
  {
    id: 'as-03',
    src: 'https://images.pexels.com/photos/2816323/pexels-photo-2816323.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Detalhe arquitetônico de condomínio — textura de fachada com regra dos terços',
    pillar: 'arquitetura-como-simbolo',
    category: 'detalhe',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-04',
    src: 'https://images.pexels.com/photos/20288230/pexels-photo-20288230.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Torres residenciais com varandas e linhas verticais marcantes, tipologia brasileira',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA', 'LUZ NATURAL'],
    isCorrect: true,
  },
  {
    id: 'as-05',
    src: 'https://images.pexels.com/photos/34147115/pexels-photo-34147115.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Varandas de apartamento moderno com guarda-corpo de vidro, São Paulo',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-06',
    src: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Vista de ângulo baixo de edifício residencial reforçando permanência',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA'],
    isCorrect: true,
  },
  {
    id: 'as-07',
    src: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Piscina de cobertura com vista da cidade ao pôr do sol',
    pillar: 'arquitetura-como-simbolo',
    category: 'ambiente',
    attributes: ['PREMIUM', 'ARQUITETURAL', 'LUZ NATURAL'],
    isCorrect: true,
  },
  {
    id: 'as-08',
    src: 'https://images.pexels.com/photos/534151/pexels-photo-534151.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Foto com grande angular distorcida — exemplo a evitar',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL'],
    isCorrect: false,
    comparisonPair: 'as-01',
  },
  {
    id: 'as-09',
    src: 'https://images.pexels.com/photos/31597866/pexels-photo-31597866.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Piscina de cobertura com vista panorâmica da cidade, São Paulo — área de lazer premium',
    pillar: 'arquitetura-como-simbolo',
    category: 'ambiente',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA', 'PREMIUM'],
    isCorrect: true,
  },
  {
    id: 'as-10',
    src: 'https://images.pexels.com/photos/36845125/pexels-photo-36845125.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Edifício residencial contemporâneo com montanhas ao fundo, Rio de Janeiro',
    pillar: 'arquitetura-como-simbolo',
    category: 'arquitetura',
    attributes: ['ARQUITETURAL', 'COMPOSIÇÃO LIMPA', 'TONS NEUTROS'],
    isCorrect: true,
  },
]
