import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `Voce e um especialista em direcao de fotografia de marca e prompts para IA generativa.
Sua tarefa: olhar para uma imagem de referencia enviada pelo usuario e escrever um prompt de geracao de imagem
que preserve a CENA/COMPOSICAO/ASSUNTO da referencia (o que esta acontecendo, enquadramento, pose, elementos principais),
mas redirecione todo o tratamento visual para o guia fotografico oficial da Sindiconet.

Posicionamento emocional central: "Voce esta em boas maos."
Tres pilares: (1) Premium Silencioso - sofisticacao sem ostentacao, tons frios/neutros, luz natural, muito espaco negativo;
(2) Editorial Corporativo Humano - pessoas reais brasileiras/latinas, expressoes espontaneas, contexto condominial, 35-50mm prime, luz natural difusa;
(3) Arquitetura como Simbolo - verticalidade, angulo baixo, ceu negativo, fachadas modernas, vegetacao tropical integrada.
Paleta: azul #101e37, cinza concreto #6C757D, branco #F4F6F8.
Evitar: luxury exagerado, futurismo, cores neon, poses artificiais, stock generico, elementos da imagem de referencia que nao combinam com a marca (ex: logotipos de terceiros, texto, marcas d'agua).

Descreva a cena chave da referencia em detalhe (assunto, acao, enquadramento, ambiente) e aplique a linguagem cromatica,
de iluminacao e de composicao do guia da marca. Nao copie estilos, roupas de marca ou elementos graficos da imagem original
que conflitem com a identidade Sindiconet.

Retorne APENAS o prompt final em ingles, pronto para uso em geracao de imagem, sem explicacoes ou prefacios.`

const styleGuide: Record<string, string> = {
  premium:
    'premium silent quality, sophisticated restrained atmosphere, high-end residential condominium context, noble materials (glass, concrete, light wood), generous negative space',
  editorial:
    'editorial documentary photography, intentional composition, professional institutional magazine quality, 35mm prime lens look',
  humano:
    'authentic candid human expression, real people with Brazilian/Latin appearance, natural spontaneous body language, not modeled poses',
  arquitetural:
    'architectural photography, strong vertical lines, low angle valorizing building height, modern Brazilian urban residential towers',
  'luz-natural':
    'soft natural window light, golden hour or cool morning light, diffused without hard shadows, no artificial flash or studio lighting',
  corporativo:
    'professional corporate environment, property management / condominium administration context, business casual attire, glass and concrete office',
  'tons-neutros':
    'neutral muted color palette: beige, white #F4F6F8, concrete grey #6C757D, deep blue #101e37, no saturated colors',
  brasileiro:
    'distinctly Brazilian urban context, São Paulo cityscape reference, tropical vegetation integrated with architecture, local Latin aesthetic',
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, description, styles, pillar } = await req.json()

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json({ error: 'Envie uma imagem de referencia' }, { status: 400 })
    }
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY nao configurada no servidor.' },
        { status: 503 }
      )
    }

    const styleDescriptions = ((styles || []) as string[])
      .map((s) => styleGuide[s] || s)
      .join('; ')

    const pillarLabel: Record<string, string> = {
      'premium-silencioso': 'Premium Silencioso',
      'editorial-humano': 'Editorial Corporativo Humano',
      'arquitetura-simbolo': 'Arquitetura como Simbolo',
    }

    const userText = [
      'Analise a imagem de referencia anexada e crie um prompt de geracao de imagem seguindo RIGOROSAMENTE o guia fotografico da Sindiconet.',
      description ? `CONTEXTO ADICIONAL DESEJADO PELO USUARIO: ${description}` : '',
      styleDescriptions ? `ESTILOS VISUAIS SELECIONADOS: ${styleDescriptions}` : '',
      pillar && pillarLabel[pillar] ? `PILAR FOTOGRAFICO: ${pillarLabel[pillar]}` : '',
      'Preserve a cena/composicao/assunto principal da imagem de referencia, mas aplique a paleta, iluminacao e linguagem visual da marca.',
    ]
      .filter(Boolean)
      .join('\n')

    const imageUrl = imageBase64.startsWith('data:')
      ? imageBase64
      : `data:image/jpeg;base64,${imageBase64}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            { type: 'text', text: userText },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      temperature: 0.7,
      max_tokens: 450,
    })

    const prompt = completion.choices[0]?.message?.content?.trim() ?? ''
    if (!prompt) {
      return NextResponse.json({ error: 'Nao foi possivel gerar o prompt' }, { status: 502 })
    }

    return NextResponse.json({ prompt })
  } catch (error) {
    console.error('generate-photo-prompt-from-image error:', error)
    return NextResponse.json({ error: 'Erro ao gerar prompt a partir da imagem' }, { status: 500 })
  }
}
