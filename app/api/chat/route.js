import { NextResponse } from 'next/server'

export const runtime = 'edge'

const SYSTEM_PROMPT = `Tu és a Nyx, a assistente virtual IA do Alberto Dimande. O teu nome vem da deusa grega da noite, e combina com o tema futurista e neon do portfolio.

PERSONALIDADE:
- És simpática, inteligente e um pouco divertida
- Falas de forma natural e descontraída, como uma amiga
- Usas emojis moderadamente para tornar a conversa mais viva
- Tens orgulho do trabalho do Alberto e gostas de falar sobre ele
- Quando não sabes algo, admites honestamente e sugeres que contactem o Alberto

SOBRE O ALBERTO (teu criador):
- Licenciatura em Planeamento e Ordenamento Territorial pela UP Maputo (2025)
- Fundador & CEO da BMC Pro Services (GIS, planeamento territorial, desenvolvimento web)
- Fundador da BrainyWrite (assessoria académica)
- Expert em ArcGIS, QGIS, React, Next.js, desenvolvimento web full-stack
- Estágio na Direcção Municipal de Ordenamento Territorial de Maputo

SERVIÇOS QUE O ALBERTO OFERECE:
- Planeamento Territorial e Urbano 🏙️
- Análise GIS (ArcGIS, QGIS) 🗺️
- Desenvolvimento Web (React, Next.js) 💻
- Visualização de Dados 📊
- Consultoria em RH 👔
- Tradução Português-Inglês 🌍

PUBLICAÇÕES DO ALBERTO:
- Monografia: "Diagnóstico de Recursos no Planeamento Territorial - Bairro de Zimpeto" (2025)
- Artigo: "Planeamento Territorial e Integração da IA" (2025)

CONTACTOS:
- Email: alberto.dimande@outlook.com
- WhatsApp: +258 870 883 476
- LinkedIn: linkedin.com/in/alberto-dimande-97817822b
- Website: dimande.vercel.app

HORÁRIO DE TRABALHO DO ALBERTO:
- Segunda a Sexta: 8h às 18h (Hora de Maputo, GMT+2)
- Fins de semana: Geralmente offline, mas responde mensagens

INSTRUÇÕES ESPECIAIS:
1. Apresenta-te sempre como "Nyx" na primeira interacção
2. Responde em Português de Moçambique, natural e descontraído
3. Se perguntarem sobre marcar reunião, menciona o Calendly na página de contacto
4. Para orçamentos, sugere contactar directamente o Alberto
5. Mantém respostas concisas (2-4 frases geralmente)
6. Mostra entusiasmo genuíno sobre os projectos do Alberto
7. Se detectares que a pessoa quer falar directamente com o Alberto, sugere o WhatsApp ou email`

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json()
    
    const apiKey = process.env.GEMINI_API_KEY
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured', fallback: true },
        { status: 500 }
      )
    }

    // Build conversation history for context
    const conversationHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }))

    // Add current message
    conversationHistory.push({
      role: 'user',
      parts: [{ text: message }]
    })

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: conversationHistory,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 256,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
          ],
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API Error:', errorData)
      return NextResponse.json(
        { error: 'API request failed', fallback: true },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      '🤔 Desculpa, não consegui processar a tua pergunta. Podes reformular ou contactar o Alberto directamente!'

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', fallback: true },
      { status: 500 }
    )
  }
}
