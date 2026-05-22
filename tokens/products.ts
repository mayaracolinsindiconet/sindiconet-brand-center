export const products = {
  conteudo: {
    name: 'Síndiconet Conteúdo',
    slug: 'conteudo',
    colors: {
      primary:       '#3e77db',
      secondary:     '#1f3c6e',
      accent:        '#101e37',
      primaryLight:  '#cfddf6',
      primaryDark:   '#101e37',
      onPrimary:     '#FFFFFF',
    },
  },
  conviver: {
    name: 'Síndiconet Conviver/Creator',
    slug: 'conviver',
    colors: {
      primary:       '#41ae89',
      secondary:     '#318367',
      accent:        '#102c22',
      primaryLight:  '#a0d7c4',
      primaryDark:   '#215745',
      onPrimary:     '#FFFFFF',
    },
  },
  coteibem: {
    name: 'Síndiconet Coteibem',
    slug: 'coteibem',
    colors: {
      primary:       '#f6be52',
      secondary:     '#b98f3e',
      accent:        '#3e3015',
      primaryLight:  '#fbdfa9',
      primaryDark:   '#7b5f29',
      onPrimary:     '#3D3D3D',
    },
  },
  cursos: {
    name: 'Síndiconet Cursos',
    slug: 'cursos',
    colors: {
      primary:       '#F57A0C',
      secondary:     '#b85c09',
      accent:        '#3d1f03',
      primaryLight:  '#fabd86',
      primaryDark:   '#7b3d06',
      onPrimary:     '#FFFFFF',
    },
  },
  pro: {
    name: 'Síndiconet PRO',
    slug: 'pro',
    colors: {
      primary:       '#5D2E85',
      secondary:     '#2A0C49',
      accent:        '#855DEA',
      primaryLight:  '#BE9ED9',
      primaryDark:   '#030124',
      onPrimary:     '#FFFFFF',
    },
  },
} as const

export type ProductSlug = keyof typeof products
