'use client'

import { useState, useEffect, useCallback } from 'react'
import { upload } from '@vercel/blob/client'
import {
  DEFAULT_PROFILE,
  PROFILE_OPTIONS,
  SUBJECT_CHIPS,
  getStyleChips,
  getAllEntryTagChips,
  profileTag,
  type PhotoProfile,
} from '@/lib/photo-profiles'

const BANK_PIN_KEY = 'banco-imagens-pin'

// O pilar fotografico nao e mais escolhido pelo usuario: a IA analisa a cena
// descrita e decide internamente qual pilar (ou o especial de obra/reforma)
// melhor se adequa. Ver PILLAR_AUTO usado no envio do formulario.
const PILLAR_AUTO = 'auto'

// As tags de estilo dependem do perfil escolhido (SíndicoNet ou PRO): ver lib/photo-profiles.ts

const FORMATS = [
  { id: 'quadrado', label: 'Quadrado', hint: '1:1' },
  { id: 'retrato', label: 'Retrato', hint: '2:3' },
  { id: 'paisagem', label: 'Paisagem', hint: '3:2' },
]

const SUBJECT_FILTER_OPTIONS = [{ id: '', label: 'Quem aparece: todos' }, ...SUBJECT_CHIPS]

const APPROVED_PAGE_SIZE = 12

type BankEntry = {
  id: string
  imageUrl: string
  prompt: string
  description: string
  styles: string[]
  subjects?: string[]
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
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const pillar = PILLAR_AUTO
  const [profile, setProfile] = useState<PhotoProfile>(DEFAULT_PROFILE)
  const styleChips = getStyleChips(profile)
  const styleFilterOptions = [{ id: '', label: 'Todas as caracteristicas' }, ...styleChips]
  const [format, setFormat] = useState(FORMATS[2].id)

  const [promptEn, setPromptEn] = useState('')
  const [promptPt, setPromptPt] = useState('')
  const [generatingPrompt, setGeneratingPrompt] = useState(false)
  const [formError, setFormError] = useState('')
  const [promptCopied, setPromptCopied] = useState(false)

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
  // Tags pre-selecionadas para todas as imagens do proximo envio (o perfil ja entra marcado).
  const [uploadTags, setUploadTags] = useState<string[]>([profileTag(DEFAULT_PROFILE)])
  const [uploadSubjects, setUploadSubjects] = useState<string[]>([])

  const [lightboxEntry, setLightboxEntry] = useState<BankEntry | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [downloadingId, setDownloadingId] = useState<string | null>(null)
  const [taggingSubjects, setTaggingSubjects] = useState<string[]>([])
  const [taggingStyles, setTaggingStyles] = useState<string[]>([])
  const [savingTags, setSavingTags] = useState(false)

  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [referenceImageName, setReferenceImageName] = useState('')

  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStyle, setFilterStyle] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  // Segue sozinho o botao SíndicoNet / PRO; 'todos' mostra o banco inteiro.
  const [filterProfile, setFilterProfile] = useState<'auto' | 'todos'>('auto')
  const activeProfileFilter = filterProfile === 'auto' ? profile : ''
  const [approvedPage, setApprovedPage] = useState(1)
  const [approvedTotal, setApprovedTotal] = useState(0)
  const [approvedTotalPages, setApprovedTotalPages] = useState(1)

  const fetchApproved = useCallback(async (opts?: { page?: number; search?: string; style?: string; subject?: string; profile?: string }) => {
    const page = opts?.page ?? approvedPage
    const search = opts?.search ?? searchQuery
    const styleFilter = opts?.style ?? filterStyle
    const subjectFilter = opts?.subject ?? filterSubject
    const profileFilter = opts?.profile ?? activeProfileFilter
    setLoadingApproved(true)
    try {
      const params = new URLSearchParams()
      params.set('status', 'aprovado')
      params.set('page', String(page))
      params.set('limit', String(APPROVED_PAGE_SIZE))
      if (search) params.set('search', search)
      if (styleFilter) params.set('style', styleFilter)
      if (subjectFilter) params.set('subject', subjectFilter)
      if (profileFilter) params.set('profile', profileFilter)
      const res = await fetch('/api/photo-bank?' + params.toString())
      if (res.ok) {
        const data = await res.json()
        const sorted = [...(data.entries || [])].sort(
          (a: BankEntry, b: BankEntry) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        setApprovedEntries(sorted)
        setApprovedTotal(data.total || 0)
        setApprovedTotalPages(data.totalPages || 1)
      }
    } finally {
      setLoadingApproved(false)
    }
  }, [approvedPage, searchQuery, filterStyle, filterSubject, activeProfileFilter])

  useEffect(() => {
    fetchApproved()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approvedPage, searchQuery, filterStyle, filterSubject, activeProfileFilter])

  // Debounce da busca por texto: atualiza searchQuery 400ms apos o usuario parar de digitar,
  // e volta para a pagina 1 sempre que o filtro mudar.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput.trim())
      setApprovedPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    setTaggingSubjects(lightboxEntry?.subjects || [])
    setTaggingStyles(lightboxEntry?.styles || [])
  }, [lightboxEntry])

  function handleFilterStyleChange(value: string) {
    setFilterStyle(value)
    setApprovedPage(1)
  }

  function handleFilterSubjectChange(value: string) {
    setFilterSubject(value)
    setApprovedPage(1)
  }

  function clearFilters() {
    setSearchInput('')
    setSearchQuery('')
    setFilterStyle('')
    setFilterSubject('')
    setFilterProfile('auto')
    setApprovedPage(1)
  }

  useEffect(() => {
    const saved = sessionStorage.getItem(BANK_PIN_KEY)
    if (saved) setReviewPin(saved)
  }, [])

  // Ao trocar o perfil, as tags de estilo sao filtradas automaticamente:
  // as que nao existem no novo perfil saem da selecao e do filtro do banco.
  function handleProfileChange(next: PhotoProfile) {
    if (next === profile) return
    const allowed = new Set(getStyleChips(next).map((c) => c.id))
    setProfile(next)
    setApprovedPage(1)
    // A tag de perfil das imagens a enviar acompanha o botao escolhido.
    setUploadTags((prev) => [...prev.filter((t) => t !== profileTag(profile)), profileTag(next)])
    setSelectedStyles((prev) => prev.filter((id) => allowed.has(id)))
    if (filterStyle && !allowed.has(filterStyle)) {
      setFilterStyle('')
      setApprovedPage(1)
    }
  }

  function toggleStyle(id: string) {
    setSelectedStyles((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  function toggleSubject(id: string) {
    setSelectedSubjects((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  function toggleTaggingStyle(id: string) {
    setTaggingStyles((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  function toggleTaggingSubject(id: string) {
    setTaggingSubjects((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  function handleReferenceImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setReferenceImage(typeof reader.result === 'string' ? reader.result : null)
      setReferenceImageName(file.name)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  function clearReferenceImage() {
    setReferenceImage(null)
    setReferenceImageName('')
  }

  async function generatePrompt() {
    setGeneratingPrompt(true)
    setFormError('')
    try {
      const endpoint = referenceImage ? '/api/generate-photo-prompt-from-image' : '/api/generate-photo-prompt'
      const body = referenceImage
        ? { imageBase64: referenceImage, description, styles: selectedStyles, subjects: selectedSubjects, pillar, format, profile }
        : { description, styles: selectedStyles, subjects: selectedSubjects, pillar, format, profile }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar prompt')
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

  async function copyPrompt() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(promptEn)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = promptEn
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setPromptCopied(true)
      setTimeout(() => setPromptCopied(false), 2000)
    } catch {
      setFormError('Nao foi possivel copiar o prompt')
    }
  }

  function novoPrompt() {
    setStage('form')
    setDescription('')
    setSelectedStyles([])
    setSelectedSubjects([])
    setReferenceImage(null)
    setReferenceImageName('')
    setPromptEn('')
    setPromptPt('')
    setFormError('')
    setPromptCopied(false)
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
      if (status === 'aprovado') {
        setApprovedPage(1)
        fetchApproved({ page: 1 })
      }
    } catch {
      // usuario pode tentar novamente
    } finally {
      setActionId(null)
    }
  }

  function toggleUploadTag(id: string) {
    setUploadTags((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id])
  }

  function toggleUploadSubject(id: string) {
    setUploadSubjects((prev) => prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id])
  }

  // O banco aceita apenas JPG e PNG. O tipo e deduzido pelo tipo do arquivo ou, se o
  // navegador nao informar, pela extensao. Devolve null quando nao for JPG/PNG.
  function getAllowedContentType(file: File): 'image/jpeg' | 'image/png' | null {
    const ext = (file.name.split('.').pop() || '').toLowerCase()
    if (file.type === 'image/jpeg' || ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
    if (file.type === 'image/png' || ext === 'png') return 'image/png'
    return null
  }

  async function sha256Hex(file: File): Promise<string> {
    const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer())
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    setUploadError('')
    const allFiles = Array.from(files)
    const fileList = allFiles.filter((f) => getAllowedContentType(f) !== null)
    const rejected = allFiles.filter((f) => getAllowedContentType(f) === null).map((f) => f.name)
    const pinHeaders = { 'x-bank-pin': reviewPin }
    let successCount = 0
    const failed: string[] = []
    const duplicated: string[] = []

    // Antes de enviar, garante que as imagens antigas do banco tenham o "codigo" de
    // comparacao, para que a deteccao de imagens exatamente iguais valha para tudo.
    try {
      for (let round = 0; round < 40; round++) {
        setUploadProgress('Verificando imagens ja existentes...')
        const res = await fetch('/api/photo-bank/hashes', { method: 'POST', headers: pinHeaders })
        if (!res.ok) break
        const data = await res.json()
        if (!data.remaining || (!data.done && !data.failed)) break
      }
    } catch {
      // segue o envio mesmo sem a verificacao das antigas
    }

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const label = (i + 1) + '/' + fileList.length
      try {
        // 1) codigo do arquivo + conferencia de duplicada ANTES de enviar
        setUploadProgress('Conferindo ' + label + '...')
        const hash = await sha256Hex(file)
        const checkRes = await fetch('/api/photo-bank/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...pinHeaders },
          body: JSON.stringify({ hash }),
        })
        if (!checkRes.ok) throw new Error('falha na conferencia de duplicadas')
        const check = await checkRes.json()
        if (check.duplicate) {
          duplicated.push(file.name + ' (igual a "' + (check.duplicate.description || check.duplicate.id) + '", ' + check.duplicate.status + ')')
          continue
        }

        // 2) envio direto ao armazenamento (sem limite de tamanho da funcao do servidor)
        setUploadProgress('Enviando ' + label + '...')
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
        const blob = await upload('banco-imagens/' + Date.now() + '-' + safeName, file, {
          access: 'public',
          handleUploadUrl: '/api/photo-bank/upload-token',
          headers: pinHeaders,
          contentType: getAllowedContentType(file) || 'image/jpeg',
          multipart: file.size > 15 * 1024 * 1024,
        })

        // 3) registro no banco com as tags pre-selecionadas
        const regRes = await fetch('/api/photo-bank/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...pinHeaders },
          body: JSON.stringify({ url: blob.url, fileName: file.name, hash, styles: uploadTags, subjects: uploadSubjects }),
        })
        if (regRes.status === 409) {
          const dupData = await regRes.json().catch(() => ({}))
          duplicated.push(file.name + ' (igual a "' + (dupData.duplicate?.description || 'imagem ja existente') + '")')
          continue
        }
        if (!regRes.ok) throw new Error('falha ao registrar no banco')
        successCount++
      } catch (err) {
        const reason = err instanceof Error && err.message ? err.message : 'erro desconhecido'
        failed.push(file.name + ' [' + reason + ']')
      }
    }
    setUploadProgress('')
    const messages: string[] = []
    if (successCount > 0) messages.push(successCount + ' imagem(ns) enviada(s).')
    if (rejected.length > 0) {
      messages.push('Ignorado(s) por nao ser JPG ou PNG: ' + rejected.join(', ') + '.')
    }
    if (duplicated.length > 0) {
      messages.push('Nao enviada(s) por ja existir uma imagem exatamente igual: ' + duplicated.join('; ') + '.')
    }
    if (failed.length > 0) {
      messages.push('Falha ao enviar: ' + failed.join('; ') + '.')
    }
    if (messages.length > 0) setUploadError(messages.join(' '))
    setApprovedPage(1)
    await fetchApproved({ page: 1 })
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
      setLightboxEntry(null)
      await fetchApproved()
    } catch {
      // usuario pode tentar novamente
    } finally {
      setDeletingId(null)
    }
  }

  async function saveTags() {
    if (!lightboxEntry || !reviewPin) return
    setSavingTags(true)
    try {
      const res = await fetch('/api/photo-bank/' + lightboxEntry.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-bank-pin': reviewPin },
        body: JSON.stringify({ subjects: taggingSubjects, styles: taggingStyles }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      const updated = data.entry as BankEntry
      setLightboxEntry(updated)
      setApprovedEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
      setPendingEntries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
    } catch {
      // usuario pode tentar novamente
    } finally {
      setSavingTags(false)
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

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Coluna esquerda: gerador de prompt */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 md:p-8">
          {stage === 'form' && (
            <>
              <div className="mb-5">
                <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">Tipo de imagem</label>
                <div className="grid grid-cols-2 gap-2">
                  {PROFILE_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleProfileChange(opt.id)}
                      aria-pressed={profile === opt.id}
                      className={
                        'px-4 py-3 rounded-xl text-left transition-colors border ' +
                        (profile === opt.id
                          ? 'bg-[#101e37] text-white border-[#101e37]'
                          : 'bg-[#F4F6F8] text-[#3D3D3D]/70 border-transparent hover:border-black/10')
                      }
                    >
                      <span className="block text-sm font-semibold font-body">{opt.label}</span>
                      <span className="block text-[11px] font-body opacity-60">{opt.hint}</span>
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
                  {styleChips.map((chip) => (
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

              <div className="mb-6">
                <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">Quem aparece na cena</label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECT_CHIPS.map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => toggleSubject(chip.id)}
                      className={
                        'px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ' +
                        (selectedSubjects.includes(chip.id) ? 'bg-[#3e77db] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60')
                      }
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold font-body text-[#101e37] mb-2">Imagem de referencia (opcional)</label>
                {referenceImage ? (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F4F6F8] border border-black/[0.06]">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={referenceImage} alt="Referencia" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-body text-[#3D3D3D]/70 truncate">{referenceImageName}</p>
                      <p className="text-[10px] font-body text-[#3D3D3D]/40">O prompt sera gerado a partir desta imagem</p>
                    </div>
                    <button
                      onClick={clearReferenceImage}
                      className="shrink-0 text-xs font-semibold font-body text-[#3D3D3D]/50 hover:text-red-500 transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-black/10 bg-[#F4F6F8] text-xs font-semibold font-body text-[#3D3D3D]/60 cursor-pointer hover:bg-black/5 transition-colors">
                    Anexar imagem de referencia
                    <input type="file" accept="image/*" className="hidden" onChange={handleReferenceImage} />
                  </label>
                )}
                <p className="text-[10px] text-[#3D3D3D]/40 font-body mt-1.5">
                  A IA usa a cena da imagem como base, mas aplica a direcao visual da marca.
                </p>
              </div>

              <button
                onClick={generatePrompt}
                disabled={generatingPrompt || (!description.trim() && !referenceImage)}
                className="w-full py-3 rounded-xl bg-[#3e77db] hover:bg-[#2d63c8] text-white text-sm font-semibold font-body transition-colors disabled:opacity-40"
              >
                {generatingPrompt ? 'Gerando prompt...' : 'Gerar prompt'}
              </button>

              {formError && <p className="text-xs text-red-500 font-body mt-3 text-center">{formError}</p>}

              <p className="text-[10px] text-[#3D3D3D]/40 font-body mt-4 text-center">
                Voce vai revisar o prompt gerado antes de copia-lo.
              </p>
            </>
          )}

          {stage === 'preview' && (
            <>
              <p className="text-sm font-semibold font-body text-[#101e37] mb-3">
                Prompt gerado <span className="font-normal text-[#3D3D3D]/50">({PROFILE_OPTIONS.find((o) => o.id === profile)?.label})</span>
              </p>

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
                  className="flex-1 py-3 rounded-xl bg-[#F4F6F8] hover:bg-black/5 text-[#3D3D3D]/70 text-sm font-semibold font-body transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={copyPrompt}
                  className="flex-1 py-3 rounded-xl bg-[#3e77db] hover:bg-[#2d63c8] text-white text-sm font-semibold font-body transition-colors"
                >
                  {promptCopied ? 'Copiado!' : 'Copiar prompt'}
                </button>
                <button
                  onClick={novoPrompt}
                  className="flex-1 py-3 rounded-xl bg-[#F4F6F8] hover:bg-black/5 text-[#3D3D3D]/70 text-sm font-semibold font-body transition-colors"
                >
                  Criar novo prompt
                </button>
              </div>

              {formError && <p className="text-xs text-red-500 font-body mt-3 text-center">{formError}</p>}

              <p className="text-[10px] text-[#3D3D3D]/40 font-body mt-4 text-center">
                Copie o prompt para gerar a imagem na ferramenta de IA de sua preferencia.
              </p>
            </>
          )}
        </div>

        {/* Coluna direita: banco aprovado */}
        <div>
          <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
            <p className="text-sm font-semibold font-body text-[#101e37]">
              Banco aprovado {approvedTotal > 0 && <span className="text-[#3D3D3D]/40 font-normal">({approvedTotal})</span>}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar por descricao, estilo, mulher, sindico..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-black/10 text-xs font-body text-[#3D3D3D] placeholder-[#3D3D3D]/40 bg-[#F4F6F8] focus:outline-none focus:ring-2 focus:ring-[#3e77db]/30"
            />
            <select
              value={filterProfile}
              onChange={(e) => { setFilterProfile(e.target.value as 'auto' | 'todos'); setApprovedPage(1) }}
              className="px-3 py-2.5 rounded-xl border border-black/10 text-xs font-body text-[#3D3D3D] bg-[#F4F6F8] focus:outline-none focus:ring-2 focus:ring-[#3e77db]/30"
            >
              <option value="auto">{'Tipo: ' + (profile === 'pro' ? 'SíndicoNet PRO' : 'SíndicoNet') + ' (automatico)'}</option>
              <option value="todos">Tipo: todos</option>
            </select>
            <select
              value={filterStyle}
              onChange={(e) => handleFilterStyleChange(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-black/10 text-xs font-body text-[#3D3D3D] bg-[#F4F6F8] focus:outline-none focus:ring-2 focus:ring-[#3e77db]/30"
            >
              {styleFilterOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
            <select
              value={filterSubject}
              onChange={(e) => handleFilterSubjectChange(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-black/10 text-xs font-body text-[#3D3D3D] bg-[#F4F6F8] focus:outline-none focus:ring-2 focus:ring-[#3e77db]/30"
            >
              {SUBJECT_FILTER_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
            {(searchQuery || filterStyle || filterSubject || filterProfile !== 'auto') && (
              <button
                onClick={clearFilters}
                className="shrink-0 px-3 py-2.5 rounded-xl text-xs font-semibold font-body text-[#3D3D3D]/50 hover:text-red-500 transition-colors"
              >
                Limpar
              </button>
            )}
          </div>

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

              {approvedTotalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setApprovedPage((p) => Math.max(1, p - 1))}
                    disabled={approvedPage <= 1}
                    className="px-3 py-1.5 rounded-lg bg-[#F4F6F8] hover:bg-black/5 text-[#3D3D3D]/70 text-xs font-semibold font-body transition-colors disabled:opacity-30"
                  >
                    Anterior
                  </button>
                  <p className="text-[11px] font-body text-[#3D3D3D]/40">
                    Pagina {approvedPage} de {approvedTotalPages}
                  </p>
                  <button
                    onClick={() => setApprovedPage((p) => Math.min(approvedTotalPages, p + 1))}
                    disabled={approvedPage >= approvedTotalPages}
                    className="px-3 py-1.5 rounded-lg bg-[#F4F6F8] hover:bg-black/5 text-[#3D3D3D]/70 text-xs font-semibold font-body transition-colors disabled:opacity-30"
                  >
                    Proxima
                  </button>
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
              <div className="max-w-xl mx-auto mb-6 p-4 rounded-xl bg-[#F4F6F8]">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div>
                    <p className="text-xs font-semibold font-body text-[#101e37]">Adicionar imagens existentes</p>
                    <p className="text-[10px] font-body text-[#3D3D3D]/50">
                      {uploading
                        ? uploadProgress || 'Enviando...'
                        : 'Apenas JPG e PNG. Entram como aprovadas com as tags marcadas abaixo; imagens exatamente iguais as ja existentes sao bloqueadas.'}
                    </p>
                  </div>
                  <label className={'shrink-0 px-4 py-2 rounded-lg bg-[#3e77db] hover:bg-[#2d63c8] text-white text-xs font-semibold font-body cursor-pointer transition-colors ' + (uploading ? 'opacity-50 pointer-events-none' : '')}>
                    {uploading ? 'Enviando...' : 'Escolher arquivos'}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                      multiple
                      className="hidden"
                      onChange={handleUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3D3D3D]/40 font-body mb-1.5">Tags de todas as imagens deste envio</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {getAllEntryTagChips().map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => toggleUploadTag(chip.id)}
                      className={
                        'px-2.5 py-1 rounded-lg text-[11px] font-semibold font-body transition-colors ' +
                        (uploadTags.includes(chip.id) ? 'bg-[#101e37] text-white' : 'bg-white text-[#3D3D3D]/60')
                      }
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3D3D3D]/40 font-body mb-1.5">Quem aparece (opcional)</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUBJECT_CHIPS.map((chip) => (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => toggleUploadSubject(chip.id)}
                      className={
                        'px-2.5 py-1 rounded-lg text-[11px] font-semibold font-body transition-colors ' +
                        (uploadSubjects.includes(chip.id) ? 'bg-[#101e37] text-white' : 'bg-white text-[#3D3D3D]/60')
                      }
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
              {uploadError && <p className="text-xs text-red-500 font-body mb-4 text-center max-w-xl mx-auto">{uploadError}</p>}

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
            className="relative max-w-3xl w-full max-h-[92vh] overflow-y-auto overscroll-contain bg-white rounded-2xl"
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
              className={"w-full object-contain bg-[#F4F6F8] " + (reviewPin ? "max-h-[38vh]" : "max-h-[70vh]")}
            />
            <div className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

              {reviewPin && (
                <div className="mt-4 pt-4 border-t border-black/[0.06]">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3D3D3D]/40 font-body mb-2">Tipo e tags desta imagem</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getAllEntryTagChips().map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => toggleTaggingStyle(chip.id)}
                        className={
                          'px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ' +
                          (taggingStyles.includes(chip.id) ? 'bg-[#101e37] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60')
                        }
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[#3D3D3D]/40 font-body mb-2">Quem aparece nesta imagem</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {SUBJECT_CHIPS.map((chip) => (
                      <button
                        key={chip.id}
                        onClick={() => toggleTaggingSubject(chip.id)}
                        className={
                          'px-3 py-1.5 rounded-lg text-xs font-semibold font-body transition-colors ' +
                          (taggingSubjects.includes(chip.id) ? 'bg-[#3e77db] text-white' : 'bg-[#F4F6F8] text-[#3D3D3D]/60')
                        }
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                  <div className="sticky bottom-0 -mx-4 -mb-4 px-4 py-3 bg-white border-t border-black/[0.06]">
                    <button
                      onClick={saveTags}
                      disabled={savingTags}
                      className="px-4 py-2 rounded-lg bg-[#101e37] hover:bg-[#0d1929] text-white text-xs font-semibold font-body transition-colors disabled:opacity-40"
                    >
                      {savingTags ? 'Salvando...' : 'Salvar tags'}
                    </button>
                  </div>
                </div>
              )}
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
