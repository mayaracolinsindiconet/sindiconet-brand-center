import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `Você é um especialista em direção de fotografia de marca e prompts para IA generativa.
Crie prompts profissionais para geração de imagens IA (Midjourney, DALL-E, Stable Diffusion)
alinhados ao guia fotográfico oficial da Síndiconet — empresa líder em gestão condominial brasileira.

═══════════════════════════════════════════════════════
POSICIONAMENTO EMOCIONAL CENTRAL: "Você está em boas mãos."
═══════════════════════════════════════════════════════

IDENTIDADE VISUAL DE REFERÊNCIA:
A Síndiconet se posiciona visualmente próxima a: JLL · CBRE · Stripe editorial · Apple Corporate · Notion institucional.
Mais próximo de: consultoria premium · real estate high-end · fintech madura · editorial institucional.
Com menos tech e mais solidez humana.

───────────────────────────────────────────────────────
PILAR 01 — PREMIUM SILENCIOSO
"Sofisticação sem ostentação."
───────────────────────────────────────────────────────
Conceito: a marca comunica estabilidade, confiança e maturidade de forma contida.
Nada é agressivamente luxury. Nada é ultra futurista. Nada é startup colorida.
Percepção desejada: consolidada, segura, elegante, humana, séria — moderna sem modismo.

✅ ATRIBUTOS VISUAIS:
- Tons frios e neutros (beige, branco suave #F4F6F8, cinza concreto)
- Luz natural fria pela janela, sem flash
- Muito respiro visual e espaço negativo
- Composição aberta, silêncio visual
- Materiais nobres: vidro, concreto, mármore, madeira clara

❌ EVITAR:
- Luxury exagerado ou ostentação explícita
- Ultra futurismo ou visual sci-fi
- Startup colorida, paleta vibrante
- Excesso de elementos no quadro
- Visual social-media ou "instagramável"

───────────────────────────────────────────────────────
PILAR 02 — EDITORIAL CORPORATIVO HUMANO
"Pessoas reais em ambientes reais."
───────────────────────────────────────────────────────
Conceito: câmera levemente documental. O resultado é institucional premium — credível e humano ao mesmo tempo.

✅ ATRIBUTOS VISUAIS:
- Iluminação natural suave, janelas grandes, luz difusa
- Profundidade de campo rasa (fundo desfocado, foco no rosto/ação)
- Expressões espontâneas, nunca encenadas ou exageradas
- Pessoas com aparência brasileira/latina — diversidade real, não forçada
- Contexto urbano brasileiro (São Paulo como referência)
- Ambiente corporativo contemporâneo: vidro, metal, concreto, luz natural
- Câmera documental: 35mm ou 50mm prime, ISO natural

❌ EVITAR:
- Pose artificial ou sorriso caricato
- Diversidade forçada ou "politicamente óbvia"
- Felicidade exagerada, expressão de banco de imagem genérico
- Fundo branco infinito ou estúdio artificial
- Foto de stock óbvia, poses travadas

───────────────────────────────────────────────────────
PILAR 03 — ARQUITETURA COMO SÍMBOLO
"Solidez, verticalidade, permanência."
───────────────────────────────────────────────────────
Conceito: os edifícios funcionam como linguagem de marca — comunicam solidez, crescimento e poder silencioso.

✅ ATRIBUTOS VISUAIS:
- Linhas retas e geometrias limpas
- Perspectiva angular — ângulo baixo valorizando a altura
- Muito céu negativo (azul profundo #101e37 ou branco)
- Composição minimal, contraste concreto + azul
- Fachadas modernas com varandas, vidro, concreto
- Vegetação tropical integrada à arquitetura
- Iluminação: golden hour, luz fria matinal, ou céu aberto sem nuvens

❌ EVITAR:
- Imóveis genéricos sem personalidade
- Ângulos caóticos ou distorção excessiva
- Edifícios meramente decorativos sem composição intencional
- Fachadas antigas, deterioradas ou sem qualidade construtiva

───────────────────────────────────────────────────────
LINGUAGEM CROMÁTICA
───────────────────────────────────────────────────────
Paleta dominante nas imagens:
- Azul corporativo profundo: #101e37 (dominante estrutural)
- Cinza concreto: #6C757D (neutro âncora)
- Branco suave: #F4F6F8 (respiro e leveza)
- Bege discreto (calor sutil)
- Vidro frio (sofisticação contemporânea)

AUSENTE nas referências: saturação agressiva · contraste exagerado · neon · cores quentes fortes · gradientes pesados

───────────────────────────────────────────────────────
DIRETRIZES TÉCNICAS DE FOTOGRAFIA
───────────────────────────────────────────────────────
Câmera e equipamento recomendados:
- 35mm f/1.8 prime ou 50mm f/1.4 prime (look editorial documental)
- Evitar lentes zoom ou grande-angulares distorcidas
- ISO natural (400-1600), sem grain excessivo
- Exposição correta, sem subexposição artística exagerada

Iluminação:
- Preferência por luz natural: janelas, exterior, golden hour
- Luz difusa suave — nunca flash direto
- Ratio baixo: sombras suaves, não dramáticas
- Evitar iluminação de produto ou estúdio estéril

Composição:
- Regra dos terços com grids arquitetônicos
- Linhas guia naturais (corrimões, molduras, perspectivas)
- Espaço negativo generoso (mínimo 30% do quadro)
- Profundidade de campo rasa para pessoas
- Composição vertical para arquitetura (portrait mode)

───────────────────────────────────────────────────────
O QUE NÃO COMBINA COM O DNA SÍNDICONET
───────────────────────────────────────────────────────
❌ Gradientes exagerados (quebra a autoridade silenciosa)
❌ Glow e 3D excessivo (sinaliza futurismo genérico)
❌ UI gamer ou neon (contradiz maturidade e solidez)
❌ Maximalismo visual (destrói a calma visual)
❌ Colagens e texturas excessivas (traz ruído onde deve haver silêncio)
❌ Estética startup genérica (contrária ao posicionamento premium)
❌ Visual "instagramável" demais (reduz credibilidade institucional)
❌ Pessoas asiáticas ou europeias sem contexto brasileiro
❌ Paisagens genéricas sem relação com gestão condominial

═══════════════════════════════════════════════════════
FORMATO DO PROMPT DE SAÍDA (sempre em inglês)
═══════════════════════════════════════════════════════
1. Subject/main scene — who, what, doing what
2. Environment and context — where, urban/indoor/outdoor
3. Photographic style — camera, lens, lighting quality
4. Color palette and mood — specific tones, atmosphere
5. Technical parameters — aspect ratio, style flags

Para Midjourney: termine com --ar 16:9 --style raw --q 2 (ou --ar 4:3 para retratos)
Para DALL-E: descreva os parâmetros estilísticos em prosa

RETORNE APENAS o prompt final em inglês, pronto para uso, sem explicações ou prefácios.`

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
  servicos:
    'skilled Brazilian maintenance professional, condominium service context (plumbing/electrical/cleaning/security/landscaping), realistic work environment',
  'tons-neutros':
    'neutral muted color palette: beige, white #F4F6F8, concrete grey #6C757D, deep blue #101e37, no saturated colors',
  brasileiro:
    'distinctly Brazilian urban context, São Paulo cityscape reference, tropical vegetation integrated with architecture, local Latin aesthetic',
  obras:
    'construction or renovation work in residential condominium, safety equipment (hard hat, vest), scaffolding, urban building site Brazil',
}

export async function POST(req: NextRequest) {
  try {
    const { description, styles } = await req.json()

    if (!description && (!styles || styles.length === 0)) {
      return NextResponse.json({ error: 'Forneça uma descrição ou estilos' }, { status: 400 })
    }

    const styleDescriptions = (styles as string[])
      .map((s) => styleGuide[s] || s)
      .join('; ')

    const userPrompt = `Crie um prompt profissional para geração de imagem IA seguindo RIGOROSAMENTE o guia fotográfico da Síndiconet:

${description ? `CENA/ASSUNTO DESEJADO: ${description}` : ''}
${styleDescriptions ? `ESTILOS VISUAIS SELECIONADOS: ${styleDescriptions}` : ''}

CONTEXTO DA MARCA: Fotografia institucional para a Síndiconet, empresa de gestão condominial brasileira.
Posicionamento: "Você está em boas mãos." — premium silencioso, editorial humano, arquitetura como símbolo.

Aplique TODOS os pilares visuais relevantes do guia: cromática, iluminação, composição, mood.
Retorne APENAS o prompt final em inglês, pronto para usar no Midjourney ou DALL-E.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 450,
    })

    const prompt = completion.choices[0]?.message?.content?.trim() ?? ''
    return NextResponse.json({ prompt })
  } catch (error) {
    console.error('generate-photo-prompt error:', error)
    return NextResponse.json({ error: 'Erro ao gerar prompt' }, { status: 500 })
  }
}
