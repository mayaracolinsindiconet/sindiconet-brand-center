import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const REALISM_SUFFIX_EN = `Photorealistic, shot on a professional DSLR camera (Canon EOS R5, 50mm f/1.4 or 35mm f/1.8 prime lens), true documentary/editorial photography -- absolutely NOT an illustration, NOT a 3D render, NOT digital art, NOT CGI, NOT painterly, NOT an AI-generated look. Natural skin texture with visible pores and realistic imperfections, authentic fabric and material textures, physically accurate lighting and soft natural shadows, shallow depth of field with authentic bokeh, subtle natural film grain, true-to-life color rendering. Avoid plastic/waxy skin, oversmoothed surfaces, uncanny symmetry, glossy render sheen, or any synthetic/AI look.`

const SYSTEM_PROMPT = `Voce e um especialista em direcao de fotografia de marca e prompts para IA generativa.
Sua tarefa: olhar para uma imagem de referencia enviada pelo usuario e escrever um prompt de geracao de imagem
que preserve a CENA/COMPOSICAO/ASSUNTO da referencia (o que esta acontecendo, enquadramento, pose, elementos principais),
mas redirecione todo o tratamento visual para o guia fotografico oficial da Sindiconet.

Posicionamento emocional central: "Voce esta em boas maos."

FOTORREALISMO OBRIGATORIO (prioridade maxima): o resultado precisa parecer uma fotografia real tirada com camera profissional (DSLR ou mirrorless), NUNCA uma ilustracao, render 3D, arte digital, pintura ou algo com "cara de IA". Descreva sempre: textura de pele natural com poros e imperfeicoes reais, texturas realistas de tecido e materiais, fisica de luz e sombra precisa, profundidade de campo rasa com bokeh autentico, grao de filme sutil. Evite pele plastica/cerosa, superficies excessivamente suavizadas, simetria artificial perfeita, brilho de render 3D ou qualquer aparencia sintetica/gerada por IA.

Tres pilares: (1) Premium Silencioso - sofisticacao sem ostentacao, tons frios/neutros, luz natural, muito espaco negativo;
(2) Editorial Corporativo Humano - pessoas reais brasileiras/latinas, expressoes espontaneas, contexto condominial, 35-50mm prime, luz natural difusa;
(3) Arquitetura como Simbolo - verticalidade, angulo baixo, ceu negativo, fachadas modernas, vegetacao tropical integrada.
Paleta: azul #101e37, cinza concreto #6C757D, branco #F4F6F8.
Evitar: luxury exagerado, futurismo, cores neon, poses artificiais, stock generico, aparencia de ilustracao ou de imagem gerada por IA, elementos da imagem de referencia que nao combinam com a marca (ex: logotipos de terceiros, texto, marcas d'agua).

Descreva a cena chave da referencia em detalhe (assunto, acao, enquadramento, ambiente) e aplique a linguagem cromatica,
de iluminacao e de composicao do guia da marca, sempre reforcando o fotorrealismo. Nao copie estilos, roupas de marca ou elementos graficos da imagem original
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

const subjectGuide: Record<string, string> = {
  mulher: 'main subject is a Brazilian/Latin woman',
  homem: 'main subject is a Brazilian/Latin man',
  sindico: 'main subject is a condominium manager (sindico)',
  trabalhador: 'main subject is a maintenance or service worker',
  empresario: 'main subject is a business executive in corporate attire',
  idoso: 'main subject is an elderly person',
  crianca: 'includes a child in the scene',
  casal: 'main subjects are a couple',
  familia: 'main subjects are a family',
  grupo: 'main subjects are a small group of residents in a meeting or common area',
  seguranca: 'main subject is a security guard',
  zelador: 'main subject is a building caretaker (zelador)',
  'sem-pessoas': 'no people visible, empty environment or architecture only',
}

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, description, styles, subjects, pillar } = await req.json()

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

    const subjectDescriptions = ((subjects || []) as string[])
      .map((s) => subjectGuide[s] || s)
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
      subjectDescriptions ? `QUEM DEVE APARECER NA CENA: ${subjectDescriptions}` : '',
      pillar && pillarLabel[pillar] ? `PILAR FOTOGRAFICO: ${pillarLabel[pillar]}` : '',
      'Preserve a cena/composicao/assunto principal da imagem de referencia, mas aplique a paleta, iluminacao e linguagem visual da marca.',
      'Lembre-se: fotorrealismo e prioridade maxima, o resultado nao pode parecer ilustracao, render 3D ou imagem gerada por IA.',
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

    const promptFinal = `${prompt} ${REALISM_SUFFIX_EN}`

    return NextResponse.json({ prompt: promptFinal })
  } catch (error) {
    console.error('generate-photo-prompt-from-image error:', error)
    return NextResponse.json({ error: 'Erro ao gerar prompt a partir da imagem' }, { status: 500 })
  }
}
