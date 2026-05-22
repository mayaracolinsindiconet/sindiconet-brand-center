// font: 'headline' = Stack Sans  |  font: 'body' = Open Sans
const scale = [
  { name: 'Display',    size: '72px', weight: '700', font: 'headline', usage: 'Hero sections, manifesto' },
  { name: 'H1',        size: '48px', weight: '700', font: 'headline', usage: 'Título de página' },
  { name: 'H2',        size: '36px', weight: '700', font: 'headline', usage: 'Título de seção' },
  { name: 'H3',        size: '24px', weight: '700', font: 'headline', usage: 'Subtítulo, card principal' },
  { name: 'H4',        size: '20px', weight: '500', font: 'headline', usage: 'Subtítulo de componente' },
  { name: 'Body Large',size: '18px', weight: '400', font: 'body',     usage: 'Texto corrido, leads' },
  { name: 'Body',      size: '16px', weight: '400', font: 'body',     usage: 'Texto padrão' },
  { name: 'Body Small',size: '14px', weight: '400', font: 'body',     usage: 'Texto secundário' },
  { name: 'Caption',   size: '12px', weight: '500', font: 'body',     usage: 'Legendas, labels' },
  { name: 'Overline',  size: '10px', weight: '700', font: 'headline', usage: 'Etiquetas de seção, tags' },
]

const fontLabels: Record<string, string> = {
  headline: 'Stack Sans',
  body:     'Open Sans',
}

const weightLabels: Record<string, string> = {
  '400': 'Regular',
  '500': 'Medium',
  '700': 'Bold',
}

export function TypographyScaleTable() {
  return (
    <div className="rounded-2xl border border-black/8 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-black/8 bg-[#F4F6F8]">
              {['Estilo', 'Amostra', 'Família', 'Tamanho', 'Peso', 'Uso recomendado'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-widest text-[#3D3D3D]/40 font-body whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scale.map((row, i) => {
              const fontClass  = row.font === 'headline' ? 'font-headline' : 'font-body'
              const fontFamily = row.font === 'headline'
                ? 'var(--font-headline)'
                : 'var(--font-body)'
              return (
                <tr key={row.name} className={`border-b border-black/5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#F4F6F8]/40'}`}>
                  <td className="px-5 py-4 text-xs font-mono text-[#3D3D3D]/50 font-body whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-[#101e37] ${fontClass}`}
                      style={{ fontSize: Math.min(parseInt(row.size), 32), fontWeight: row.weight, lineHeight: 1.2 }}
                    >
                      Síndiconet
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md font-body font-semibold ${
                        row.font === 'headline'
                          ? 'bg-[#101e37]/8 text-[#101e37]'
                          : 'bg-[#3e77db]/8 text-[#3e77db]'
                      }`}
                    >
                      {fontLabels[row.font]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-[#3D3D3D]/50 whitespace-nowrap">
                    {row.size}
                  </td>
                  <td className="px-5 py-4 text-xs font-mono text-[#3D3D3D]/50 whitespace-nowrap">
                    {weightLabels[row.weight]} {row.weight}
                  </td>
                  <td className="px-5 py-4 text-xs font-body text-[#3D3D3D]/55 max-w-xs">
                    {row.usage}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
