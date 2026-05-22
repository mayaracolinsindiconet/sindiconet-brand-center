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

export const photos: Photo[] = []
