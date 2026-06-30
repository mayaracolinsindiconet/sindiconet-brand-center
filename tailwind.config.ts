import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: '#cfddf6',
          300: '#9fbbed',
          400: '#6e99e4',
          600: '#3e77db',
          800: '#1f3c6e',
          900: '#101e37',
        },
        verde: {
          100: '#d0ebe2',
          300: '#a0d7c4',
          400: '#71c2a7',
          500: '#41ae89',
          700: '#318367',
          800: '#215745',
          900: '#102c22',
        },
        amarelo: {
          100: '#fdefd4',
          300: '#fbdfa9',
          400: '#f8ce7d',
          500: '#f6be52',
          700: '#b98f3e',
          800: '#7b5f29',
          900: '#3e3015',
        },
        laranja: {
          100: '#fddec2',
          300: '#fabd86',
          400: '#f88649',
          500: '#F57A0C',
          700: '#b85c09',
          800: '#7b3d06',
          900: '#3d1f03',
        },
        vermelho: {
          100: '#f3cfca',
          300: '#e89e95',
          400: '#dd6e5f',
          500: '#D13D2A',
          700: '#9d2e20',
          800: '#691f15',
          900: '#340f0b',
        },
        pro: {
          50:  '#F6F0FC',
          200: '#BAA0D6',
          300: '#B36CFF',
          400: '#9771C1',
          500: '#855DEA',
          600: '#7441AC',
          700: '#61368F',
          800: '#3A2156',
          900: '#251956',
          950: '#1D102B',
        },
        neutral: {
          dark:  '#3D3D3D',
          light: '#F4F6F8',
        },
        product: {
          primary:       'var(--color-product-primary)',
          secondary:     'var(--color-product-secondary)',
          accent:        'var(--color-product-accent)',
          'primary-light': 'var(--color-product-primary-light)',
          'primary-dark':  'var(--color-product-primary-dark)',
          'on-primary':    'var(--color-product-on-primary)',
        },
      },
      fontFamily: {
        headline: ['"Stack Sans"', 'sans-serif'],
        body:     ['"Open Sans"', 'sans-serif'],
      },
      fontWeight: {
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },
    },
  },
  plugins: [],
}

export default config
