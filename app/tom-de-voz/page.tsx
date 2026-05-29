'use client'

import { useState, useRef } from 'react'

type Channel = 'institucional' | 'redes' | 'email' | 'suporte' | 'produto'
type ScoreLabel = 'baixo' | 'médio' | 'alto'

interface AlignResult {
  score_original: number
  score_label: ScoreLabel
  text_aligned: string
  changes: string
}

const CHANNELS: { id: Channel; label: string }[] = [
  { id: 'institucional', label: 'Institucional' },
  { id: 'redes',         label: 'Redes sociais' },
  { id: 'email',         label: 'E-mail / newsletter' },
  { id: 'suporte',       label: 'Suporte' },
  { id: 'produto',       label: 'Interface do produto' },
]

const SCORE_STYLES: Record<ScoreLabel, { bg: string; text: string; label: string }> = {
  baixo: { bg: 'bg-red-50',    text: 'text-red-800',   label: 'Alinhamento baixo' },
  médio: { bg: 'bg-amber-50',  text: 'text-amber-800', label: 'Alinhamento médio' },
  alto:  { bg: 'bg-green-50',  text: 'text-green-800', label: 'Alinhamento alto'  },
}

const EXAMPLES = [
  'Cuidado! A nova lei pode te multar — aja agora antes que seja tarde!',
  'Nossa plataforma é a melhor solução inovadora do mercado condominial!',
  'ÚLTIMO DIA: acesse grátis e transforme a gestão do seu condomínio hoje!',
]

export default function TomDeVozPage() {
  const [channel, setChannel]   = useState<Channel>('institucional')
  const [text, setText]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [result, setResult]     = useState<AlignResult | null>(null)
  const [error, setError]       = useState<string | null>(null)
  const [copied, setCopied]     = useState(false)
  const resultRef               = useRef<HTMLDivElement>(null)

  const charCount = text.length
  const overLimit = charCount > 3000

  async function handleAlign() {
    if (!text.trim() || loading || overLimit) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch('/api/align-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, channel }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erro desconhecido.'); return }
      setResult(data)
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch {
      setError('Falha de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCopy() {
    if (!result) return
    await navigator.clipboard.writeText(result.text_aligned)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleRefine() {
    if (!result) return
    setText(result.text_aligned)
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleExample(ex: string) { setText(ex); setResult(null) }

  const scoreStyle = result ? SCORE_STYLES[result.score_label] ?? SCORE_STYLES.médio : null

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="bg-[#0d1a30] px-6 py-10 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">S</div>
            <span className="text-blue-300 text-sm font-medium tracking-wide uppercase">Brand Center · Tom de Voz</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Agente de Tom de Voz</h1>
          <p className="text-blue-200 text-base leading-relaxed max-w-xl">Cole qualquer texto e a IA reescreve no tom correto da Síndiconet — sem alarmismo, sem jargão, sem venda agressiva.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 md:px-16 py-10">
        <div className="mb-6">
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Canal de comunicação</label>
          <div className="flex flex-wrap gap-2">
            {CHANNELS.map(ch => (
              <button key={ch.id} onClick={() => setChannel(ch.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${channel === ch.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-neutral-600 border-neutral-200 hover:border-blue-300 hover:text-blue-700'}`}>
                {ch.label}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-4">
          <label className="block text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">Texto original</label>
          <textarea value={text} onChange={e => setText(e.target.value)}
            placeholder="Cole o texto que deseja alinhar ao tom da Síndiconet..."
            rows={6}
            className={`w-full resize-none rounded-xl border text-sm leading-relaxed p-4 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${overLimit ? 'border-red-300 bg-red-50' : 'border-neutral-200 bg-neutral-50'}`}
          />
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs ${overLimit ? 'text-red-600 font-medium' : 'text-neutral-400'}`}>{charCount} / 3000 caracteres</span>
            {overLimit && <span className="text-xs text-red-600">Reduza o texto para continuar</span>}
          </div>
        </div>
        {!text && (
          <div className="mb-6">
            <p className="text-xs text-neutral-400 mb-2">Experimente com um exemplo:</p>
            <div className="flex flex-col gap-2">
              {EXAMPLES.map((ex, i) => (
                <button key={i} onClick={() => handleExample(ex)}
                  className="text-left text-sm text-neutral-500 bg-white border border-neutral-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:text-blue-700 transition-colors">
                  "{ex}"
                </button>
              ))}
            </div>
          </div>
        )}
        <button onClick={handleAlign} disabled={!text.trim() || loading || overLimit}
          className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:scale-[.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {loading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Analisando e reescrevendo...</>) : 'Alinhar ao tom Síndiconet'}
        </button>
        {error && <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>}
        {result && (
          <div ref={resultRef} className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-sm font-semibold text-neutral-700 uppercase tracking-wider">Resultado</h2>
              {scoreStyle && <span className={`text-xs font-semibold px-3 py-1 rounded-full ${scoreStyle.bg} ${scoreStyle.text}`}>{scoreStyle.label} · {result.score_original}/10</span>}
            </div>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-4">
              <p className="text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">{result.text_aligned}</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl px-5 py-4 mb-5">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">O que foi ajustado</p>
              <p className="text-sm text-blue-700 leading-relaxed">{result.changes}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleCopy} className="flex-1 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">{copied ? '✓ Copiado!' : 'Copiar texto'}</button>
              <button onClick={handleRefine} className="flex-1 py-2.5 rounded-xl border border-neutral-200 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">Refinar mais</button>
            </div>
          </div>
        )}
        <div className="mt-12 pt-6 border-t border-neutral-200">
          <p className="text-xs text-neutral-400 text-center">Powered by Llama 3.3 via Groq · As respostas são geradas por IA e devem ser revisadas antes do uso final</p>
        </div>
      </div>
    </main>
  )
}
