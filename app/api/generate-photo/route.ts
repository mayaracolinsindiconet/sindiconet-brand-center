import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import OpenAI from 'openai'
import { put } from '@vercel/blob'
import { checkBankPin } from '@/lib/photo-bank-auth'
import { addEntry, type BankEntry } from '@/lib/blob-bank'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `Voce e um especialista em direcao de fotografia de marca e prompts para IA generativa.
Crie prompts profissionais para geracao de imagens IA alinhados ao guia fotografico oficial da Sindiconet.
Posicionamento emocional central: "Voce esta em boas maos."
Tres pilares: (1) Premium Silencioso - sofisticacao sem ostentacao, tons frios/neutros, luz natural, muito espaco negativo;
(2) Editorial Corporativo Humano - pessoas reais brasileiras/latinas, expressoes espontaneas, contexto condominial, 35-50mm prime, luz natural difusa;
(3) Arquitetura como Simbolo - verticalidade, angulo baixo, ceu negativo, fachadas modernas, vegetacao tropical integrada.
Paleta: azul #101e37, cinza concreto #6C757D, branco #F4F6F8. Evitar: luxury exagerado, futurismo, cores neon, poses artificiais, stock generico.
Retorne APENAS o prompt final em ingles, pronto para uso em geracao de imagem, sem explicacoes ou prefacios.`

const styleGuide: Record<string, string> = {
    premium: 'premium silent quality, sophisticated restrained atmosphere, high-end residential condominium context, noble materials (glass, concrete, light wood), generous negative space',
    editorial: 'editorial documentary photography, intentional composition, professional institutional magazine quality, 35mm prime lens look',
    humano: 'authentic candid human expression, real people with Brazilian/Latin appearance, natural spontaneous body language, not modeled poses',
    arquitetural: 'architectural photography, strong vertical lines, low angle valorizing building height, modern Brazilian urban residential towers',
    'luz-natural': 'soft natural window light, golden hour or cool morning light, diffused without hard shadows, no artificial flash or studio lighting',
    corporativo: 'professional corporate environment, property management / condominium administration context, business casual attire, glass and concrete office',
    servicos: 'skilled Brazilian maintenance professional, condominium service context (plumbing/electrical/cleaning/security/landscaping), realistic work environment',
    'tons-neutros': 'neutral muted color palette: beige, white #F4F6F8, concrete grey #6C757D, deep blue #101e37, no saturated colors',
    brasileiro: 'distinctly Brazilian urban context, Sao Paulo cityscape reference, tropical vegetation integrated with architecture, local Latin aesthetic',
    obras: 'construction or renovation work in residential condominium, safety equipment (hard hat, vest), scaffolding, urban building site Brazil',
}

async function buildPrompt(description: string, styles: string[]): Promise<string> {
    const styleDescriptions = styles.map((s) => styleGuide[s] || s).join('; ')
    const userPrompt = `Crie um prompt profissional para geracao de imagem IA seguindo RIGOROSAMENTE o guia fotografico da Sindiconet:
    ${description ? `CENA/ASSUNTO DESEJADO: ${description}` : ''}
    ${styleDescriptions ? `ESTILOS VISUAIS SELECIONADOS: ${styleDescriptions}` : ''}
    Retorne APENAS o prompt final em ingles.`

  try {
        const completion = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [
                  { role: 'system', content: SYSTEM_PROMPT },
                  { role: 'user', content: userPrompt },
                        ],
                temperature: 0.7,
                max_tokens: 450,
        })
        const prompt = completion.choices[0]?.message?.content?.trim()
        if (prompt) return prompt
  } catch (err) {
        console.error('groq buildPrompt error:', err)
  }
    const styleTerms = styles.map((s) => styleGuide[s] || s).join(', ')
    return `${description || 'professional property management scene'}, ${styleTerms}, editorial brand photography for Brazilian condominium management company, natural light, clean composition`
}

export async function POST(req: NextRequest) {
    const unauthorized = checkBankPin(req)
    if (unauthorized) return unauthorized

  try {
        const { description, styles, pillar } = await req.json()

      if (!description && (!styles || styles.length === 0)) {
              return NextResponse.json({ error: 'Forneca uma descricao ou estilos' }, { status: 400 })
      }
        if (!process.env.OPENAI_API_KEY) {
                return NextResponse.json(
                  { error: 'OPENAI_API_KEY nao configurada no servidor.' },
                  { status: 503 }
                        )
        }

      const finalPrompt = await buildPrompt(description || '', styles || [])

      const image = await openai.images.generate({
              model: 'gpt-image-1',
              prompt: finalPrompt,
              size: '1536x1024',
              quality: 'high',
              n: 1,
      })

      const b64 = image.data?.[0]?.b64_json
        if (!b64) {
                return NextResponse.json({ error: 'Falha ao gerar imagem' }, { status: 502 })
        }
        const buffer = Buffer.from(b64, 'base64')

      const id = `img_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
        const blob = await put(`banco-imagens/${id}.png`, buffer, {
                access: 'public',
                contentType: 'image/png',
                addRandomSuffix: false,
        })

      const entry: BankEntry = {
              id,
              imageUrl: blob.url,
              prompt: finalPrompt,
              description: description || '',
              styles: styles || [],
              pillar: pillar || null,
              status: 'pendente',
              createdAt: new Date().toISOString(),
      }
        await addEntry(entry)

      return NextResponse.json({ entry })
  } catch (error) {
        console.error('generate-photo error:', error)
        return NextResponse.json({ error: 'Erro ao gerar imagem' }, { status: 500 })
  }
}
