import type { ProductSlug } from '@/tokens/products'

export interface ProductIcon {
  slug:  string
  label: string
  path:  string
}

export const productIcons: Record<ProductSlug, ProductIcon[]> = {
  conteudo: [
    { slug: 'conteudo', label: 'Conteúdo', path: '/assets/icons/conteudo/conteudo.svg' },
    { slug: 'artigo',   label: 'Artigo',   path: '/assets/icons/conteudo/artigo.svg'   },
    { slug: 'materia',  label: 'Matéria',  path: '/assets/icons/conteudo/materia.svg'  },
    { slug: 'noticia',  label: 'Notícia',  path: '/assets/icons/conteudo/noticia.svg'  },
    { slug: 'publi',    label: 'Publi',    path: '/assets/icons/conteudo/publi.svg'    },
    { slug: 'download', label: 'Download', path: '/assets/icons/conteudo/download.svg' },
  ],
  conviver: [
    { slug: 'conviver', label: 'Conviver', path: '/assets/icons/conviver/conviver.svg' },
    { slug: 'creator',  label: 'Creator',  path: '/assets/icons/conviver/creator.svg'  },
  ],
  coteibem: [
    { slug: 'coteibem', label: 'Coteibem', path: '/assets/icons/coteibem/coteibem.svg' },
  ],
  cursos: [
    { slug: 'cursos', label: 'Cursos', path: '/assets/icons/cursos/cursos.svg' },
  ],
  empregos: [
    { slug: 'empregos', label: 'Empregos', path: '/assets/icons/empregos/empregos.svg' },
  ],
  pro: [
    { slug: 'pro', label: 'PRO', path: '/assets/icons/pro/pro.svg' },
  ],
}
