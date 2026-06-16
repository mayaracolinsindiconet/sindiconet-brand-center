/**
 * SÍNDICONET — Design Tokens: Produtos
 * Atualizado: junho/2026
 *
 * ESTRUTURA DE CORES:
 * - primary:    cor principal (índice 3 da paleta de 7)
 * - sombra:     secundária escura (índice 1)
 * - luz:        secundária clara (índice 5)
 * - onPrimary:  texto sobre fundo primário
 * - palette:    paleta completa (7 cores para produtos, 5 para PRO)
 *
 * PRO: campos adicionais primarias, secundarias e gradiente
 */

export type ProductSlug =
  | 'conteudo'
  | 'conviver'
  | 'coteibem'
  | 'cursos'
  | 'empregos'
  | 'pro'

export const products = {

  // ── CONTEÚDO / MARCA PRINCIPAL ───────────────────────────────────────────
  conteudo: {
    name: 'Síndiconet Conteúdo',
    slug: 'conteudo' as const,
    colors: {
      primary:   '#3e77db',
      sombra:    '#1f3c6e',
      luz:       '#9fbbed',
      onPrimary: '#FFFFFF',
      palette:   ['#101e37', '#1f3c6e', '#2f59a4', '#3e77db', '#6e99e4', '#9fbbed', '#cfddf6'] as const,
    },
  },

  // ── CONVIVER E CREATORS ──────────────────────────────────────────────────
  conviver: {
    name: 'Síndiconet Conviver e Creators',
    slug: 'conviver' as const,
    colors: {
      primary:   '#41ae89',
      sombra:    '#215745',
      luz:       '#a0d7c4',
      onPrimary: '#FFFFFF',
      palette:   ['#102c22', '#215745', '#318367', '#41ae89', '#71c2a7', '#a0d7c4', '#d0ebe2'] as const,
    },
  },

  // ── COTEIBEM ─────────────────────────────────────────────────────────────
  coteibem: {
    name: 'Síndiconet Coteibem',
    slug: 'coteibem' as const,
    colors: {
      primary:   '#f6be52',
      sombra:    '#7b5f29',
      luz:       '#fbdfa9',
      onPrimary: '#3D3D3D',
      palette:   ['#3e3015', '#7b5f29', '#b98f3e', '#f6be52', '#f8ce7d', '#fbdfa9', '#fdefd4'] as const,
    },
  },

  // ── CURSOS ───────────────────────────────────────────────────────────────
  cursos: {
    name: 'Síndiconet Cursos',
    slug: 'cursos' as const,
    colors: {
      primary:   '#F57A0C',
      sombra:    '#7b3d06',
      luz:       '#fabd86',
      onPrimary: '#FFFFFF',
      palette:   ['#3d1f03', '#7b3d06', '#b85c09', '#F57A0C', '#f89b49', '#fabd86', '#fddec2'] as const,
    },
  },

  // ── EMPREGOS ─────────────────────────────────────────────────────────────
  empregos: {
    name: 'Síndiconet Empregos',
    slug: 'empregos' as const,
    colors: {
      primary:   '#D13D2A',
      sombra:    '#691f15',
      luz:       '#e89e95',
      onPrimary: '#FFFFFF',
      palette:   ['#340f0b', '#691f15', '#9d2e20', '#D13D2A', '#dd6e5f', '#e89e95', '#f3cfca'] as const,
    },
  },

  // ── PRO ──────────────────────────────────────────────────────────────────
  pro: {
    name: 'Síndiconet PRO',
    slug: 'pro' as const,
    colors: {
      primary:     '#5D2E85',
      sombra:      '#2A0C49',
      luz:         '#BE9ED9',
      onPrimary:   '#FFFFFF',
      palette:     ['#030124', '#2A0C49', '#5D2E85', '#9664C1', '#BE9ED9'] as const,
      primarias:   ['#030124', '#2A0C49', '#5D2E85', '#9664C1', '#BE9ED9'] as const,
      secundarias: ['#251956', '#855DEA', '#7C3DB2', '#B36CFF', '#F6F0FC'] as const,
      gradiente:   { start: '#2A0C49', end: '#BE9ED9' } as const,
    },
  },

} as const

export type Products = typeof products

/** Lista de produtos em ordem de exibição no Brand Center */
export const productList: ProductSlug[] = [
  'conteudo',
  'conviver',
  'coteibem',
  'cursos',
  'empregos',
  'pro',
]
