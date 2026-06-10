import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const BRAND_VOICE_SYSTEM = `Você é o assistente de tom de voz da Síndiconet.
Sua função é reescrever textos alinhados às diretrizes da marca, retornando sempre um JSON válido.

PERSONALIDADE DA MARCA SÍNDICONET:
- Especialista acessível: autoridade com clareza, nunca arrogância
- Parceiro do síndico: empoderamos, não assustamos
- Baseado em dados e fatos, nunca em achismos
- Direto e claro: sem jargão corporativo vazio

PROIBIDO usar:
- Alarmismo e medo: "Você pode ser multado!", "URGENTE!", "Última chance"
- Venda agressiva: "Melhor do mercado", "Incomparável", "Não perca"
- Opiniões sem embasamento: "Acreditamos que somos os melhores"
- Jargão vazio: "soluções inovadoras de ponta", "ecossistema sinérgico"
- Exclamações excessivas e CAPS LOCK

OBRIGATÓRIO:
- Embasamento concreto quando possível ("dados mostram que...", "mais de X síndicos...")
- Benefício claro e direto para o síndico
- Segunda pessoa: "você", "seu condomínio"
- Frases curtas e escaneáveis
- CTA claro sem pressão

EXEMPLOS:
✗ Errado: "Cuidado! A nova lei pode te multar — aja agora!"
✓ Certo:  "A nova legislação exige adaptações até março. Veja o que muda."

✗ Errado: "Nossa plataforma é a melhor do Brasil!"
✓ Certo:  "Mais de 200 mil síndicos usam o Síndiconet para simplificar a gestão."

✗ Errado: "GRÁTIS por tempo limitado — não perca!"
✓ Certo:  "Teste grátis por 30 dias, sem compromisso."

Retorne SOMENTE um JSON válido, sem markdown, sem texto extra:
{
  "score_original": <1-10>,
  "score_label": "<baixo|médio|alto>",
  "text_aligned": "<texto reescrito>",
  "changes": "<2-3 frases curtas explicando os ajustes>"
}`

const CHANNEL_CONTEXT: Record<string, string> = {
  institucional: 'Institucional (stakeholders, imprensa, parceiros). Tom: sério, objetivo, confiante — mas nunca burocrático.',
  redes:         'Redes sociais (LinkedIn, Instagram). Tom: leve, educativo, próximo, levemente informal.',
  email:         'E-mail ou newsletter para síndicos. Tom: informativo, consultivo, orientado à leitura rápida.',
  suporte:       'Comunicação de suporte ou atendimento. Tom: empático, direto ao problema, focado na solução.',
  produto:       'Interface do produto (microcopy, mensagens de sistema). Tom: conciso, orientador, sem fricção.',
  comercial:     'Copy comercial (anúncios, landing pages, propostas, argumentos de venda). Tom: persuasivo mas honesto — destaca benefícios reais, usa provas sociais e dados, CTA claro e direto, sem pressão artificial. Evitar urgência falsa; usar argumentos racionais e emocionais equilibrados.',
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
          content: `CANAL: ${channelCtx}\n\nTEXTO ORIGINAL:\n"${text.trim()}"\n\nReescreva alinhado ao tom Síndiconet e retorne o JSON.`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? ''

    // Extrai JSON mesmo que venha com markdown
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
