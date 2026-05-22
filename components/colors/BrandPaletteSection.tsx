'use client'

import { ColorPaletteCard } from '@/components/shared/ColorPaletteCard'

// ─── Cores Principais (3) ─────────────────────────────────────────────────────
const coresPrincipais = [
  { hex: '#3e77db', name: 'Principal', role: 'Principal', rgb: 'RGB 62 · 119 · 219',  cmyk: 'C72 M46 Y0 K14' },
  { hex: '#1f3c6e', name: 'Sombra',    role: 'Sombra',    rgb: 'RGB 31 · 60 · 110',   cmyk: 'C72 M45 Y0 K57' },
  { hex: '#9fbbed', name: 'Luz',       role: 'Luz',       rgb: 'RGB 159 · 187 · 237', cmyk: 'C33 M21 Y0 K7'  },
]

// ─── Subtons (4) ──────────────────────────────────────────────────────────────
const subtons = [
  { hex: '#101e37', name: 'Subtom 900', rgb: 'RGB 16 · 30 · 55',    cmyk: 'C71 M45 Y0 K78' },
  { hex: '#3e77db', name: 'Subtom 600', rgb: 'RGB 62 · 119 · 219',  cmyk: 'C72 M46 Y0 K14' },
  { hex: '#6e99e4', name: 'Subtom 400', rgb: 'RGB 110 · 153 · 228', cmyk: 'C52 M33 Y0 K11' },
  { hex: '#cfddf6', name: 'Subtom 100', rgb: 'RGB 207 · 221 · 246', cmyk: 'C16 M10 Y0 K4'  },
]

// ─── Cores de Apoio (3) ───────────────────────────────────────────────────────
const coresApoio = [
  { hex: '#3D3D3D', name: 'Grafite',    role: 'Texto',      rgb: 'RGB 61 · 61 · 61',    cmyk: 'C0 M0 Y0 K76' },
  { hex: '#F4F6F8', name: 'Background', role: 'Fundo',      rgb: 'RGB 244 · 246 · 248', cmyk: 'C2 M1 Y0 K3'  },
  { hex: '#FFFFFF', name: 'Branco',     role: 'Superfície', rgb: 'RGB 255 · 255 · 255', cmyk: 'C0 M0 Y0 K0'  },
]

// ─── Shared label ─────────────────────────────────────────────────────────────
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-0.5 h-5 rounded-full bg-[#3e77db]" />
      <h3 className="font-headline font-bold text-lg text-[#101e37]">{children}</h3>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export function BrandPaletteSection() {
  return (
    <div className="space-y-16">

      {/* 1 · Cores Principais */}
      <div>
        <GroupLabel>Cores Principais</GroupLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
          {coresPrincipais.map((color) => (
            <ColorPaletteCard
              key={color.hex + color.name}
              hex={color.hex} name={color.name} role={color.role}
              rgb={color.rgb} cmyk={color.cmyk}
            />
          ))}
        </div>
      </div>

      {/* 2 · Subtons */}
      <div>
        <GroupLabel>Subtons</GroupLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
          {subtons.map((color) => (
            <ColorPaletteCard
              key={color.hex + color.name}
              hex={color.hex} name={color.name}
              rgb={color.rgb} cmyk={color.cmyk}
            />
          ))}
        </div>
      </div>

      {/* 3 · Cores de Apoio */}
      <div>
        <GroupLabel>Cores de Apoio</GroupLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
          {coresApoio.map((color) => (
            <ColorPaletteCard
              key={color.hex}
              hex={color.hex} name={color.name} role={color.role}
              rgb={color.rgb} cmyk={color.cmyk}
            />
          ))}
        </div>
      </div>


    </div>
  )
}
