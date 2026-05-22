export const brand = {
  colors: {
    azul: {
      900: '#101e37', // ink / mais escuro
      800: '#1f3c6e', // sombra profunda
      600: '#3e77db', // principal
      400: '#6e99e4', // subtom médio
      300: '#9fbbed', // luz
      100: '#cfddf6', // background leve
    },
    verde: {
      900: '#102c22',
      800: '#215745',
      700: '#318367',
      500: '#41ae89',
      300: '#a0d7c4',
      100: '#d0ebe2',
    },
    amarelo: {
      900: '#3e3015',
      800: '#7b5f29',
      700: '#b98f3e',
      500: '#f6be52',
      300: '#fbdfa9',
      100: '#fdefd4',
    },
    laranja: {
      900: '#3d1f03',
      800: '#7b3d06',
      700: '#b85c09',
      500: '#F57A0C',
      300: '#fabd86',
      100: '#fddec2',
    },
    vermelho: {
      900: '#340f0b',
      800: '#691f15',
      700: '#9d2e20',
      500: '#D13D2A',
      300: '#e89e95',
      100: '#f3cfca',
    },
    neutral: {
      black:           '#000000',
      sindiconetDark:  '#3D3D3D',
      white:           '#FFFFFF',
      sindiconetWhite: '#F4F6F8',
    },
    pro: {
      primarias:   { 950: '#030124', 800: '#2A0C49', 600: '#5D2E85', 400: '#9664C1', 200: '#BE9ED9' },
      secundarias: { 900: '#251956', 600: '#7C3DB2', 500: '#855DEA', 300: '#B36CFF', 50: '#F6F0FC' },
      gradient:    { from: '#2A0C49', to: '#BE9ED9' },
    },
  },
  typography: {
    fontFamily: {
      headline: '"Stack Sans", sans-serif',
      body:     '"Open Sans", sans-serif',
    },
    fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  logo: {
    hierarchy:  { default: 'mista', reduced: 'simbolo', extended: 'mista-headline' },
    variants:   ['mista', 'simbolo', 'mista-headline'],
    colorModes: ['colorida', 'cinza', 'preta', 'branca'],
    safeSpace:  { unit: 'X', minimum: '1X', recommended: '2X' },
  },
} as const
