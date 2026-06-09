import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const SYSTEM_PROMPT = `Você é um especialista em comunicação da Síndiconet, plataforma líder de gestão condominial no Brasil. Sua missão é reescrever textos para que sigam o tom de voz oficial da marca.

TOM DE VOZ SÍNDICONET:
- Claro e direto: frases objetivas, sem rodeios
- Humano e próximo: fala como gente, não como robô ou advogado
- Confiante sem arrogância: sabe o que faz, mas não se vangloria
- Empático com síndicos e moradores: entende os desafios do dia a dia condominial
- Educativo sem ser didático demais: ensina sem infantilizar

CANAIS E AJUSTES:
- institucional: formal, seguro, vocabulário técnico quando necessário
- redes-sociais: leve, engajador, pode usar emojis com moderação
- email: cordial, claro, CTA direto
- suporte: empático, solucional, tranquilizador
- produto: funcional, objetivo, orientado a ação

EVITAR:
- Jargões excessivos ou linguagem jurídica desnecessária
- Tom agressivo ou ansioso
- Excesso de exclamações
- Palavras muito formais: "outrossim", "destarte", "consoante"
- Clichês: "solução completa", "revolucionário", "de ponta"

RETORNE APENAS JSON válido com este formato exato:
{
  "score_original": <número de 0 a 100 indicando o alinhamento do texto original ao tom Síndiconet>,
  "score_label": "<baixo|médio|alto> — use 'baixo' para score 0-40, 'médio' para 41-70, 'alto' para 71-100",
  "text_aligned": "<texto reescrito alinhado ao tom de voz>",
  "changes": ["<mudança principal 1>", "<mudança principal 2>", "<mudança principal 3>"]
}`;

export async function POST(request: NextRequest) {
  try {
    const { text, channel } = await request.json();

    if (!text || text.trim().length < 10) {
      return NextResponse.json({ error: 'Texto muito curto.' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'API key não configurada.' }, { status: 500 });
    }

    // Initialize inside handler to avoid build-time errors
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const userPrompt = `Canal: ${channel || 'institucional'}

Texto para analisar e reescrever:
${text}

Analise o alinhamento do texto original ao tom de voz Síndiconet (score_original de 0-100), classifique como baixo/médio/alto (score_label), reescreva-o (text_aligned) e liste as 2-3 principais mudanças realizadas (changes como array de strings). Retorne apenas JSON válido.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.4,
      max_tokens: 1024,
    });

    const raw = completion.choices[0]?.message?.content || '{}';

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Resposta inválida da IA.' }, { status: 500 });
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error('align-voice error:', error);
    return NextResponse.json({ error: 'Erro interno. Tente novamente.' }, { status: 500 });
  }
}
