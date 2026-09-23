import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const REALISM_SUFFIX_EN = `Photorealistic, shot on a professional DSLR camera (Canon EOS R5, 50mm f/1.4 or 35mm f/1.8 prime lens), true documentary/editorial photography -- absolutely NOT an illustration, NOT a 3D render, NOT digital art, NOT CGI, NOT painterly, NOT an AI-generated look. Natural skin texture with visible pores and realistic imperfections, authentic fabric and material textures, physically accurate lighting and soft natural shadows, shallow depth of field with authentic bokeh, subtle natural film grain, true-to-life color rendering. Avoid plastic/waxy skin, oversmoothed surfaces, uncanny symmetry, glossy render sheen, or any synthetic/AI look.`

const REALISM_SUFFIX_PT = ` Foto hiper-realista, como capturada por uma camera profissional (DSLR), com textura de pele natural, iluminacao fisicamente realista e profundidade de campo autentica -- sem aparencia de ilustracao, render 3D ou IA.`

const SYSTEM_PROMPT = `Voce e um especialista em direcao de fotografia de marca e prompts para IA generativa.
Crie prompts profissionais para geracao de imagens IA alinhados ao guia fotografico oficial da Sindiconet.

POSICIONAMENTO EMOCIONAL CENTRAL: "Voce esta em boas maos."

INTERPRETACAO DA DESCRICAO DO USUARIO (muito importante): o texto que o usuario escreve em "CENA/ASSUNTO DESEJADO" NAO e um trecho literal para copiar dentro do prompt final -- e um CONTEXTO/INTENCAO que descreve o que deve acontecer na cena. Sua tarefa e interpretar essa intencao e traduzi-la em uma cena fotografica completa e tecnica, preenchendo com sua expertise tudo que a descricao do usuario nao especificou: iluminacao, lente e camera, composicao, texturas, paleta, atmosfera. Nunca devolva o prompt apenas reformulando ou encurtando as palavras do usuario -- expanda-as com a linguagem fotografica completa exigida neste guia. Se a descricao usar termos coloquiais, giria ou abreviacoes, entenda o sentido pretendido e descreva a cena real correspondente, nunca as palavras em si.

FOTORREALISMO OBRIGATORIO (prioridade maxima): o resultado precisa parecer uma fotografia real tirada com camera profissional (DSLR ou mirrorless), NUNCA uma ilustracao, render 3D, arte digital, pintura ou algo com "cara de IA". Descreva sempre: textura de pele natural com poros e imperfeicoes reais, texturas realistas de tecido e materiais, fisica de luz e sombra precisa, profundidade de campo rasa com bokeh autentico, grao de filme sutil. Evite pele plastica/cerosa, superficies excessivamente suavizadas, simetria artificial perfeita, brilho de render 3D ou qualquer aparencia sintetica/gerada por IA.

PILAR 01 - PREMIUM SILENCIOSO: sofisticacao sem ostentacao. Tons frios e neutros (bege, branco #F4F6F8, cinza concreto), luz natural fria, muito espaco negativo, materiais nobres (vidro, concreto, madeira clara). Evitar luxury exagerado, futurismo, cores vibrantes, excesso de elementos.

PILAR 02 - EDITORIAL CORPORATIVO HUMANO: pessoas reais em ambientes reais, camera levemente documental. Iluminacao natural suave, profundidade de campo rasa, expressoes espontaneas, pessoas com aparencia brasileira/latina, contexto urbano brasileiro, 35-50mm prime. Evitar pose artificial, diversidade forcada, stock photo generico.

PILAR 03 - ARQUITETURA COMO SIMBOLO: solidez, verticalidade, permanencia. Linhas retas, angulo baixo, muito ceu negativo (azul #101e37 ou branco), fachadas modernas, vegetacao tropical integrada. Evitar predios genericos, angulos caoticos, fachadas deterioradas.

PILAR ESPECIAL - OBRA / REFORMA / MANUTENCAO PREDIAL: quando a cena envolver obra, reforma, construcao, canteiro de obras ou manutencao predial, as regras de minimalismo dos pilares 01-03 (muito espaco negativo, "sem excesso de elementos") NAO se aplicam -- nesse caso o realismo do canteiro e que manda. Descreva o ambiente de obra de forma honesta e detalhada: andaimes, ferramentas e materiais de construcao organizados, EPIs visiveis e corretos (capacete, colete de sinalizacao, luvas, oculos de protecao), poeira sutil no ar, luz de trabalho (natural ou de canteiro), texturas de concreto/reboco/tijolo a vista. Mantenha o profissionalismo institucional evitando apenas: bagunca desorganizada, aparencia de abandono/depredacao, sujeira excessiva ou risco de seguranca evidente (sem EPI). A paleta de cores continua ancorada nos tons da marca sempre que possivel (concreto, bege, azul), mas cores de seguranca (laranja/amarelo dos EPIs e sinalizacao) sao esperadas e nao devem ser removidas.

PALETA: azul corporativo profundo #101e37, cinza concreto #6C757D, branco suave #F4F6F8, bege discreto. Ausente: saturacao agressiva, neon, gradientes pesados. (Excecao: cores de seguranca/EPI em cenas de obra, ver PILAR ESPECIAL acima.)

DIRETRIZES TECNICAS: 35mm f/1.8 ou 50mm f/1.4 prime, ISO natural, luz natural difusa (nunca flash direto), regra dos tercos, espaco negativo generoso, profundidade de campo rasa para pessoas. (Em cenas de obra, o enquadramento pode ser mais denso e documental, priorizando mostrar o trabalho sendo executado.)

EVITAR SEMPRE: gradientes exagerados, glow e 3D excessivo, UI gamer ou neon, maximalismo visual, estetica startup generica, visual instagramavel demais, pessoas sem contexto brasileiro, paisagens genericas, aparencia de ilustracao ou de imagem gerada por IA.

IMPORTANTE: este prompt sera usado DIRETAMENTE em uma API de geracao de imagem (gpt-image-1), entao NAO inclua flags de Midjourney como --ar, --style raw ou --q. Escreva em prosa corrida cobrindo: assunto/cena principal, ambiente e contexto, estilo fotografico (camera, lente, luz), paleta de cores e mood, sempre reforcando o fotorrealismo.

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
  obras: 'active construction, renovation or building maintenance site inside or around a residential condominium, workers wearing correct safety equipment (hard hat, high-visibility vest, gloves, safety glasses), scaffolding, organized construction materials and tools (cement, bricks, rebar, wheelbarrows), realistic dust in the air, exposed concrete/plaster/brick textures, natural or worksite lighting, honest documentary framing of the work in progress -- not sanitized, not empty, not minimalist',
}

const OBRA_KEYWORDS = /\b(obras?|reforma[s]?|constru[cç][aã]o|canteiro|andaime|pedreiro|mestre de obras)\b/i

function mentionsConstruction(description: string, styles: string[]): boolean {
  return styles.includes('obras') || OBRA_KEYWORDS.test(description || '')
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

const formatLabel: Record<string, string> = {
  quadrado: 'formato quadrado (proporcao 1:1)',
  retrato: 'formato retrato vertical (proporcao 2:3)',
  paisagem: 'formato paisagem horizontal (proporcao 3:2)',
}

const pillarLabel: Record<string, string> = {
  'premium-silencioso': 'PILAR 01 - Premium Silencioso',
  'editorial-humano': 'PILAR 02 - Editorial Corporativo Humano',
  'arquitetura-simbolo': 'PILAR 03 - Arquitetura como Simbolo',
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
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'IA de geracao de prompt nao configurada (GROQ_API_KEY ausente no servidor)' },
        { status: 500 }
      )
    }

    const { description, styles, subjects, pillar, format } = await req.json()

    if (!description && (!styles || styles.length === 0) && (!subjects || subjects.length === 0)) {
      return NextResponse.json({ error: 'Forneca uma descricao, estilos ou quem aparece na cena' }, { status: 400 })
    }

    const styleDescriptions = ((styles || []) as string[])
      .map((s) => styleGuide[s] || s)
      .join('; ')

    const subjectDescriptions = ((subjects || []) as string[])
      .map((s) => subjectGuide[s] || s)
      .join('; ')

    const isConstruction = mentionsConstruction(description || '', (styles || []) as string[])
    const isAutoPillar = !pillar || pillar === 'auto'

    const userPrompt = `Crie um prompt profissional para geracao de imagem IA seguindo RIGOROSAMENTE o guia fotografico da Sindiconet:

${description ? `CONTEXTO/INTENCAO DA CENA (interprete o que isso significa e transforme em uma cena fotografica completa -- NAO copie estas palavras literalmente no prompt final): ${description}` : ''}
${styleDescriptions ? `ESTILOS VISUAIS SELECIONADOS: ${styleDescriptions}` : ''}
${subjectDescriptions ? `QUEM APARECE NA CENA: ${subjectDescriptions}` : ''}
${!isAutoPillar ? `PILAR FOTOGRAFICO PRINCIPAL: ${pillarLabel[pillar] || pillar}` : 'PILAR FOTOGRAFICO: nao foi especificado pelo usuario -- analise a cena descrita e escolha voce mesmo, com seu julgamento de diretor de fotografia, qual dos pilares (01 Premium Silencioso, 02 Editorial Corporativo Humano ou 03 Arquitetura como Simbolo -- ou o PILAR ESPECIAL de obra/reforma quando aplicavel) melhor se adequa a esta cena, e aplique-o de forma coerente e integral.'}
${format ? `FORMATO DE ENQUADRAMENTO: ${formatLabel[format] || format}` : ''}
${isConstruction ? '\nATENCAO: esta cena e de obra/reforma/manutencao predial -- aplique o PILAR ESPECIAL - OBRA / REFORMA / MANUTENCAO PREDIAL do guia (ignore o "muito espaco negativo" e o "sem excesso de elementos" dos pilares 01-03 neste caso especifico, mas mantenha o fotorrealismo e o profissionalismo institucional).' : ''}

Aplique os pilares visuais relevantes do guia: cromatica, iluminacao, composicao, mood.
Lembre-se: fotorrealismo e prioridade maxima, o resultado nao pode parecer ilustracao, render 3D ou imagem gerada por IA.
Siga o formato de resposta exigido (PROMPT_EN / PROMPT_PT).`

    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1400,
      // gpt-oss e um modelo de raciocinio: sem isso ele gasta os tokens
      // "pensando" antes de escrever PROMPT_EN/PROMPT_PT, cortando a resposta.
      reasoning_effort: 'low',
    } as any)

    const raw = completion.choices[0]?.message?.content?.trim() ?? ''
    const { promptEn, promptPt } = parseDualPrompt(raw)

    const promptEnFinal = promptEn ? `${promptEn} ${REALISM_SUFFIX_EN}` : REALISM_SUFFIX_EN
    const promptPtFinal = promptPt ? `${promptPt}${REALISM_SUFFIX_PT}` : promptPt

    return NextResponse.json({ promptEn: promptEnFinal, promptPt: promptPtFinal, prompt: promptEnFinal })
  } catch (error) {
    console.error('generate-photo-prompt error:', error)
    const message = error instanceof Error ? error.message : 'Erro ao gerar prompt'
    return NextResponse.json({ error: `Erro ao gerar prompt: ${message}` }, { status: 500 })
  }
}
