import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/ai-service'
import { createMarkupSuggestionPrompt, MarkupSuggestionInput } from '@/lib/ai-prompts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface SuggestionResponse {
  sugestoes: Array<{
    tipo: string
    markup: number
    precoVenda: number
    justificativa: string
  }>
  analise: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { custo, taxas, tipo, destino, temporada } = body
    
    // Validação de inputs
    if (typeof custo !== 'number' || typeof taxas !== 'number') {
      return NextResponse.json(
        { error: 'Custo e taxas devem ser números válidos' },
        { status: 400 }
      )
    }

    if (custo < 0 || taxas < 0) {
      return NextResponse.json(
        { error: 'Custo e taxas não podem ser negativos' },
        { status: 400 }
      )
    }

    const input: MarkupSuggestionInput = {
      custo,
      taxas,
      tipo: tipo || undefined,
      destino: destino || undefined,
      temporada: temporada || undefined,
    }

    const prompt = createMarkupSuggestionPrompt(input)
    const aiResponse = await generateAIResponse(prompt)
    
    // Tentar parsear JSON da resposta
    let parsedResponse: SuggestionResponse
    try {
      // Remover possíveis markdown code blocks
      const cleanJson = aiResponse
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      
      parsedResponse = JSON.parse(cleanJson)
      
      // Validar estrutura da resposta
      if (!parsedResponse.sugestoes || !Array.isArray(parsedResponse.sugestoes)) {
        throw new Error('Formato de resposta inválido')
      }

    } catch (parseError) {
      console.error('Erro ao parsear resposta da IA:', parseError)
      console.error('Resposta original:', aiResponse)
      
      return NextResponse.json(
        { error: 'Erro ao processar resposta da IA. Tente novamente.' },
        { status: 500 }
      )
    }

    return NextResponse.json(parsedResponse)

  } catch (error) {
    console.error('Erro na API de sugestão de markup:', error)
    
    return NextResponse.json(
      { error: 'Erro ao gerar sugestões. Verifique se a API key está configurada.' },
      { status: 500 }
    )
  }
}
