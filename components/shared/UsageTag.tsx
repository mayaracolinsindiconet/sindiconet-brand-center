type UsageTagVariant =
  | 'digital'
  | 'impresso'
  | 'fundo-escuro'
  | 'fundo-claro'
  | 'reduzido'

interface UsageTagProps {
  variant: UsageTagVariant
  className?: string
}

const tagConfig: Record<UsageTagVariant, { label: string; className: string }> = {
  digital:      { label: 'Digital',       className: 'bg-[#cfddf6] text-[#3e77db]' },
  impresso:     { label: 'Impresso',      className: 'bg-[#d0ebe2] text-[#215745]' },
  'fundo-escuro': { label: 'Fundo escuro', className: 'bg-[#3e77db] text-white' },
  'fundo-claro':  { label: 'Fundo claro',  className: 'bg-[#F4F6F8] text-[#3D3D3D]' },
  reduzido:     { label: 'Reduzido',      className: 'bg-[#fdefd4] text-[#7b5f29]' },
}

export function UsageTag({ variant, className = '' }: UsageTagProps) {
  const { label, className: tagClass } = tagConfig[variant]
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold font-body uppercase tracking-wider ${tagClass} ${className}`}
    >
      {label}
    </span>
  )
}
