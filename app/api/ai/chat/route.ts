import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/ai-service'
import { createChatPrompt } from '@/lib/ai-prompts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { message, history } = body as {
      message: string
      history?: ChatMessage[]
    }
    
    // Validação
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Mensagem inválida' },
        { status: 400 }
      )
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Mensagem muito longa (máximo 500 caracteres)' },
        { status: 400 }
      )
    }

    // Construir histórico da conversa
    let conversationHistory = ''
    if (history && Array.isArray(history) && history.length > 0) {
      // Limitar a últimas 10 mensagens para evitar token overflow
      const recentHistory = history.slice(-10)
      conversationHistory = recentHistory
        .map((msg) => `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.content}`)
        .join('\n')
    }

    const prompt = createChatPrompt(message, conversationHistory)
    const aiResponse = await generateAIResponse(prompt)
    
    return NextResponse.json({ 
      message: aiResponse.trim(),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Erro na API de chat:', error)
    
    return NextResponse.json(
      { error: 'Erro ao processar mensagem. Tente novamente.' },
      { status: 500 }
    )
  }
}
