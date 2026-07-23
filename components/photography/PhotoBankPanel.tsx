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

type Stage = 'form' | 'preview'

export function PhotoBankPanel() {
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
  const [successMessage, setSuccessMessage] = useState('')
  const [justGenerated, setJustGenerated] = useState<BankEntry | null>(null)
  const [downloadingGenerated, setDownloadingGenerated] = useState(false)

  const [approvedEntries, setApprovedEntries] = useState<BankEntry[]>([])
  const [loadingApproved, setLoadingApproved] = useState(true)

  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewPin, setReviewPin] = useState('')
  const [reviewPinInput, setReviewPinInput] = useState('')
  const [reviewPinError, setReviewPinError] = useState(false)
  const [pendingEntries, setPendingEntries] = useState<BankEntry[]>([])
  const [loadingPending, setLoadingPending] = useState(false)
  const [actionId, setActionId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadProgress, setUploadProgress] = useState('')

  const [lightboxEntry, setLightboxEntry] = useState<BankEntry | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

  const fetchApproved = useCallback(async () => {
    setLoadingApproved(true)
    try {
      const res = await fetch('/api/photo-bank?status=aprovado')
      if (res.ok) {
        const data = await res.json()
        const sorted = [...(data.entries || [])].sort(
          (a: BankEntry, b: BankEntry) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setApprovedEntries(sorted)
      }
    } finally {
      setLoadingApproved(false)
    }
  }, [])

  useEffect(() => {
    fetchApproved()
  }, [fetchApproved])

  useEffect(() => {
    const saved = sessionStorage.getItem(BANK_PIN_KEY)
    if (saved) setReviewPin(saved)
  }, [])

  function toggleStyle(id: string) {
    setSelectedStyles((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  async function generatePrompt() {
    setGeneratingPrompt(true)
    setFormError('')
    setJustGenerated(null)
    setSuccessMessage('')
    try {
      const res = await fetch('/api/generate-photo-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, styles: selectedStyles, pillar, format }),
      })
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptEn, format, description, styles: selectedStyles, pillar }),
      })
      if (!res.ok) throw new Error('Erro ao gerar imagem')
      const data = await res.json()
      setDescription('')
      setSelectedStyles([])
      setPromptEn('')
      setPromptPt('')
      setStage('form')
      setJustGenerated(data.entry || null)
      setSuccessMessage('Imagem gerada! Voce ja pode baixar abaixo. Ela so aparece no banco publico apos ser aprovada na revisao semanal.')
      if (reviewPin) fetchPending(reviewPin)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erro ao gerar imagem')
    } finally {
      setGeneratingImage(false)
    }
  }

  async function fetchPending(pin: string) {
    setLoadingPending(true)
    try {
      const res = await fetch('/api/photo-bank?status=pendente', { headers: { 'x-bank-pin': pin } })
      if (res.status === 401) {
        setReviewPinError(true)
        setReviewPin('')
        sessionStorage.removeItem(BANK_PIN_KEY)
        return
      }
      if (!res.ok) throw new Error()
      const data = await res.json()
      setPendingEntries(data.entries || [])
      setReviewPin(pin)
      sessionStorage.setItem(BANK_PIN_KEY, pin)
      setReviewPinError(false)
    } catch {
      setReviewPinError(true)
    } finally {
      setLoadingPending(false)
    }
  }

  function openReview() {
    setReviewOpen(true)
    if (reviewPin) fetchPending(reviewPin)
  }

  function submitReviewPin(e: React.FormEvent) {
    e.preventDefault()
    fetchPending(reviewPinInput)
  }

  async function reviewEntry(id: string, status: 'aprovado' | 'reprovado') {
    setActionId(id)
    try {
      const res = await fetch('/api/photo-bank/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-bank-pin': reviewPin },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Erro ao revisar')
      setPendingEntries((prev) => prev.filter((e) => e.id !== id))
      if (status === 'aprovado') fetchApproved()
    } catch {
      // usuario pode tentar novamente
    } finally {
      setActionId(null)
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    setUploadError('')
    const fileList = Array.from(files)
    let successCount = 0
    const failed: string[] = []
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      setUploadProgress('Enviando ' + (i + 1) + '/' + fileList.length + '...')
      try {
        const formData = new FormData()
        formData.append('files', file)
        const res = await fetch('/api/photo-bank/upload', {
          method: 'POST',
          headers: { 'x-bank-pin': reviewPin },
          body: formData,
        })
        if (!res.ok) throw new Error()
        successCount++
      } catch {
        failed.push(file.name)
      }
    }
    setUploadProgress('')
    if (failed.length > 0) {
      setUploadError(
        successCount + ' imagem(ns) enviada(s) com sucesso. Falha ao enviar: ' + failed.join(', ')
      )
    }
    await fetchApproved()
    setUploading(false)
    e.target.value = ''
  }

  async function deleteApprovedEntry(id: string) {
    if (!reviewPin) return
    setDeletingId(id)
    try {
      const res = await fetch('/api/photo-bank/' + id, {
        method: 'DELETE',
        headers: { 'x-bank-pin': reviewPin },
      })
      if (!res.ok) throw new Error()
      setApprovedEntries((prev) => prev.filter((e) => e.id !== id))
      setLightboxEntry(null)
    } catch {
      // usuario pode tentar novamente
    } finally {
      setDeletingId(null)
    }
  }

  async function downloadImage(entry: BankEntry) {
    setDownloadingId(entry.id)
    try {
      const res = await fetch(entry.imageUrl)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const ext = (entry.imageUrl.split('.').pop() || 'png').split('?')[0]
      a.download = (entry.description || entry.id).replace(/[^a-zA-Z0-9-_ ]/g, '') + '.' + ext
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      window.open(entry.imageUrl, '_blank')
    } finally {
      setDownloadingId(null)
    }
  }

  async function downloadJustGenerated() {
    if (!justGenerated) return
    setDownloadingGenerated(true)
    try {
      await downloadImage(justGenerated)
    } finally {
      setDownloadingGenerated(false)
    }
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Coluna esquerda: gerador de prompt */}
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
              {successMessage && <p className="text-xs text-[#318367] font-body mt-3 text-center">{successMessage}</p>}

              {justGenerated && (
                <div className="mt-5 p-4 rounded-xl bg-[#F4F6F8] border border-black/[0.06]">
                  <div className="relative rounded-lg overflow-hidden bg-white aspect-[4/3] mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={justGenerated.imageUrl} alt={justGenerated.description || 'Imagem gerada'} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[10px] font-body text-[#3D3D3D]/50">Pendente de revisao · disponivel so para voce por enquanto</p>
                    <button
                      onClick={downloadJustGenerated}
                      disabled={downloadingGenerated}
                      className="shrink-0 px-4 py-2 rounded-lg bg-[#3e77db] hover:bg-[#2d63c8] text-white text-xs font-semibold font-body transition-colors disabled:opacity-40"
                    >
                      {downloadingGenerated ? 'Baixando...' : 'Baixar'}
                    </button>
                  </div>
                </div>
              )}

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

        {/* Coluna direita: banco aprovado */}
        <div>
          <p className="text-sm font-semibold font-body text-[#101e37] mb-4">Banco aprovado</p>
          {loadingApproved ? (
            <p className="text-sm font-body text-[#3D3D3D]/40 text-center py-16">Carregando...</p>
          ) : approvedEntries.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/10 bg-[#F4F6F8] px-8 py-16 text-center">
              <p className="text-sm font-body text-[#3D3D3D]/50">Nenhuma imagem aprovada ainda.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => setLightboxEntry(approvedEntries[0])}
                className="relative block w-full rounded-2xl overflow-hidden border border-black/[0.06] bg-[#F4F6F8] aspect-[4/3] cursor-zoom-in"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={approvedEntries[0].imageUrl}
                  alt={approvedEntries[0].description || 'Imagem aprovada mais recente'}
                  className="w-full h-full object-cover"
                />
              </button>
              {approvedEntries.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {approvedEntries.slice(1).map((entry) => (
                    <button
                      key={entry.id}
                      onClick={() => setLightboxEntry(entry)}
                      className="relative block rounded-lg overflow-hidden border border-black/[0.06] bg-[#F4F6F8] aspect-square cursor-zoom-in"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={entry.imageUrl} alt={entry.description} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Acesso discreto a revisao semanal */}
      <div className="mt-10 text-center">
        {!reviewOpen && (
          <button
            onClick={openReview}
            className="text-[11px] text-[#3D3D3D]/30 hover:text-[#3D3D3D]/60 font-body underline underline-offset-2 transition-colors"
          >
            Acesso da equipe · Revisao semanal
          </button>
        )}
      </div>

      {reviewOpen && (
        <div className="mt-4 border-t border-black/[0.06] pt-8">
          {!reviewPin ? (
            <form onSubmit={submitReviewPin} className="max-w-xs mx-auto text-center space-y-3">
              <p className="text-sm font-body text-[#3D3D3D]/50">Digite o PIN da equipe para revisar</p>
              <input
                type="password"
                value={reviewPinInput}
                onChange={(e) => setReviewPinInput(e.target.value)}
                placeholder="PIN"
                className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm font-body text-center bg-[#F4F6F8] focus:outline-none focus:ring-2 focus:ring-[#3e77db]/30"
              />
              {reviewPinError && <p className="text-xs text-red-500 font-body">PIN incorreto, tente novamente.</p>}
              <button type="submit" className="w-full py-2.5 rounded-xl bg-[#3e77db] hover:bg-[#2d63c8] text-white text-sm font-semibold font-body transition-colors">
                Entrar
              </button>
            </form>
          ) : (
            <>
              <p className="text-sm font-semibold font-body text-[#101e37] mb-4 text-center">Revisao semanal</p>
              <div className="max-w-md mx-auto mb-6 p-4 rounded-xl bg-[#F4F6F8] flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold font-body text-[#101e37]">Adicionar imagens existentes</p>
                  <p className="text-[10px] font-body text-[#3D3D3D]/50">
                    {uploading ? uploadProgress || 'Enviando...' : 'Fotos ja prontas entram direto como aprovadas.'}
                  </p>
                </div>
                <label className="shrink-0 px-4 py-2 rounded-lg bg-[#3e77db] hover:bg-[#2d63c8] text-white text-xs font-semibold font-body cursor-pointer transition-colors">
                  {uploading ? 'Enviando...' : 'Escolher arquivos'}
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
              </div>
              {uploadError && <p className="text-xs text-red-500 font-body mb-4 text-center max-w-md mx-auto">{uploadError}</p>}

              <EntryGrid
                entries={pendingEntries}
                loading={loadingPending}
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
            </>
          )}
        </div>
      )}

      {lightboxEntry && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightboxEntry(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxEntry(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center text-sm"
              aria-label="Fechar"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxEntry.imageUrl}
              alt={lightboxEntry.description}
              className="w-full max-h-[70vh] object-contain bg-[#F4F6F8]"
            />
            <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs font-body text-[#3D3D3D]/60 line-clamp-1">{lightboxEntry.description}</p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => downloadImage(lightboxEntry)}
                  disabled={downloadingId === lightboxEntry.id}
                  className="px-4 py-2 rounded-lg bg-[#3e77db] hover:bg-[#2d63c8] text-white text-xs font-semibold font-body transition-colors disabled:opacity-40"
                >
                  {downloadingId === lightboxEntry.id ? 'Baixando...' : 'Baixar'}
                </button>
                {reviewPin && (
                  <button
                    onClick={() => deleteApprovedEntry(lightboxEntry.id)}
                    disabled={deletingId === lightboxEntry.id}
                    className="px-4 py-2 rounded-lg bg-[#F4F6F8] hover:bg-red-50 text-[#3D3D3D]/70 hover:text-red-500 text-xs font-semibold font-body transition-colors disabled:opacity-40"
                  >
                    {deletingId === lightboxEntry.id ? 'Excluindo...' : 'Excluir'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
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

