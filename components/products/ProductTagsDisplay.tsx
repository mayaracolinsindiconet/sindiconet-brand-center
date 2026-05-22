import { products } from '@/tokens/products'
import type { ProductSlug } from '@/tokens/products'

interface ProductTagsDisplayProps {
  product: ProductSlug
}

const defaultTags: Record<ProductSlug, string[]> = {
  conteudo: ['Artigos', 'Notícias', 'Guias', 'Legislação', 'Gestão'],
  conviver:  ['Comunidade', 'Comunicados', 'Criadores', 'Enquetes', 'Eventos'],
  coteibem:  ['Cotações', 'Fornecedores', 'Serviços', 'Comparativo', 'Orçamentos'],
  cursos:    ['Cursos', 'Certificados', 'Síndico', 'Gestão', 'Educação'],
  pro:       ['Premium', 'Gestão Profissional', 'Relatórios', 'Consultoria', 'Suporte'],
}

export function ProductTagsDisplay({ product }: ProductTagsDisplayProps) {
  const p    = products[product]
  const tags = defaultTags[product]

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1.5 rounded-full text-xs font-semibold font-body"
          style={{
            backgroundColor: p.colors.primary,
            color: p.colors.onPrimary,
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}
