import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `Voce e um especialista em direcao de fotografia de marca e prompts para IA generativa.
Crie prompts profissionais para geracao de imagens IA alinhados ao guia fotografico oficial da Sindiconet.

POSICIONAMENTO EMOCIONAL CENTRAL: "Voce esta em boas maos."

PILAR 01 - PREMIUM SILENCIOSO: sofisticacao sem ostentacao. Tons frios e neutros (bege, branco #F4F6F8, cinza concreto), luz natural fria, muito espaco negativo, materiais nobres (vidro, concreto, madeira clara). Evitar luxury exagerado, futurismo, cores vibrantes, excesso de elementos.

PILAR 02 - EDITORIAL CORPORATIVO HUMANO: pessoas reais em ambientes reais, camera levemente documental. Iluminacao natural suave, profundidade de campo rasa, expressoes espontaneas, pessoas com aparencia brasileira/latina, contexto urbano brasileiro, 35-50mm prime. Evitar pose artificial, diversidade forcada, stock photo generico.

PILAR 03 - ARQUITETURA COMO SIMBOLO: solidez, verticalidade, permanencia. Linhas retas, angulo baixo, muito ceu negativo (azul #101e37 ou branco), fachadas modernas, vegetacao tropical integrada. Evitar predios genericos, angulos caoticos, fachadas deterioradas.

PALETA: azul corporativo profundo #101e37, cinza concreto #6C757D, branco suave #F4F6F8, bege discreto. Ausente: saturacao agressiva, neon, gradientes pesados.

DIRETRIZES TECNICAS: 35mm f/1.8 ou 50mm f/1.4 prime, ISO natural, luz natural difusa (nunca flash direto), regra dos tercos, espaco negativo generoso, profundidade de campo rasa para pessoas.

EVITAR SEMPRE: gradientes exagerados, glow e 3D excessivo, UI gamer ou neon, maximalismo visual, estetica startup generica, visual instagramavel demais, pessoas sem contexto brasileiro, paisagens genericas.

IMPORTANTE: este prompt sera usado DIRETAMENTE em uma API de geracao de imagem (gpt-image-1), entao NAO inclua flags de Midjourney como --ar, --style raw ou --q. Escreva em prosa corrida cobrindo: assunto/cena principal, ambiente e contexto, estilo fotografico (camera, lente, luz), paleta de cores e mood.

Depois de escrever o prompt em ingles, traduza o MESMO prompt para portugues do Brasil, mantendo o sentido fiel, para que quem nao entende ingles saiba exatamente o que sera gerado.

Responda EXATAMENTE neste formato, sem nada antes ou depois, sem markdown:
PROMPT_EN: <prompt completo em ingles, em uma unica linha>
PROMPT_PT: <traducao completa em portugues, em uma unica linha>`

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

const formatLabel: Record<string, string> = {
  quadrado: 'formato quadrado (proporcao 1:1)',
  retrato: 'formato retrato vertical (proporcao 2:3)',
  paisagem: 'formato paisagem horizontal (proporcao 3:2)',
}

function parseDualPrompt(raw: string): { promptEn: string; promptPt: string } {
  const enMatch = raw.match(/PROMPT_EN:\s*([\s\S]*?)(?:\n?PROMPT_PT:|$)/i)
  const ptMatch = raw.match(/PROMPT_PT:\s*([\s\S]*)$/i)
  const promptEn = (enMatch?.[1] || raw).trim()
  const promptPt = (ptMatch?.[1] || '').trim()
  return { promptEn, promptPt }
}

export async function POST(req: NextRequest) {
  try {
    const { description, styles, pillar, format } = await req.json()

    if (!description && (!styles || styles.length === 0)) {
      return NextResponse.json({ error: 'Forneca uma descricao ou estilos' }, { status: 400 })
    }

    const styleDescriptions = ((styles || []) as string[])
      .map((s) => styleGuide[s] || s)
      .join('; ')

    const userPrompt = `Crie um prompt profissional para geracao de imagem IA seguindo RIGOROSAMENTE o guia fotografico da Sindiconet:

${description ? `CENA/ASSUNTO DESEJADO: ${description}` : ''}
${styleDescriptions ? `ESTILOS VISUAIS SELECIONADOS: ${styleDescriptions}` : ''}
${pillar ? `PILAR FOTOGRAFICO PRINCIPAL: ${pillar}` : ''}
${format ? `FORMATO DE ENQUADRAMENTO: ${formatLabel[format] || format}` : ''}

Aplique os pilares visuais relevantes do guia: cromatica, iluminacao, composicao, mood.
Siga o formato de resposta exigido (PROMPT_EN / PROMPT_PT).`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 600,
    })

    const raw = completion.choices[0]?.message?.content?.trim() ?? ''
    const { promptEn, promptPt } = parseDualPrompt(raw)

    return NextResponse.json({ promptEn, promptPt, prompt: promptEn })
  } catch (error) {
    console.error('generate-photo-prompt error:', error)
    return NextResponse.json({ error: 'Erro ao gerar prompt' }, { status: 500 })
  }
}
