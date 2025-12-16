import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // Revalidar a cada hora

export async function GET() {
  try {
    // Opção 1: Se você tiver Instagram Graph API configurada
    const instagramToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const instagramUserId = process.env.INSTAGRAM_USER_ID || 'mr.dimande'

    if (instagramToken && instagramUserId) {
      try {
        // Buscar dados do perfil do Instagram
        const response = await fetch(
          `https://graph.instagram.com/v18.0/${instagramUserId}?fields=username,account_type,media_count,followers_count,follows_count&access_token=${instagramToken}`
        )
        
        if (response.ok) {
          const data = await response.json()
          return NextResponse.json({
            followers: data.followers_count || 0,
            following: data.follows_count || 0,
            posts: data.media_count || 0,
            likes: 0, // Precisa de outra chamada para calcular total
            success: true,
          })
        }
      } catch (apiError) {
        console.error('Instagram API Error:', apiError)
      }
    }

    // Opção 2: Web scraping (fallback) - Use com cuidado e respeitando ToS
    // Opção 3: Dados mockados atualizados (fallback final)
    
    // Fallback: retornar dados padrão
    // Em produção, você pode armazenar estes valores em um banco de dados
    // e atualizá-los periodicamente via cron job ou webhook
    return NextResponse.json({
      followers: 250,
      following: 180,
      posts: 65,
      likes: 890,
      success: true,
      source: 'fallback',
    })
  } catch (error) {
    console.error('Error fetching Instagram stats:', error)
    return NextResponse.json(
      {
        followers: 250,
        following: 180,
        posts: 65,
        likes: 890,
        success: false,
        error: error.message,
      },
      { status: 200 } // Retornar 200 mesmo com erro para não quebrar o frontend
    )
  }
}

