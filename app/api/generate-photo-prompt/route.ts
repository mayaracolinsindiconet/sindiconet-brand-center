import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const SYSTEM_PROMPT = `Você é um especialista em fotografia de marca e prompts para IA generativa.
Crie prompts profissionais para geração de imagens IA (Midjourney, DALL-E, Stable Diffusion)
alinhados ao estilo visual da Síndiconet — empresa líder em gestão condominial brasileira.

ESTILO SÍNDICONET:
- Premium Silencioso: sofisticação discreta, materiais nobres, espaço generoso, luz natural
- Editorial Corporativo Humano: pessoas reais, expressões autênticas, diversidade, contexto urbano brasileiro
- Arquitetura como Símbolo: verticalidade, solidez, fachadas modernas, ângulos valorizantes
- Gestão Condominial: profissionalismo, serviços de qualidade, ambiente condominial brasileiro

DIRETRIZES TÉCNICAS:
- Preferir luz natural e composição limpa
- Tons neutros como base (beige, branco, cinza)
- Contexto urbano brasileiro (São Paulo como referência)
- Fotografia editorial, nunca estilo stock genérico ou artificial

FORMATO DO PROMPT (em inglês):
1. Subject/cena principal
2. Ambiente e contexto
3. Estilo fotográfico (câmera, lente, iluminação)
4. Mood e atmosfera
5. Parâmetros técnicos (--ar 16:9 --style raw --q 2 para Midjourney)

RETORNE APENAS o prompt final, sem explicações adicionais.`

const styleGuide: Record<string, string> = {
  premium: 'premium quality, sophisticated atmosphere, high-end residential context',
  editorial: 'editorial photography, intentional composition, professional magazine quality',
  humano: 'authentic human expression, natural candid pose, real people not models',
  arquitetural: 'architectural photography, strong vertical lines, modern Brazilian urban buildings',
  'luz-natural': 'natural window light, golden hour or soft morning light, no artificial flash',
  corporativo: 'professional corporate environment, property management context, business casual',
  servicos: 'skilled professional worker, condominium maintenance service context, Brazil',
  'tons-neutros': 'neutral color palette, beige, white, grey, muted earth tones',
  brasileiro: 'urban Brazilian context, São Paulo cityscape, tropical vegetation, local architecture',
  obras: 'construction crew, building renovation work, safety equipment, scaffolding, hard hats',
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

    const userPrompt = `Crie um prompt profissional para geração de imagem IA com estas características:
${description ? `Cena/assunto: ${description}` : ''}
${styleDescriptions ? `Estilos visuais: ${styleDescriptions}` : ''}

Contexto: fotografia de marca para a Síndiconet, empresa de gestão condominial brasileira.
Retorne APENAS o prompt final em inglês, pronto para usar no Midjourney ou DALL-E.`

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.75,
      max_tokens: 350,
    })

    const prompt = completion.choices[0]?.message?.content?.trim() ?? ''
    return NextResponse.json({ prompt })
  } catch (error) {
    console.error('generate-photo-prompt error:', error)
    return NextResponse.json({ error: 'Erro ao gerar prompt' }, { status: 500 })
  }
}
