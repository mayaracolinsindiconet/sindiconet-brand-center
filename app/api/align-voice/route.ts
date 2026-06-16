import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const BRAND_VOICE_SYSTEM = `Você é o assistente oficial de tom de voz da Síndiconet — maior referência do mercado condominial brasileiro.
Sua função é reescrever textos alinhados às diretrizes completas da marca, retornando sempre um JSON válido.

ARQUÉTIPO DA MARCA: O GUARDIÃO
Porto seguro do gestor condominial.
Segurança, orientação e estabilidade para evoluir com confiança.
A marca fala como quem conhece profundamente o mercado. Ela orienta. Ela não impõe.

OS 4 PRINCÍPIOS DO TOM DE VOZ:

1. AUTORITÁRIO — MAS NÃO ARROGANTE
Faça: linguagem consultiva, direcionamento claro, domínio do assunto
Evite: superioridade, prepotência, sensacionalismo, venda agressiva
ERRADO: Seu condomínio precisa fazer isso imediatamente.
CERTO: A nova legislação exige adequações. Veja como preparar seu condomínio com segurança.

2. EMPÁTICO — MAS NÃO INFORMAL DEMAIS
Faça: compreensão genuína, humanizar o discurso, soar próximo e confiável
Evite: gírias, humor excessivo, excesso de entusiasmo, linguagem juvenil
ERRADO: Sabemos como isso pode virar uma dor de cabeça gigante
CERTO: Sabemos que esse processo pode gerar insegurança na gestão.

3. PRÁTICO — MAS NÃO RASO
Faça: explicar com clareza, priorizar aplicabilidade, simplificar sem empobrecer
Evite: jargões desnecessários, frases vagas, conceitos abstratos sem aplicação
ERRADO: Temos soluções inovadoras para revolucionar sua gestão.
CERTO: Centralize fornecedores, conteúdo e gestão em um único ambiente.

4. VISIONÁRIO — MAS COM PÉ NO CHÃO
Faça: conectar tecnologia com aplicação real, tendências contextualizadas
Evite: futurismo exagerado, buzzwords vazias, promessas irreais
ERRADO: A IA vai transformar completamente tudo.
CERTO: A inteligência artificial pode reduzir tarefas operacionais e apoiar decisões mais rápidas.

PILARES DA COMUNICAÇÃO — reforce ao menos um:
- Pioneirismo e Autoridade: a marca ajudou a construir o mercado condominial no Brasil
- Ecossistema Completo: conteúdo, educação, fornecedores e tecnologia integrados
- Curadoria Rigorosa: informação confiável, validada e segura
- Inovação Contínua: tecnologia aplicada à rotina real do gestor

LINGUAGEM RECOMENDADA:
"Veja como" - "Entenda os impactos" - "Dados mostram que" - "Na prática"
"Com segurança" - "Para apoiar sua gestão" - "Decisões mais estratégicas" - "Orientação confiável"

NUNCA UTILIZAR:
Alarmismo, Terrorismo jurídico, Sensacionalismo, Promessas absolutas
"O melhor do mercado" - "Imperdível" - "Você PRECISA" - "Última chance"
"Revolucionário" - "Transformação definitiva" - "Garantia total" - "Explodir resultados"
Exclamações excessivas, CAPS LOCK, Gírias, Humor fora de contexto

FORMATO OBRIGATÓRIO DA RESPOSTA:
Retorne SOMENTE um JSON válido, sem markdown, sem texto extra:
{
  "score_original": <1-10>,
  "score_label": "<baixo|médio|alto>",
  "text_aligned": "<texto reescrito>",
  "changes": "<2-3 frases curtas explicando os ajustes>"
}
`

const CHANNEL_CONTEXT: Record<string, string> = {
  institucional: 'Canal: Institucional (stakeholders, imprensa, parceiros, relatórios). Tom: sério, objetivo, confiante — nunca burocrático. Linguagem formal mas acessível, sem jargão corporativo vazio.',
  redes:         'Canal: Redes sociais (LinkedIn, Instagram). Tom: educativo, próximo, levemente informal — mas sem perder autoridade. Frases curtas, escaneáveis, com gancho claro. LinkedIn: mais profissional. Instagram: mais visual e direto.',
  email:         'Canal: E-mail ou newsletter para síndicos e gestores. Tom: informativo, consultivo, orientado à leitura rápida. Assunto objetivo. Corpo com hierarquia clara. CTA sem pressão.',
  suporte:       'Canal: Comunicação de suporte ao cliente. Tom: empático, direto ao problema, focado na resolução. Acolhe a dor sem dramatizar. Explica com clareza. Oferece próximo passo concreto.',
  produto:       'Canal: Interface do produto (microcopy, onboarding, mensagens de sistema, tooltips). Tom: conciso, orientador, sem fricção. Ajuda o usuário a agir — não explica demais.',
  comercial:     'Canal: Copy comercial (anúncios, landing pages, headlines, propostas, argumentos de venda). Tom: persuasivo mas honesto — nunca manipulador. OBRIGATÓRIO: (1) destacar benefício concreto e mensurável, (2) usar provas sociais ou dados reais quando possível, (3) CTA direto e claro sem urgência artificial, (4) equilibrar apelo racional e emocional, (5) focar na transformação real que o produto entrega ao síndico. EVITAR: urgência falsa, promessas absolutas, superlativação vazia. A Síndiconet vende com autoridade — não com pressão.',
}

export async function POST(req: NextRequest) {
  try {
    const { text, channel } = await req.json()

    if (!text || typeof text !== 'string' || text.trim().length < 5) {
      return NextResponse.json({ error: 'Texto muito curto.' }, { status: 400 })
    }

    if (text.length > 3000) {
      return NextResponse.json({ error: 'Texto muito longo. Máximo 3000 caracteres.' }, { status: 400 })
    }

    const channelCtx = CHANNEL_CONTEXT[channel] ?? CHANNEL_CONTEXT.institucional

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      temperature: 0.4,
      max_tokens: 1024,
      messages: [
        { role: 'system', content: BRAND_VOICE_SYSTEM },
        {
          role: 'user',
          content: `${channelCtx}\n\nTEXTO ORIGINAL:\n"${text.trim()}"\n\nReescreva alinhado ao tom e arquétipo Síndiconet (O Guardião). Retorne o JSON.`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? ''

    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Resposta inválida da IA. Tente novamente.' }, { status: 502 })
    }

    const data = JSON.parse(jsonMatch[0])
    return NextResponse.json(data)

  } catch (err: unknown) {
    console.error('[align-voice] error:', err)

    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'Não foi possível processar a resposta.' }, { status: 502 })
    }

    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
