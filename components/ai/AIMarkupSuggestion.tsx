'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, Loader2, TrendingUp, AlertCircle } from 'lucide-react'
import { formatCurrency } from '@/lib/currency'

interface Suggestion {
  tipo: string
  markup: number
  precoVenda: number
  justificativa: string
}

interface SuggestionResponse {
  sugestoes: Suggestion[]
  analise: string
}

interface AIMarkupSuggestionProps {
  custo: string
  taxas: string
  onApplyMarkup: (markup: number) => void
}

export function AIMarkupSuggestion({ custo, taxas, onApplyMarkup }: AIMarkupSuggestionProps) {
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<SuggestionResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  
  // Campos adicionais opcionais
  const [tipo, setTipo] = useState('')
  const [destino, setDestino] = useState('')
  const [temporada, setTemporada] = useState('')

  const custoNum = parseFloat(custo || '0')
  const taxasNum = parseFloat(taxas || '0')
  const hasValidData = custoNum > 0

  const handleGetSuggestions = async () => {
    if (!hasValidData) {
      setError('Por favor, preencha o custo do pacote primeiro')
      return
    }

    setLoading(true)
    setError(null)
    setSuggestions(null)

    try {
      const response = await fetch('/api/ai/suggest-markup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          custo: custoNum,
          taxas: taxasNum,
          tipo: tipo || undefined,
          destino: destino || undefined,
          temporada: temporada || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao obter sugestões')
      }

      setSuggestions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar com a IA')
    } finally {
      setLoading(false)
    }
  }

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'conservador':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-100'
      case 'moderado':
        return 'bg-green-100 text-green-700 hover:bg-green-100'
      case 'agressivo':
        return 'bg-purple-100 text-purple-700 hover:bg-purple-100'
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-100'
    }
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <CardTitle>Sugestões de Markup com IA</CardTitle>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50">
            ✨ Powered by Gemini
          </Badge>
        </div>
        <CardDescription>
          A IA analisa seus custos e sugere markups adequados ao mercado
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!showForm && !suggestions && (
          <Button
            onClick={() => setShowForm(true)}
            disabled={!hasValidData || loading}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Obter Sugestões da IA
              </>
            )}
          </Button>
        )}

        {showForm && !suggestions && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="tipo-pacote">Tipo de Pacote (opcional)</Label>
                <Input
                  id="tipo-pacote"
                  placeholder="Ex: Resort, Cruzeiro"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destino">Destino (opcional)</Label>
                <Input
                  id="destino"
                  placeholder="Ex: Cancún, Europa"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temporada">Temporada (opcional)</Label>
                <Input
                  id="temporada"
                  placeholder="Ex: Alta, Baixa"
                  value={temporada}
                  onChange={(e) => setTemporada(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleGetSuggestions}
                disabled={loading}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analisando...
                  </>
                ) : (
                  'Gerar Sugestões'
                )}
              </Button>
              <Button
                onClick={() => setShowForm(false)}
                variant="outline"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        {suggestions && (
          <div className="space-y-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 text-sm">
              <p className="font-medium text-gray-900 mb-1">📊 Análise de Mercado</p>
              <p className="text-gray-700">{suggestions.analise}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {suggestions.sugestoes.map((sug, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <Badge className={getTipoBadgeColor(sug.tipo)}>
                        {sug.tipo.charAt(0).toUpperCase() + sug.tipo.slice(1)}
                      </Badge>
                      <span className="text-2xl font-bold text-primary">
                        {sug.markup}%
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Preço de Venda</p>
                      <p className="text-xl font-bold text-green-600">
                        {formatCurrency(sug.precoVenda)}
                      </p>
                    </div>
                    
                    <p className="text-xs text-gray-600">
                      {sug.justificativa}
                    </p>

                    <Button
                      onClick={() => {
                        onApplyMarkup(sug.markup)
                        setSuggestions(null)
                        setShowForm(false)
                      }}
                      size="sm"
                      className="w-full"
                    >
                      <TrendingUp className="mr-1 h-3 w-3" />
                      Aplicar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => {
                setSuggestions(null)
                setShowForm(false)
              }}
              variant="outline"
              className="w-full"
            >
              Nova Análise
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
