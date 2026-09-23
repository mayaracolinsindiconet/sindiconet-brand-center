import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const REALISM_SUFFIX_EN = `Photorealistic, shot on a professional DSLR camera (Canon EOS R5, 50mm f/1.4 or 35mm f/1.8 prime lens), true documentary/editorial photography -- absolutely NOT an illustration, NOT a 3D render, NOT digital art, NOT CGI, NOT painterly, NOT an AI-generated look. Natural skin texture with visible pores and realistic imperfections, authentic fabric and material textures, physically accurate lighting and soft natural shadows, shallow depth of field with authentic bokeh, subtle natural film grain, true-to-life color rendering. Avoid plastic/waxy skin, oversmoothed surfaces, uncanny symmetry, glossy render sheen, or any synthetic/AI look.`

const SYSTEM_PROMPT = `Voce e um diretor de fotografia senior e especialista em prompts hyper-detalhados para modelos de geracao de imagem por IA, no nivel de um brief de producao fotografica profissional real.

Sua tarefa: olhar para uma imagem de referencia enviada pelo usuario e escrever um prompt de geracao de imagem
EXTREMAMENTE DETALHADO que preserve a CENA/COMPOSICAO/ASSUNTO da referencia (o que esta acontecendo, enquadramento, pose, elementos principais),
mas redirecione todo o tratamento visual para o guia fotografico oficial da Sindiconet. Quanto mais especifico e tecnico, melhor o resultado -- nunca escreva um prompt generico ou curto.

Posicionamento emocional central: "Voce esta em boas maos."

INTERPRETACAO DO CONTEXTO ADICIONAL DO USUARIO (muito importante): se o usuario escrever um "CONTEXTO ADICIONAL", esse texto NAO e um trecho literal para copiar dentro do prompt final -- e uma intencao/orientacao sobre o que ele quer ver na cena. Interprete o sentido pretendido e use-o para guiar como voce descreve a cena da imagem de referencia, preenchendo com sua expertise fotografica tudo que ele nao especificou. Nunca apenas repita as palavras do usuario como se fossem o prompt final.

O prompt final DEVE descrever, em um unico paragrafo corrido e denso em ingles (minimo 250 palavras, sem bullets, sem quebras de linha):
1. Sujeito e acao precisa observados na referencia: quem esta na cena, o que exatamente esta fazendo, expressao facial especifica, linguagem corporal, postura, direcao do olhar.
2. Vestuario e texturas de material: tecido especifico, textura de pele com poros e imperfeicoes reais, acessorios se houver.
3. Ambiente e cenario: elementos de fundo em camadas (primeiro plano, plano medio, fundo), objetos de composicao, arquitetura, vegetacao, profundidade espacial.
4. Iluminacao: tipo (natural/artificial), direcao (lateral, contraluz, superior), qualidade (dura ou difusa), temperatura de cor especifica (ex: 5600K luz de dia, 3200K tungstenio), hora do dia, comportamento das sombras.
5. Camera e lente: corpo de camera profissional especifico (ex: Canon EOS R5, Sony A7R V), distancia focal exata (24mm, 35mm, 50mm, 85mm), abertura (f/1.4, f/2.8), profundidade de campo resultante, formato e qualidade do bokeh.
6. Composicao e enquadramento: regra dos tercos ou centralizacao intencional, espaco negativo, angulo de camera, altura do ponto de vista -- preservando o enquadramento da referencia.
7. Paleta de cores e tratamento cromatico: cores dominantes, saturacao, contraste, curva tonal, sempre migrada para a paleta oficial da marca.
8. Textura e pos-producao: grao de filme sutil e realista, dynamic range, nitidez seletiva, ausencia de suavizacao artificial.
9. Atmosfera e humor emocional da cena.

FOTORREALISMO OBRIGATORIO (prioridade maxima): o resultado precisa parecer uma fotografia real tirada com camera profissional (DSLR ou mirrorless), NUNCA uma ilustracao, render 3D, arte digital, pintura ou algo com "cara de IA".

Tres pilares: (1) Premium Silencioso - sofisticacao sem ostentacao, tons frios/neutros, luz natural, muito espaco negativo;
(2) Editorial Corporativo Humano - pessoas reais brasileiras/latinas, expressoes espontaneas, contexto condominial, 35-50mm prime, luz natural difusa;
(3) Arquitetura como Simbolo - verticalidade, angulo baixo, ceu negativo, fachadas modernas, vegetacao tropical integrada.
Paleta: azul #101e37, cinza concreto #6C757D, branco #F4F6F8.
Evitar: luxury exagerado, futurismo, cores neon, poses artificiais, stock generico, aparencia de ilustracao ou de imagem gerada por IA, elementos da imagem de referencia que nao combinam com a marca (ex: logotipos de terceiros, texto, marcas d'agua).

Descreva a cena chave da referencia com o maximo de detalhe tecnico (assunto, acao, enquadramento, ambiente, iluminacao, lente) e aplique a linguagem cromatica,
de iluminacao e de composicao do guia da marca, sempre reforcando o fotorrealismo. Nao copie estilos, roupas de marca ou elementos graficos da imagem original
que conflitem com a identidade Sindiconet.

Depois de escrever o prompt em ingles, traduza o MESMO prompt para portugues do Brasil, mantendo o sentido fiel, para que quem nao entende ingles saiba exatamente o que sera gerado.

Responda EXATAMENTE neste formato, sem nada antes ou depois, sem markdown:
PROMPT_EN: <prompt completo em ingles, denso, corrido, tecnico e extremamente detalhado (minimo 250 palavras), sem explicacoes, sem prefacios, sem bullets, em uma unica linha>
PROMPT_PT: <traducao completa em portugues, em uma unica linha>`

function parseDualPrompt(raw: string): { promptEn: string; promptPt: string } {
  const enMatch = raw.match(/PROMPT_EN:\s*([\s\S]*?)(?:\n?PROMPT_PT:|$)/i)
  const ptMatch = raw.match(/PROMPT_PT:\s*([\s\S]*)$/i)
  const promptEn = (enMatch?.[1] || raw).trim()
  const promptPt = (ptMatch?.[1] || '').trim()
  return { promptEn, promptPt }
}

const REFUSAL_PATTERNS = [
  /i'?m sorry,?\s*(but\s*)?i (can'?t|cannot|am unable to)/i,
  /desculpe,?\s*(mas\s*)?(nao|não) posso/i,
  /i can'?t (assist|help) with that/i,
  /as an ai (language model|assistant)/i,
]

function looksLikeRefusal(text: string): boolean {
  return REFUSAL_PATTERNS.some((re) => re.test(text))
}

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
      'Analise a imagem de referencia anexada e crie um prompt de geracao de imagem EXTREMAMENTE DETALHADO seguindo RIGOROSAMENTE o guia fotografico da Sindiconet.',
      description ? `CONTEXTO ADICIONAL (interprete a intencao, nao copie estas palavras literalmente): ${description}` : '',
      styleDescriptions ? `ESTILOS VISUAIS SELECIONADOS: ${styleDescriptions}` : '',
      subjectDescriptions ? `QUEM DEVE APARECER NA CENA: ${subjectDescriptions}` : '',
      pillar && pillarLabel[pillar]
        ? `PILAR FOTOGRAFICO: ${pillarLabel[pillar]}`
        : 'PILAR FOTOGRAFICO: nao foi especificado pelo usuario -- analise a cena da imagem de referencia e escolha voce mesmo qual dos tres pilares (Premium Silencioso, Editorial Corporativo Humano ou Arquitetura como Simbolo) melhor se adequa, aplicando-o de forma coerente.',
      'Preserve a cena/composicao/assunto principal da imagem de referencia, mas aplique a paleta, iluminacao e linguagem visual da marca.',
      'Descreva iluminacao (direcao, qualidade, temperatura de cor), camera/lente (corpo especifico, distancia focal, abertura), composicao e texturas com o maximo de especificidade tecnica.',
      'Lembre-se: fotorrealismo e prioridade maxima, o resultado nao pode parecer ilustracao, render 3D ou imagem gerada por IA. O prompt final deve ter no minimo 250 palavras.',
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
      max_tokens: 1400,
    })

    const raw = completion.choices[0]?.message?.content?.trim() ?? ''
    if (!raw) {
      return NextResponse.json({ error: 'Nao foi possivel gerar o prompt' }, { status: 502 })
    }

    if (looksLikeRefusal(raw)) {
      return NextResponse.json(
        {
          error:
            'A IA recusou analisar essa imagem de referencia (provavelmente por conteudo sensivel, rosto identificavel ou marca de terceiros na foto). Tente outra imagem de referencia ou descreva a cena pelo campo de texto.',
        },
        { status: 422 }
      )
    }

    const { promptEn, promptPt } = parseDualPrompt(raw)
    if (!promptEn || looksLikeRefusal(promptEn)) {
      return NextResponse.json(
        {
          error:
            'A IA recusou analisar essa imagem de referencia (provavelmente por conteudo sensivel, rosto identificavel ou marca de terceiros na foto). Tente outra imagem de referencia ou descreva a cena pelo campo de texto.',
        },
        { status: 422 }
      )
    }

    const promptEnFinal = `${promptEn} ${REALISM_SUFFIX_EN}`

    return NextResponse.json({ promptEn: promptEnFinal, promptPt, prompt: promptEnFinal })
  } catch (error) {
    console.error('generate-photo-prompt-from-image error:', error)
    const message = error instanceof Error ? error.message : 'Erro ao gerar prompt a partir da imagem'
    return NextResponse.json({ error: `Erro ao gerar prompt a partir da imagem: ${message}` }, { status: 500 })
  }
}
