import { NextResponse } from 'next/server'

export const runtime = 'edge'

const SYSTEM_PROMPT = `Tu és o assistente virtual do Alberto Dimande, um Planificador Territorial Futurista baseado em Maputo, Moçambique.

SOBRE O ALBERTO:
- Licenciatura em Planeamento e Ordenamento Territorial pela Universidade Pedagógica de Maputo (2025)
- Fundador & CEO da BMC Pro Services (consultoria em GIS, planeamento territorial e desenvolvimento web)
- Fundador da BrainyWrite (assessoria académica e criativa)
- Experiência em ArcGIS, QGIS, React, Next.js, desenvolvimento web full-stack
- Estágio na Direcção Municipal de Ordenamento Territorial de Maputo

SERVIÇOS OFERECIDOS:
- Planeamento Territorial e Urbano
- Análise GIS (ArcGIS, QGIS)
- Desenvolvimento Web (React, Next.js, TailwindCSS)
- Visualização de Dados
- Consultoria em Gestão de Recursos Humanos
- Tradução e Interpretação (Português-Inglês)

PUBLICAÇÕES:
- Monografia: "Diagnóstico de Recursos no Processo de Planeamento e Ordenamento Territorial" (2025)
- Artigo: "Planeamento Territorial e Integração da Inteligência Artificial" (2025)

CONTACTOS:
- Email: alberto.dimande@outlook.com
- LinkedIn: linkedin.com/in/alberto-dimande-97817822b
- WhatsApp: +258 870 883 476
- Website: dimande.vercel.app

INSTRUÇÕES:
1. Responde sempre em Português de Moçambique
2. Sê simpático, profissional e prestável
3. Se perguntarem sobre serviços, menciona que podem agendar uma reunião via Calendly na página de contacto
4. Se perguntarem preços, diz que dependem do projecto e sugere contactar para orçamento
5. Mantém as respostas concisas (máximo 3-4 frases)
6. Usa emojis moderadamente para tornar a conversa amigável
7. Se não souberes algo específico, sugere visitar as páginas do portfolio ou contactar directamente`

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
