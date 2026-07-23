'use client'

import { useState, useEffect, useCallback } from 'react'

const BANK_PIN_KEY = 'banco-imagens-pin'

const PILLARS = [
  { id: 'premium-silencioso', label: 'Premium Silencioso' },
  { id: 'editorial-humano', label: 'Editorial Corporativo Humano' },
  { id: 'arquitetura-simbolo', label: 'Arquitetura como Simbolo' },
]

const STYLE_CHIPS = [
  { id: 'premium', label: 'Premium' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'humano', label: 'Humano' },
  { id: 'arquitetural', label: 'Arquitetural' },
  { id: 'luz-natural', label: 'Luz Natural' },
  { id: 'corporativo', label: 'Corporativo' },
  { id: 'tons-neutros', label: 'Tons Neutros' },
  { id: 'brasileiro', label: 'Contexto Brasileiro' },
]

const FORMATS = [
  { id: 'quadrado', label: 'Quadrado', hint: '1:1' },
  { id: 'retrato', label: 'Retrato', hint: '2:3' },
  { id: 'paisagem', label: 'Paisagem', hint: '3:2' },
]

type BankEntry = {
  id: string
  imageUrl: string
  prompt: string
  description: string
  styles: string[]
  pillar: string
  status: 'pendente' | 'aprovado' | 'reprovado'
  createdAt: string
  reviewedAt?: string
  reviewNote?: string
}

type Tab = 'gerar' | 'revisao' | 'aprovadas'
type Stage = 'form' | 'preview'

export function PhotoBankPanel() {
  const [pin, setPin] = useState('')
  const [pinInput, setPinInput] = useState('')
  const [pinError, setPinError] = useState(false)
  const [tab, setTab] = useState<Tab>('gerar')

  const [stage, setStage] = useState<Stage>('form')
  const [description, setDescription] = useState('')
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [pillar, setPillar] = useState(PILLARS[0].id)
  const [format, setFormat] = useState(FORMATS[2].id)

  const [promptEn, setPromptEn] = useState('')
  const [promptPt, setPromptPt] = useState('')
  const [generatingPrompt, setGeneratingPrompt] = useState(false)
  const [generatingImage, setGeneratingImage] = useState(false)
  const [formError, setFormError] = useState('')

  const [entries, setEntries] = useState<BankEntry[]>([])
  const [loadingEntries, setLoadingEntries] = useState(false)
  const [actionId, setActionId] = useState<string | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem(BANK_PIN_KEY)
    if (saved) setPin(saved)
  }, [])

  const fetchEntries = useCallback(async (status?: string) => {
    if (!pin) return
    setLoadingEntries(true)
    try {
      const url = status ? '/api/photo-bank?status=' + status : '/api/photo-bank'
      const res = await fetch(url, { headers: { 'x-bank-pin': pin } })
      if (!res.ok) throw new Error('Falha ao carregar')
      const data = await res.json()
      setEntries(data.entries || [])
    } catch {
      setEntries([])
    } finally {
      setLoadingEntries(false)
    }
  }, [pin])

  useEffect(() => {
    if (!pin) return
    if (tab === 'revisao') fetchEntries('pendente')
    if (tab === 'aprovadas') fetchEntries('aprovado')
  }, [pin, tab, fetchEntries])

  function submitPin(e: React.FormEvent) {
    e.preventDefault()
    sessionStorage.setItem(BANK_PIN_KEY, pinInput)
    setPin(pinInput)
    setPinError(false)
  }

  function toggleStyle(id: string) {
    setSelectedStyles((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  function handleUnauthorized() {
    setPinError(true)
    setPin('')
    sessionStorage.removeItem(BANK_PIN_KEY)
  }

  async function generatePrompt() {
    setGeneratingPrompt(true)
    setFormError('')
    try {
      const res = await fetch('/api/generate-photo-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-bank-pin': pin },
        body: JSON.stringify({ description, styles: selectedStyles, pillar, format }),
      })
      if (res.status === 401) { handleUnauthorized(); return }
      if (!res.ok) throw new Error('Erro ao gerar prompt')
      const data = await res.json()
      setPromptEn(data.promptEn || data.prompt || '')
      setPromptPt(data.promptPt || '')
      setStage('preview')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro ao gerar prompt')
    } finally {
      setGeneratingPrompt(false)
    }
  }

  function backToEdit() {
    setStage('form')
  }

  async function confirmAndGenerateImage() {
    setGeneratingImage(true)
    setFormError('')
    try {
      const res = await fetch('/api/generate-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-bank-pin': pin },
        body: JSON.stringify({ prompt: promptEn, format, description, styles: selectedStyles, pillar }),
      })
      if (res.status === 401) { handleUnauthorized(); return }
      if (!res.ok) throw new Error('Erro ao gerar imagem')
      setDescription('')
      setSelectedStyles([])
      setPromptEn('')
      setPromptPt('')
      setStage('form')
      setTab('revisao')
      fetchEntries('pendente')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro ao gerar imagem')
    } finally {
      setGeneratingImage(false)
    }
  }

  async function reviewEntry(id: string, status: 'aprovado' | 'reprovado') {
    setActionId(id)
    try {
      const res = await fetch('/api/photo-bank/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-bank-pin': pin },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Erro ao revisar')
      setEntries((prev) => prev.filter((e) => e.id !== id))
    } catch {
      // usuario pode tentar novamente
    } finally {
      setActionId(null)
    }
  }

  if (!pin) {
    return (
      <div className="max-w-sm mx-auto bg-white rounded-2xl border border-black/[0.06] p-8 text-center">
        <p className="font-headline font-semibold text-lg text-[#101e37] mb-1">Banco de Imagens</p>
        <p className="text-sm font-body text-[#3D3D3D]/50 mb-5">Acesso restrito. Digite o PIN da equipe.</p>
        <form onSubmit={submitPin} className="space-y-3">
          <input
            type="password"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            placeholder="PIN"
            className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm font-body text-center bg-[#F4F6F8] focus:outline-none focus:ring-2 focus:ring-[#3e77db]/30"
          />
          {pinError && <p className="text-xs text-red-500 font-body">PIN incorreto, tente novamente.</p>}
          <button type="submit" className="w-full py-2.5 rounded-xl bg-[#3e77db] hover:bg-[#2d63c8] text-white text-sm font-semibold font-body transition-colors">
            Entrar
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-6 border-b border-black/[0.06]">
        {[
          { id: 'gerar' as Tab, label: 'Gerar' },
          { id: 'revisao' as Tab, label: 'Revisao semanal' },
          { id: 'aprovadas' as Tab, label: 'Banco aprovado' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={
              'px-4 py-2.5 text-sm font-semibold font-body border-b-2 -mb-px transition-colors ' +
              (tab === t.id ? 'border-[#3e77db] text-[#101e37]' : 'border-transparent text-[#3D3D3D]/40 hover:text-[#3D3D3D]/70')
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'gerar' && (
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 md:p-8">
          {stage === 'form' && (
            <>
              <div className="mb-5">
                <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">Pilar fotografico</label>
                <div className="flex flex-wrap gap-2">
                  {PILLARS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPillar(p.id)}
                      className={
                        'px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ' +
                        (pillar === p.id ? 'bg-[#101e37] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60')
                      }
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">Formato da imagem</label>
                <div className="flex flex-wrap gap-2">
                  {FORMATS.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFormat(f.id)}
                      className={
                        'px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ' +
                        (format === f.id ? 'bg-[#3e77db] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60')
                      }
                    >
                      {f.label} <span className="opacity-60">({f.hint})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">Descricao da cena</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: sindico reunido com moradores em area comum, luz natural da tarde..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm font-body text-[#3D3D3D] placeholder-[#3D3D3D]/40 bg-[#F4F6F8] resize-none focus:outline-none focus:ring-2 focus:ring-[#3e77db]/30"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">Estilo visual</label>
                <div className="flex flex-wrap gap-2">
                  {STYLE_CHIPS.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => toggleStyle(chip.id)}
                      className={
                        'px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ' +
                        (selectedStyles.includes(chip.id) ? 'bg-[#3e77db] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60')
                      }
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generatePrompt}
                disabled={generatingPrompt || !description.trim()}
                className="w-full py-3 rounded-xl bg-[#3e77db] hover:bg-[#2d63c8] text-white text-sm font-semibold font-body transition-colors disabled:opacity-40"
              >
                {generatingPrompt ? 'Gerando prompt...' : 'Gerar prompt'}
              </button>

              {formError && <p className="text-xs text-red-500 font-body mt-3 text-center">{formError}</p>}

              <p className="text-[10px] text-[#3D3D3D]/40 font-body mt-4 text-center">
                Voce vai revisar o prompt antes da imagem ser gerada.
              </p>
            </>
          )}

          {stage === 'preview' && (
            <>
              <p className="text-sm font-semibold font-body text-[#101e37] mb-3">Confira o prompt antes de gerar a imagem</p>

              <div className="mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3D3D3D]/40 font-body mb-1.5">Prompt (ingles, enviado a IA)</p>
                <div className="p-4 rounded-xl bg-[#0d1929]">
                  <p className="text-sm font-mono text-white/80 leading-relaxed">{promptEn}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3D3D3D]/40 font-body mb-1.5">Traducao em portugues</p>
                <div className="p-4 rounded-xl bg-[#F4F6F8]">
                  <p className="text-sm font-body text-[#3D3D3D] leading-relaxed">{promptPt}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={backToEdit}
                  disabled={generatingImage}
                  className="flex-1 py-3 rounded-xl bg-[#F4F6F8] hover:bg-black/5 text-[#3D3D3D]/70 text-sm font-semibold font-body transition-colors disabled:opacity-40"
                >
                  Editar
                </button>
                <button
                  onClick={confirmAndGenerateImage}
                  disabled={generatingImage}
                  className="flex-1 py-3 rounded-xl bg-[#3e77db] hover:bg-[#2d63c8] text-white text-sm font-semibold font-body transition-colors disabled:opacity-40"
                >
                  {generatingImage ? 'Gerando imagem...' : 'Confirmar e gerar imagem'}
                </button>
              </div>

              {formError && <p className="text-xs text-red-500 font-body mt-3 text-center">{formError}</p>}

              <p className="text-[10px] text-[#3D3D3D]/40 font-body mt-4 text-center">
                Toda imagem gerada entra como pendente e precisa de revisao semanal antes de compor o banco oficial.
              </p>
            </>
          )}
        </div>
      )}

      {tab === 'revisao' && (
        <EntryGrid
          entries={entries}
          loading={loadingEntries}
          emptyMessage="Nenhuma imagem pendente de revisao no momento."
          renderActions={(entry) => (
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => reviewEntry(entry.id, 'aprovado')}
                disabled={actionId === entry.id}
                className="flex-1 py-2 rounded-lg bg-[#3e77db] hover:bg-[#2d63c8] text-white text-xs font-semibold font-body transition-colors disabled:opacity-40"
              >
                Aprovar
              </button>
              <button
                onClick={() => reviewEntry(entry.id, 'reprovado')}
                disabled={actionId === entry.id}
                className="flex-1 py-2 rounded-lg bg-[#F4F6F8] hover:bg-red-50 text-[#3D3D3D]/70 hover:text-red-500 text-xs font-semibold font-body transition-colors disabled:opacity-40"
              >
                Reprovar
              </button>
            </div>
          )}
        />
      )}

      {tab === 'aprovadas' && (
        <EntryGrid
          entries={entries}
          loading={loadingEntries}
          emptyMessage="Nenhuma imagem aprovada ainda."
          renderActions={(entry) => (
            <a
              href={entry.imageUrl}
              download
              target="_blank"
              rel="noreferrer"
              className="block mt-3 text-center py-2 rounded-lg bg-[#F4F6F8] hover:bg-[#3e77db]/10 text-[#3D3D3D]/70 hover:text-[#3e77db] text-xs font-semibold font-body transition-colors"
            >
              Baixar imagem
            </a>
          )}
        />
      )}
    </div>
  )
}

function EntryGrid({
  entries,
  loading,
  emptyMessage,
  renderActions,
}: {
  entries: BankEntry[]
  loading: boolean
  emptyMessage: string
  renderActions: (entry: BankEntry) => React.ReactNode
}) {
  if (loading) {
    return <p className="text-sm font-body text-[#3D3D3D]/40 text-center py-16">Carregando...</p>
  }
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-[#F4F6F8] px-8 py-16 text-center">
        <p className="text-sm font-body text-[#3D3D3D]/50">{emptyMessage}</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {entries.map((entry) => (
        <div key={entry.id} className="bg-white rounded-xl border border-black/[0.06] overflow-hidden">
          <div className="relative bg-[#F4F6F8] aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={entry.imageUrl} alt={entry.description} className="w-full h-full object-cover" />
          </div>
          <div className="p-3">
            <p className="text-xs font-body text-[#3D3D3D]/70 line-clamp-2">{entry.description}</p>
            {renderActions(entry)}
          </div>
        </div>
      ))}
    </div>
  )
}
