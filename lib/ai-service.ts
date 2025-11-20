import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GOOGLE_AI_API_KEY

if (!apiKey) {
  throw new Error('GOOGLE_AI_API_KEY não está configurada')
}

// Inicializar com API v1 (estável)
const genAI = new GoogleGenerativeAI(apiKey)

// Usar gemini-2.0-flash-exp (modelo mais recente e estável)
export const geminiModel = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp',
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
  }
})

export async function generateAIResponse(prompt: string): Promise<string> {
  try {
    const result = await geminiModel.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error('Erro ao gerar resposta da IA:', error)
    throw new Error('Falha ao processar solicitação de IA')
  }
}

export async function streamAIResponse(prompt: string) {
  try {
    const result = await geminiModel.generateContentStream(prompt)
    return result.stream
  } catch (error) {
    console.error('Erro ao gerar stream da IA:', error)
    throw new Error('Falha ao processar solicitação de IA')
  }
}
