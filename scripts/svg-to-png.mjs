/**
 * Converte todos os SVGs de /public/assets em PNGs
 * Gera: @1x (original), @2x e @4x para logos; @1x e @2x para ícones
 */

import sharp from 'sharp'
import { readdir, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.join(__dirname, '..')
const ASSETS    = path.join(ROOT, 'public', 'assets')

// Configs por tipo de asset
const configs = [
  {
    srcDir: path.join(ASSETS, 'logos'),
    glob: '*.svg',
    outDir: path.join(ASSETS, 'logos'),
    sizes: [{ suffix: '', w: 480 }, { suffix: '@2x', w: 960 }, { suffix: '@4x', w: 1920 }],
  },
  {
    srcDir: path.join(ASSETS, 'logos', 'pro'),
    glob: '*.svg',
    outDir: path.join(ASSETS, 'logos', 'pro'),
    sizes: [{ suffix: '', w: 480 }, { suffix: '@2x', w: 960 }, { suffix: '@4x', w: 1920 }],
  },
  {
    srcDir: path.join(ASSETS, 'icons', 'conteudo'),
    outDir: path.join(ASSETS, 'icons', 'conteudo'),
    sizes: [{ suffix: '', w: 64 }, { suffix: '@2x', w: 128 }],
  },
  {
    srcDir: path.join(ASSETS, 'icons', 'conviver'),
    outDir: path.join(ASSETS, 'icons', 'conviver'),
    sizes: [{ suffix: '', w: 64 }, { suffix: '@2x', w: 128 }],
  },
  {
    srcDir: path.join(ASSETS, 'icons', 'coteibem'),
    outDir: path.join(ASSETS, 'icons', 'coteibem'),
    sizes: [{ suffix: '', w: 64 }, { suffix: '@2x', w: 128 }],
  },
  {
    srcDir: path.join(ASSETS, 'icons', 'cursos'),
    outDir: path.join(ASSETS, 'icons', 'cursos'),
    sizes: [{ suffix: '', w: 64 }, { suffix: '@2x', w: 128 }],
  },
  {
    srcDir: path.join(ASSETS, 'icons', 'pro'),
    outDir: path.join(ASSETS, 'icons', 'pro'),
    sizes: [{ suffix: '', w: 64 }, { suffix: '@2x', w: 128 }],
  },
]

async function getSvgs(dir) {
  const files = await readdir(dir).catch(() => [])
  return files.filter(f => f.endsWith('.svg'))
}

async function convert(svgPath, outDir, sizes) {
  const name = path.basename(svgPath, '.svg')
  for (const { suffix, w } of sizes) {
    const outName = `${name}${suffix}.png`
    const outPath = path.join(outDir, outName)
    try {
      await sharp(svgPath)
        .resize({ width: w })
        .png({ quality: 100 })
        .toFile(outPath)
      console.log(`  ✓ ${outName} (${w}px)`)
    } catch (err) {
      console.error(`  ✗ ${outName}: ${err.message}`)
    }
  }
}

async function run() {
  console.log('🎨 SVG → PNG conversion\n')
  for (const cfg of configs) {
    if (!existsSync(cfg.srcDir)) continue
    const svgs = await getSvgs(cfg.srcDir)
    if (!svgs.length) continue

    await mkdir(cfg.outDir, { recursive: true })
    console.log(`📁 ${path.relative(ROOT, cfg.srcDir)}`)

    for (const svg of svgs) {
      await convert(path.join(cfg.srcDir, svg), cfg.outDir, cfg.sizes)
    }
    console.log()
  }
  console.log('✅ Concluído!')
}

run()
