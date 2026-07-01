'use client'

import { useState } from 'react'

const STYLE_CHIPS = [
  { id: 'premium', label: 'Premium' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'humano', label: 'Humano' },
  { id: 'arquitetural', label: 'Arquitetural' },
  { id: 'luz-natural', label: 'Luz Natural' },
  { id: 'corporativo', label: 'Corporativo' },
  { id: 'servicos', label: 'Serviços Condominiais' },
  { id: 'tons-neutros', label: 'Tons Neutros' },
  { id: 'brasileiro', label: 'Contexto Brasileiro' },
  { id: 'obras', label: 'Obras e Manutenção' },
]

const SUBJECT_PRESETS = [
  'Síndico profissional',
  'Portaria e recepção',
  'Área comum do condomínio',
  'Manutenção e obras',
  'Reunião de assembleia',
  'Fachada de edifício',
  'Área de lazer',
  'Equipe de serviços',
  'Moradores em convivência',
  'Segurança e vigilância',
]

export function PromptCreator() {
  const [description, setDescription] = useState('')
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  function toggleStyle(id: string) {
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  async function generatePrompt() {
    if (!description && selectedStyles.length === 0) return
    setLoading(true)
    setGeneratedPrompt('')
    try {
      const res = await fetch('/api/generate-photo-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, styles: selectedStyles }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      setGeneratedPrompt(data.prompt || '')
    } catch {
      setGeneratedPrompt(buildFallbackPrompt())
    } finally {
      setLoading(false)
    }
  }

  function buildFallbackPrompt(): string {
    const styleMap: Record<string, string> = {
      premium: 'premium quality, sophisticated atmosphere',
      editorial: 'editorial photography style, clean intentional composition',
      humano: 'authentic human expression, natural candid pose, real people',
      arquitetural: 'architectural photography, strong vertical lines, modern residential building',
      'luz-natural': 'natural window light, soft diffused shadows',
      corporativo: 'professional corporate environment, property management context',
      servicos: 'skilled professional worker in condominium service context',
      'tons-neutros': 'neutral color palette, beige, white, grey, muted earth tones',
      brasileiro: 'urban Brazilian context, São Paulo cityscape reference',
      obras: 'construction work, maintenance crew, safety equipment, building renovation',
    }
    const styleTerms = selectedStyles.map((s) => styleMap[s] || s).join(', ')
    const subject = description || 'professional property management scene'
    return `${subject}, ${styleTerms}, Canon EOS R5, 35mm f/1.8, natural light, editorial brand photography for Brazilian real estate management company, clean background, --ar 16:9 --style raw --q 2`
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(generatedPrompt)
    } catch {
      const el = document.createElement('textarea')
      el.value = generatedPrompt
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const canGenerate = description.trim().length > 0 || selectedStyles.length > 0

  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-6 md:p-8 w-full">
      {/* Description */}
      <div className="mb-5">
        <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">
          O que você quer fotografar?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: síndico reunido com moradores em área comum do condomínio, luz natural da tarde..."
          className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm font-body text-[#3D3D3D] placeholder-[#3D3D3D]/40 focus:outline-none focus:ring-2 focus:ring-[#3e77db]/30 focus:border-[#3e77db] resize-none bg-[#F4F6F8] transition-colors"
          rows={3}
        />
        {/* Quick presets */}
        <div className="flex flex-wrap gap-1.5 mt-2">
          {SUBJECT_PRESETS.map((preset) => (
            <button
              key={preset}
              onClick={() => setDescription(preset)}
              className="px-2.5 py-1 rounded-lg text-[10px] font-semibold font-body text-[#3D3D3D]/50 bg-[#F4F6F8] hover:bg-[#3e77db]/10 hover:text-[#3e77db] transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Style chips */}
      <div className="mb-6">
        <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">
          Estilo visual
        </label>
        <div className="flex flex-wrap gap-2">
          {STYLE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              onClick={() => toggleStyle(chip.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ${
                selectedStyles.includes(chip.id)
                  ? 'bg-[#3e77db] text-white'
                  : 'bg-[#F4F6F8] text-[#3D3D3D]/60 hover:bg-[#3e77db]/10 hover:text-[#3e77db]'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        onClick={generatePrompt}
        disabled={loading || !canGenerate}
        className="w-full py-3 rounded-xl bg-[#3e77db] hover:bg-[#2d63c8] text-white text-sm font-semibold font-body transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Gerando prompt...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Gerar prompt para IA
          </>
        )}
      </button>

      {/* Result */}
      {generatedPrompt && (
        <div className="mt-5 relative">
          <div className="p-4 rounded-xl bg-[#0d1929] pr-12">
            <p className="text-sm font-mono text-white/80 leading-relaxed">{generatedPrompt}</p>
          </div>
          <button
            onClick={copyPrompt}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
            aria-label="Copiar prompt"
          >
            {copied ? (
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
          <p className="text-[10px] text-[#3D3D3D]/40 font-body mt-2 text-center">
            {copied ? '✓ Copiado!' : 'Use no Midjourney, DALL-E, Stable Diffusion ou qualquer gerador de imagem IA'}
          </p>
        </div>
      )}
    </div>
  )
}
