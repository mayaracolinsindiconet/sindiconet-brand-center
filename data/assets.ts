import type { ProductSlug } from '@/tokens/products'

export interface Asset {
  id: string
  name: string
  type: 'logo' | 'icon' | 'font' | 'template'
  formats: { ext: string; path: string; size?: string; usage?: string }[]
  product?: ProductSlug | 'brand'
  version: string
  updatedAt: string
  previewUrl?: string
  usageContext: string
}

// ─── Helpers ───────────────────────────────────────────────────────────────────
function logoFormats(base: string) {
  return [
    { ext: '.svg',     path: `${base}.svg`,    usage: 'Vetorial — recomendado' },
    { ext: '.png',     path: `${base}.png`,    usage: '480px — digital' },
    { ext: '.png @2x', path: `${base}@2x.png`, usage: '960px — retina' },
    { ext: '.png @4x', path: `${base}@4x.png`, usage: '1920px — impressão' },
  ]
}

function iconFormats(base: string) {
  return [
    { ext: '.svg',     path: `${base}.svg`,    usage: 'Vetorial' },
    { ext: '.png',     path: `${base}.png`,    usage: '64px' },
    { ext: '.png @2x', path: `${base}@2x.png`, usage: '128px — retina' },
  ]
}

export const assets: Asset[] = [

  // ── Logos Síndiconet — Mista ──────────────────────────────────────────────
  {
    id: 'sindiconet-mista-colorida',
    name: 'Logo Mista — Colorida',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-mista-colorida.svg',
    usageContext: 'Uso principal em fundos claros.',
    formats: logoFormats('/assets/logos/sindiconet-mista-colorida'),
  },
  {
    id: 'sindiconet-mista-branca',
    name: 'Logo Mista — Branca',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-mista-branca.svg',
    usageContext: 'Uso em fundos escuros ou coloridos.',
    formats: logoFormats('/assets/logos/sindiconet-mista-branca'),
  },
  {
    id: 'sindiconet-mista-preta',
    name: 'Logo Mista — Versão Escura',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-mista-preta.svg',
    usageContext: 'Símbolo colorido com texto branco — fundos escuros.',
    formats: logoFormats('/assets/logos/sindiconet-mista-preta'),
  },
  {
    id: 'sindiconet-mista-cinza',
    name: 'Logo Mista — Cinza',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-mista-cinza.svg',
    usageContext: 'Impressão em escala de cinza.',
    formats: logoFormats('/assets/logos/sindiconet-mista-cinza'),
  },

  // ── Logos Síndiconet — Mista Headline ─────────────────────────────────────
  {
    id: 'sindiconet-mista-headline-colorida',
    name: 'Logo Mista com Headline — Colorida',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-mista-headline-colorida.svg',
    usageContext: 'Com tagline em fundos claros.',
    formats: logoFormats('/assets/logos/sindiconet-mista-headline-colorida'),
  },
  {
    id: 'sindiconet-mista-headline-branca',
    name: 'Logo Mista com Headline — Branca',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-mista-headline-branca.svg',
    usageContext: 'Com tagline em fundos escuros.',
    formats: logoFormats('/assets/logos/sindiconet-mista-headline-branca'),
  },
  {
    id: 'sindiconet-mista-headline-preta',
    name: 'Logo Mista com Headline — Versão Escura',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-mista-headline-preta.svg',
    usageContext: 'Com tagline — símbolo colorido, texto branco.',
    formats: logoFormats('/assets/logos/sindiconet-mista-headline-preta'),
  },
  {
    id: 'sindiconet-mista-headline-cinza',
    name: 'Logo Mista com Headline — Cinza',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-mista-headline-cinza.svg',
    usageContext: 'Com tagline para impressão em escala de cinza.',
    formats: logoFormats('/assets/logos/sindiconet-mista-headline-cinza'),
  },

  // ── Logos Síndiconet — Símbolo ────────────────────────────────────────────
  {
    id: 'sindiconet-simbolo-colorida',
    name: 'Símbolo — Colorido',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-simbolo-colorida.svg',
    usageContext: 'Favicon, app icon, avatar.',
    formats: logoFormats('/assets/logos/sindiconet-simbolo-colorida'),
  },
  {
    id: 'sindiconet-simbolo-branca',
    name: 'Símbolo — Branco',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-simbolo-branca.svg',
    usageContext: 'Símbolo em fundos escuros.',
    formats: logoFormats('/assets/logos/sindiconet-simbolo-branca'),
  },
  {
    id: 'sindiconet-simbolo-preta',
    name: 'Símbolo — Versão Escura',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-simbolo-preta.svg',
    usageContext: 'Símbolo com cores de produto — versão para fundos escuros.',
    formats: logoFormats('/assets/logos/sindiconet-simbolo-preta'),
  },
  {
    id: 'sindiconet-simbolo-cinza',
    name: 'Símbolo — Cinza',
    type: 'logo', product: 'brand', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/sindiconet-simbolo-cinza.svg',
    usageContext: 'Símbolo para impressão em escala de cinza.',
    formats: logoFormats('/assets/logos/sindiconet-simbolo-cinza'),
  },

  // ── Logos PRO — Mista ─────────────────────────────────────────────────────
  {
    id: 'pro-mista-colorida',
    name: 'PRO — Mista Colorida',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-mista-colorida.svg',
    usageContext: 'Logo do produto PRO em fundos claros.',
    formats: logoFormats('/assets/logos/pro/pro-mista-colorida'),
  },
  {
    id: 'pro-mista-dark',
    name: 'PRO — Mista Dark',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-mista-dark.svg',
    usageContext: 'Logo do produto PRO em fundos escuros.',
    formats: logoFormats('/assets/logos/pro/pro-mista-dark'),
  },
  {
    id: 'pro-mista-branca',
    name: 'PRO — Mista Branca',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-mista-branca.svg',
    usageContext: 'Logo PRO monochromático branco — fundos coloridos.',
    formats: logoFormats('/assets/logos/pro/pro-mista-branca'),
  },
  {
    id: 'pro-mista-cinza',
    name: 'PRO — Mista Cinza',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-mista-cinza.svg',
    usageContext: 'Logo PRO monochromático — impressão em escala de cinza.',
    formats: logoFormats('/assets/logos/pro/pro-mista-cinza'),
  },

  // ── Logos PRO — Box ───────────────────────────────────────────────────────
  {
    id: 'pro-mista-outline',
    name: 'PRO — Box Roxo (Outline)',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-mista-outline.svg',
    usageContext: 'Versão box com borda gradiente roxo.',
    formats: logoFormats('/assets/logos/pro/pro-mista-outline'),
  },
  {
    id: 'pro-box-roxo-2',
    name: 'PRO — Box Roxo Variante 2',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-box-roxo-2.svg',
    usageContext: 'Versão box roxo variante.',
    formats: logoFormats('/assets/logos/pro/pro-box-roxo-2'),
  },
  {
    id: 'pro-box-branca',
    name: 'PRO — Box Branco',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-box-branca.svg',
    usageContext: 'Versão box branco — fundos escuros.',
    formats: logoFormats('/assets/logos/pro/pro-box-branca'),
  },
  {
    id: 'pro-box-branca-1',
    name: 'PRO — Box Branco Variante',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-box-branca-1.svg',
    usageContext: 'Versão box branco variante.',
    formats: logoFormats('/assets/logos/pro/pro-box-branca-1'),
  },
  {
    id: 'pro-box-cinza',
    name: 'PRO — Box Cinza',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-box-cinza.svg',
    usageContext: 'Versão box cinza — impressão.',
    formats: logoFormats('/assets/logos/pro/pro-box-cinza'),
  },
  {
    id: 'pro-box-cinza-1',
    name: 'PRO — Box Cinza Variante',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-box-cinza-1.svg',
    usageContext: 'Versão box cinza variante.',
    formats: logoFormats('/assets/logos/pro/pro-box-cinza-1'),
  },
  {
    id: 'pro-box-3',
    name: 'PRO — Box Gradient',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-box-3.svg',
    usageContext: 'Versão box com preenchimento gradiente.',
    formats: logoFormats('/assets/logos/pro/pro-box-3'),
  },

  // ── Logos PRO — Símbolo ───────────────────────────────────────────────────
  {
    id: 'pro-simbolo-colorida',
    name: 'PRO — Símbolo Colorido',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-simbolo-colorida.svg',
    usageContext: 'Ícone do produto PRO.',
    formats: logoFormats('/assets/logos/pro/pro-simbolo-colorida'),
  },
  {
    id: 'pro-simbolo-gradient',
    name: 'PRO — Símbolo Gradient',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-simbolo-gradient.svg',
    usageContext: 'Ícone PRO com gradiente circular.',
    formats: logoFormats('/assets/logos/pro/pro-simbolo-gradient'),
  },
  {
    id: 'pro-simbolo-branca',
    name: 'PRO — Símbolo Branco',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-simbolo-branca.svg',
    usageContext: 'Símbolo PRO branco — fundos escuros.',
    formats: logoFormats('/assets/logos/pro/pro-simbolo-branca'),
  },
  {
    id: 'pro-simbolo-branca-1',
    name: 'PRO — Símbolo Branco Variante',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-simbolo-branca-1.svg',
    usageContext: 'Símbolo PRO branco variante.',
    formats: logoFormats('/assets/logos/pro/pro-simbolo-branca-1'),
  },
  {
    id: 'pro-simbolo-cinza',
    name: 'PRO — Símbolo Cinza',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-simbolo-cinza.svg',
    usageContext: 'Símbolo PRO cinza — impressão.',
    formats: logoFormats('/assets/logos/pro/pro-simbolo-cinza'),
  },
  {
    id: 'pro-simbolo-cinza-1',
    name: 'PRO — Símbolo Cinza Variante',
    type: 'logo', product: 'pro', version: '2.0', updatedAt: '2026-06-30',
    previewUrl: '/assets/logos/pro/pro-simbolo-cinza-1.svg',
    usageContext: 'Símbolo PRO cinza variante.',
    formats: logoFormats('/assets/logos/pro/pro-simbolo-cinza-1'),
  },

  // ── Ícones de produto ─────────────────────────────────────────────────────
  {
    id: 'icon-conteudo',
    name: 'Ícone Conteúdo',
    type: 'icon', product: 'conteudo', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/conteudo/conteudo.svg',
    usageContext: 'Ícone principal do produto Conteúdo.',
    formats: iconFormats('/assets/icons/conteudo/conteudo'),
  },
  {
    id: 'icon-conteudo-artigo',
    name: 'Ícone Artigo',
    type: 'icon', product: 'conteudo', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/conteudo/artigo.svg',
    usageContext: 'Ícone de artigo — Conteúdo.',
    formats: iconFormats('/assets/icons/conteudo/artigo'),
  },
  {
    id: 'icon-conteudo-download',
    name: 'Ícone Download',
    type: 'icon', product: 'conteudo', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/conteudo/download.svg',
    usageContext: 'Ícone de download — Conteúdo.',
    formats: iconFormats('/assets/icons/conteudo/download'),
  },
  {
    id: 'icon-conteudo-materia',
    name: 'Ícone Matéria',
    type: 'icon', product: 'conteudo', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/conteudo/materia.svg',
    usageContext: 'Ícone de matéria — Conteúdo.',
    formats: iconFormats('/assets/icons/conteudo/materia'),
  },
  {
    id: 'icon-conteudo-noticia',
    name: 'Ícone Notícia',
    type: 'icon', product: 'conteudo', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/conteudo/noticia.svg',
    usageContext: 'Ícone de notícia — Conteúdo.',
    formats: iconFormats('/assets/icons/conteudo/noticia'),
  },
  {
    id: 'icon-conteudo-publi',
    name: 'Ícone Publi',
    type: 'icon', product: 'conteudo', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/conteudo/publi.svg',
    usageContext: 'Ícone de publi — Conteúdo.',
    formats: iconFormats('/assets/icons/conteudo/publi'),
  },
  {
    id: 'icon-conviver',
    name: 'Ícone Conviver/Creator',
    type: 'icon', product: 'conviver', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/conviver/conviver.svg',
    usageContext: 'Ícone principal do produto Conviver.',
    formats: iconFormats('/assets/icons/conviver/conviver'),
  },
  {
    id: 'icon-creator',
    name: 'Ícone Creator',
    type: 'icon', product: 'conviver', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/conviver/creator.svg',
    usageContext: 'Ícone do Creator dentro do Conviver.',
    formats: iconFormats('/assets/icons/conviver/creator'),
  },
  {
    id: 'icon-coteibem',
    name: 'Ícone Coteibem',
    type: 'icon', product: 'coteibem', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/coteibem/coteibem.svg',
    usageContext: 'Ícone principal do produto Coteibem.',
    formats: iconFormats('/assets/icons/coteibem/coteibem'),
  },
  {
    id: 'icon-cursos',
    name: 'Ícone Cursos',
    type: 'icon', product: 'cursos', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/cursos/cursos.svg',
    usageContext: 'Ícone principal do produto Cursos.',
    formats: iconFormats('/assets/icons/cursos/cursos'),
  },
  {
    id: 'icon-pro',
    name: 'Ícone PRO',
    type: 'icon', product: 'pro', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: '/assets/icons/pro/pro.svg',
    usageContext: 'Ícone principal do produto PRO.',
    formats: iconFormats('/assets/icons/pro/pro'),
  },

  // ── Fontes ────────────────────────────────────────────────────────────────
  {
    id: 'font-stack-sans-variable',
    name: 'Stack Sans Headline — Variable',
    type: 'font', product: 'brand', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: undefined,
    usageContext: 'Fonte variável — recomendada para uso digital. Contém todos os pesos.',
    formats: [
      { ext: '.ttf', path: '/assets/fonts/StackSansHeadline-Variable.ttf', usage: 'Variable — todos os pesos' },
    ],
  },
  {
    id: 'font-stack-sans-bold',
    name: 'Stack Sans Headline — Bold',
    type: 'font', product: 'brand', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: undefined,
    usageContext: 'Peso Bold (700) — títulos e destaques.',
    formats: [
      { ext: '.ttf', path: '/assets/fonts/StackSansHeadline-Bold.ttf', usage: 'Bold 700' },
    ],
  },
  {
    id: 'font-stack-sans-semibold',
    name: 'Stack Sans Headline — SemiBold',
    type: 'font', product: 'brand', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: undefined,
    usageContext: 'Peso SemiBold (600) — subtítulos e labels.',
    formats: [
      { ext: '.ttf', path: '/assets/fonts/StackSansHeadline-SemiBold.ttf', usage: 'SemiBold 600' },
    ],
  },
  {
    id: 'font-stack-sans-medium',
    name: 'Stack Sans Headline — Medium',
    type: 'font', product: 'brand', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: undefined,
    usageContext: 'Peso Medium (500) — corpo de texto destacado.',
    formats: [
      { ext: '.ttf', path: '/assets/fonts/StackSansHeadline-Medium.ttf', usage: 'Medium 500' },
    ],
  },
  {
    id: 'font-stack-sans-regular',
    name: 'Stack Sans Headline — Regular',
    type: 'font', product: 'brand', version: '1.0', updatedAt: '2026-05-01',
    previewUrl: undefined,
    usageContext: 'Peso Regular (400) — corpo de texto padrão.',
    formats: [
      { ext: '.ttf', path: '/assets/fonts/StackSansHeadline-Regular.ttf', usage: 'Regular 400' },
    ],
  },

]
