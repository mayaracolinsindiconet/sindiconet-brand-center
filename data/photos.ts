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

export const photos: Photo[] = []
