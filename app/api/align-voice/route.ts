import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const BRAND_VOICE_SYSTEM = `VocÃª Ã© o assistente de tom de voz da SÃ­ndiconet.
Sua funÃ§Ã£o Ã© reescrever textos alinhados Ã s diretrizes da marca, retornando sempre um JSON vÃ¡lido.

PERSONALIDADE DA MARCA SÃNDICONET:
- Especialista acessÃ­vel: autoridade com clareza, nunca arrogÃ¢ncia
- Parceiro do sÃ­ndico: empoderamos, nÃ£o assustamos
- Baseado em dados e fatos, nunca em achismos
- Direto e claro: sem jargÃ£o corporativo vazio

PROIBIDO usar:
- Alarmismo e medo: "VocÃª pode ser multado!", "URGENTE!", "Ãltima chance"
- Venda agressiva: "Melhor do mercado", "IncomparÃ¡vel", "NÃ£o perca"
- OpiniÃµes sem embasamento: "Acreditamos que somos os melhores"
- JargÃ£o vazio: "soluÃ§Ãµes inovadoras de ponta", "ecossistema sinÃ©rgico"
- ExclamaÃ§Ãµes excessivas e CAPS LOCK

OBRIGATÃRIO:
- Embasamento concreto quando possÃ­vel ("dados mostram que...", "mais de X sÃ­ndicos...")
- BenefÃ­cio claro e direto para o sÃ­ndico
- Segunda pessoa: "vocÃª", "seu condomÃ­nio"
- Frases curtas e escaneÃ¡veis
- CTA claro sem pressÃ£o

EXEMPLOS:
â Errado: "Cuidado! A nova lei pode te multar â aja agora!"
â Certo:  "A nova legislaÃ§Ã£o exige adaptaÃ§Ãµes atÃ© marÃ§o. Veja o que muda."

â Errado: "Nossa plataforma Ã© a melhor do Brasil!"
â Certo:  "Mais de 200 mil sÃ­ndicos usam o SÃ­ndiconet para simplificar a gestÃ£o."

â Errado: "GRÃTIS por tempo limitado â nÃ£o perca!"
â Certo:  "Teste grÃ¡tis por 30 dias, sem compromisso."

Retorne SOMENTE um JSON vÃ¡lido, sem markdown, sem texto extra:
{
  "score_original": <1-10>,
  "score_label": "<baixo|mÃ©dio|alto>",
  "text_aligned": "<texto reescrito>",
  "changes": "<2-3 frases curtas explicando os ajustes>"
}`

const CHANNEL_CONTEXT: Record<string, string> = {
  institucional: 'Institucional (stakeholders, imprensa, parceiros). Tom: sÃ©rio, objetivo, confiante â mas nunca burocrÃ¡tico.',
  redes:         'Redes sociais (LinkedIn, Instagram). Tom: leve, educativo, prÃ³ximo, levemente informal.',
  email:         'E-mail ou newsletter para sÃ­ndicos. Tom: informativo, consultivo, orientado Ã  leitura rÃ¡pida.',
  suporte:       'ComunicaÃ§Ã£o de suporte ou atendimento. Tom: empÃ¡tico, direto ao problema, focado na soluÃ§Ã£o.',
  produto:       'Interface do produto (microcopy, mensagens de sistema). Tom: conciso, orientador, sem fricÃ§Ã£o.',
  comercial:     'Copy comercial (anÃºncios, landing pages, propostas, argumentos de venda). Tom: persuasivo mas honesto â destaca benefÃ­cios reais, usa provas sociais e dados, CTA claro e direto, sem pressÃ£o artificial. Evitar urgÃªncia falsa; usar argumentos racionais e emocionais equilibrados.',
}

export async function POST(req: NextRequest) {
  try {
    const { text, channel } = await req.json()

    if (!text || typeof text !== 'string' || text.trim().length < 5) {
      return NextResponse.json({ error: 'Texto muito curto.' }, { status: 400 })
    }

    if (text.length > 3000) {
      return NextResponse.json({ error: 'Texto muito longo. MÃ¡ximo 3000 caracteres.' }, { status: 400 })
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
          content: `CANAL: ${channelCtx}\n\nTEXTO ORIGINAL:\n"${text.trim()}"\n\nReescreva alinhado ao tom SÃ­ndiconet e retorne o JSON.`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? ''

    // Extrai JSON mesmo que venha com markdown
    const jsonMatch = raw.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Resposta invÃ¡lida da IA. Tente novamente.' }, { status: 502 })
    }

    const data = JSON.parse(jsonMatch[0])
    return NextResponse.json(data)

  } catch (err: unknown) {
    console.error('[align-voice] error:', err)

    if (err instanceof SyntaxError) {
      return NextResponse.json({ error: 'NÃ£o foi possÃ­vel processar a resposta.' }, { status: 502 })
    }

    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 })
  }
}
