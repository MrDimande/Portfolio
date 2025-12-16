import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidar a cada hora

export async function GET() {
  try {
    // Opção 1: Se você tiver Facebook Graph API configurada
    const facebookToken = process.env.FACEBOOK_ACCESS_TOKEN
    const facebookPageId = process.env.FACEBOOK_PAGE_ID || 'alberto.dimande'

    if (facebookToken) {
      try {
        // Buscar dados da página do Facebook
        const response = await fetch(
          `https://graph.facebook.com/v18.0/${facebookPageId}?fields=followers_count,fan_count,likes&access_token=${facebookToken}`
        )
        
        if (response.ok) {
          const data = await response.json()
          return NextResponse.json({
            followers: data.followers_count || data.fan_count || 0,
            likes: data.likes || 0,
            posts: 0, // Precisa de outra chamada para obter
            shares: 0,
            success: true,
          })
        }
      } catch (apiError) {
        console.error('Facebook API Error:', apiError)
      }
    }

    // Opção 2: Web scraping (fallback) - Use com cuidado e respeitando ToS
    // Opção 3: Dados mockados atualizados (fallback final)
    // Você pode atualizar estes valores manualmente ou via dashboard
    
    // Fallback: retornar dados padrão
    // Em produção, você pode armazenar estes valores em um banco de dados
    // e atualizá-los periodicamente via cron job ou webhook
    return NextResponse.json({
      followers: 15000,
      likes: 32000,
      posts: 45,
      shares: 89,
      success: true,
      source: 'fallback',
    })
  } catch (error) {
    console.error('Error fetching Facebook stats:', error)
    return NextResponse.json(
      {
        followers: 1000,
        likes: 3200,
        posts: 45,
        shares: 89,
        success: false,
        error: error.message,
      },
      { status: 200 } // Retornar 200 mesmo com erro para não quebrar o frontend
    )
  }
}

