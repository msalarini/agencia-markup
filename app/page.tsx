'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { CurrencyInput } from '@/components/ui/currency-input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Package, TrendingUp, DollarSign, Percent, Copy, Trash2, Calculator, Lightbulb, Info, Lock } from 'lucide-react'
import { formatCurrency as formatCurrencyUtil, formatPercent as formatPercentUtil } from '@/lib/currency'
import { useAuth } from '@/components/providers/AuthProvider'
import { TargetAudience } from '@/components/landing/TargetAudience'
import { Benefits } from '@/components/landing/Benefits'
import { LeadCapture } from '@/components/landing/LeadCapture'
import { AIMarkupSuggestion } from '@/components/ai/AIMarkupSuggestion'
import { ChatBot } from '@/components/ai/ChatBot'

interface PackageData {
  id: string
  nome: string
  custo: string
  taxas: string
  markup: string
  comissao: string
  dataCriacao: string
}

export default function Home() {
  const { isPro } = useAuth()
  const [custoPackage, setCustoPackage] = useState('')
  const [taxas, setTaxas] = useState('')
  const [markup, setMarkup] = useState('')
  const [comissao, setComissao] = useState('')
  const [nomePacote, setNomePacote] = useState('')
  const [pacotesSalvos, setPacotesSalvos] = useState<PackageData[]>([])
  const [mostrarPacotes, setMostrarPacotes] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('pacotes-salvos')
    if (saved) setPacotesSalvos(JSON.parse(saved))
  }, [])

  const custoTotal = parseFloat(custoPackage || '0') + parseFloat(taxas || '0')
  const markupDecimal = parseFloat(markup || '0') / 100
  const precoVenda = custoTotal * (1 + markupDecimal)
  const lucroTotal = precoVenda - custoTotal
  const comissaoValor = precoVenda * (parseFloat(comissao || '0') / 100)
  const lucroLiquido = lucroTotal - comissaoValor
  const margemPercentual = custoTotal > 0 ? (lucroTotal / precoVenda) * 100 : 0

  const formatCurrency = formatCurrencyUtil
  const formatPercent = formatPercentUtil

  const salvarPacote = () => {
    if (!nomePacote.trim()) {
      alert('Por favor, dê um nome ao pacote')
      return
    }

    const novoPacote: PackageData = {
      id: Date.now().toString(),
      nome: nomePacote,
      custo: custoPackage,
      taxas: taxas,
      markup: markup,
      comissao: comissao,
      dataCriacao: new Date().toISOString(),
    }

    const novaLista = [...pacotesSalvos, novoPacote]
    setPacotesSalvos(novaLista)
    localStorage.setItem('pacotes-salvos', JSON.stringify(novaLista))
    setNomePacote('')
    alert('✅ Pacote salvo com sucesso!')
  }

  const carregarPacote = (pacote: PackageData) => {
    setCustoPackage(pacote.custo)
    setTaxas(pacote.taxas)
    setMarkup(pacote.markup)
    setComissao(pacote.comissao)
    setNomePacote(pacote.nome)
    setMostrarPacotes(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const duplicarPacote = (pacote: PackageData) => {
    setCustoPackage(pacote.custo)
    setTaxas(pacote.taxas)
    setMarkup(pacote.markup)
    setComissao(pacote.comissao)
    setNomePacote(`${pacote.nome} (cópia)`)
    setMostrarPacotes(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deletarPacote = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pacote?')) {
      const novaLista = pacotesSalvos.filter((p) => p.id !== id)
      setPacotesSalvos(novaLista)
      localStorage.setItem('pacotes-salvos', JSON.stringify(novaLista))
    }
  }

  const limparCampos = () => {
    setCustoPackage('')
    setTaxas('')
    setMarkup('')
    setComissao('')
    setNomePacote('')
  }

  const handleMarkupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      setMarkup(value)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-4 mb-6 px-8 py-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="relative shrink-0">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                <Calculator className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
            </div>
            <div className="flex flex-col items-start">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent leading-none mb-1">
                LucroTur
              </h1>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Gestão de Lucro para Turismo
              </span>
            </div>
          </div>
          <p className="text-2xl font-semibold text-slate-800 mb-2">
            Defina o preço dos seus pacotes em 30 segundos, sem planilhas.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A ferramenta profissional para agências de turismo calcularem preços, margens e comissões com precisão.
          </p>
        </div>

        {pacotesSalvos.length > 0 && (
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setMostrarPacotes(!mostrarPacotes)}
              size="lg"
              variant="outline"
            >
              <Package className="mr-2 h-4 w-4" />
              Meus Pacotes ({pacotesSalvos.length})
            </Button>
          </div>
        )}

        {mostrarPacotes && pacotesSalvos.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">
                  <Package className="inline mr-2 h-5 w-5" />
                  Pacotes Salvos
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMostrarPacotes(false)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pacotesSalvos.map((pacote) => {
                  const custo = parseFloat(pacote.custo || '0') + parseFloat(pacote.taxas || '0')
                  const markup = parseFloat(pacote.markup || '0') / 100
                  const preco = custo * (1 + markup)
                  const lucro = preco - custo

                  return (
                    <Card key={pacote.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base truncate">{pacote.nome}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(pacote.dataCriacao).toLocaleDateString('pt-BR')}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Preço:</span>
                            <span className="font-semibold">{formatCurrency(preco)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lucro:</span>
                            <span className="font-semibold text-green-600">{formatCurrency(lucro)}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => carregarPacote(pacote)}
                            size="sm"
                            className="flex-1"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() => duplicarPacote(pacote)}
                            size="sm"
                            variant="outline"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => deletarPacote(pacote.id)}
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Dados do Pacote</CardTitle>
                {(custoPackage || taxas || markup || comissao || nomePacote) && (
                  <Button
                    onClick={limparCampos}
                    variant="ghost"
                    size="sm"
                  >
                    Limpar
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Pacote</Label>
                <Input
                  id="nome"
                  value={nomePacote}
                  onChange={(e) => setNomePacote(e.target.value)}
                  placeholder="Ex: Cancún 5 dias"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="custo">Custo do Pacote</Label>
                <CurrencyInput
                  id="custo"
                  value={custoPackage}
                  onValueChange={setCustoPackage}
                  placeholder="1.500,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxas">Taxas/Impostos</Label>
                <CurrencyInput
                  id="taxas"
                  value={taxas}
                  onValueChange={setTaxas}
                  placeholder="350,00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="markup">Markup Desejado (%)</Label>
                <Input
                  id="markup"
                  type="text"
                  inputMode="decimal"
                  value={markup}
                  onChange={handleMarkupChange}
                  placeholder="25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comissao" className="flex items-center gap-2">
                  Comissão do Vendedor (%)
                  <Badge variant={isPro ? "default" : "secondary"} className="flex items-center gap-1">
                    {isPro ? "PRO" : <><Lock className="h-3 w-3" /> PRO</>}
                  </Badge>
                </Label>
                <div className="relative">
                  <Input
                    id="comissao"
                    type="number"
                    min="0"
                    step="0.1"
                    value={comissao}
                    onChange={(e) => setComissao(e.target.value)}
                    placeholder={isPro ? "10" : "Recurso PRO"}
                    disabled={!isPro}
                    className={!isPro ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "border-primary/50 bg-primary/5"}
                  />
                  {!isPro && (
                    <div className="absolute inset-0 flex items-center justify-end pr-3 pointer-events-none">
                      <span className="text-xs text-slate-500">Bloqueado</span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={salvarPacote}
                disabled={!nomePacote.trim()}
                className="w-full"
                size="lg"
              >
                <Package className="mr-2 h-4 w-4" />
                Salvar Pacote
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Resultado
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">
                    Preço Sugerido de Venda
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(precoVenda)}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Lucro Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(lucroTotal)}
                  </p>
                </div>

                {comissao && parseFloat(comissao) > 0 && (
                  <>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-blue-700">Comissão ({comissao}%)</p>
                        <Badge variant="default" className="text-xs">PRO</Badge>
                      </div>
                      <p className="text-xl font-bold text-blue-700">
                        {formatCurrency(comissaoValor)}
                      </p>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                      <p className="text-sm text-emerald-700 mb-1">
                        Lucro Líquido (após comissão)
                      </p>
                      <p className="text-2xl font-bold text-emerald-700">
                        {formatCurrency(lucroLiquido)}
                      </p>
                    </div>
                  </>
                )}

                <div className="p-4 bg-indigo-50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    Margem Percentual
                  </p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {formatPercent(margemPercentual)}
                  </p>
                </div>

                {custoTotal > 0 && (
                  <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2 text-violet-900">
                        <Lightbulb className="h-5 w-5" />
                        Análise de Negócio
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="p-3 bg-white/60 rounded-lg">
                        <p className="text-violet-900">
                          Com esses valores, você está <strong className="text-violet-700">lucrando {formatCurrency(comissao && parseFloat(comissao) > 0 ? lucroLiquido : lucroTotal)} por venda</strong>,
                          com uma margem de <strong className="text-violet-700">{formatPercent(margemPercentual)}</strong>.
                        </p>
                      </div>
                      <div className="p-3 bg-white/60 rounded-lg">
                        <p className="text-violet-900 font-medium mb-2">Projeção Mensal:</p>
                        <div className="space-y-1 pl-2 border-l-2 border-violet-300">
                          <p className="text-violet-800">
                            • <strong>10 pacotes/mês</strong> = {formatCurrency((comissao && parseFloat(comissao) > 0 ? lucroLiquido : lucroTotal) * 10)} de lucro
                          </p>
                          <p className="text-violet-800">
                            • <strong>20 pacotes/mês</strong> = {formatCurrency((comissao && parseFloat(comissao) > 0 ? lucroLiquido : lucroTotal) * 20)} de lucro
                          </p>
                          <p className="text-violet-800">
                            • <strong>30 pacotes/mês</strong> = {formatCurrency((comissao && parseFloat(comissao) > 0 ? lucroLiquido : lucroTotal) * 30)} de lucro
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <AIMarkupSuggestion
          custo={custoPackage}
          taxas={taxas}
          onApplyMarkup={(suggestedMarkup) => setMarkup(suggestedMarkup.toString())}
        />

        <TargetAudience />
        <Benefits />

        <Card className="mb-8 border-blue-200 bg-gradient-to-br from-blue-50/50 to-cyan-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Como Calculamos?
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Fórmulas Transparentes
              </Badge>
            </div>
            <CardDescription>
              Entenda exatamente como chegamos em cada valor. Sem segredos, sem complicação.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 p-4 bg-white rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="font-semibold text-blue-900">Preço de Venda</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Soma dos custos multiplicada pelo markup desejado
                </p>
                <code className="block bg-blue-50 p-3 rounded-md text-sm border border-blue-200">
                  (Custo + Taxas) × (1 + Markup%)
                </code>
              </div>

              <div className="space-y-2 p-4 bg-white rounded-lg border border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="font-semibold text-green-900">Margem Percentual</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Quanto do preço de venda é lucro
                </p>
                <code className="block bg-green-50 p-3 rounded-md text-sm border border-green-200">
                  (Lucro / Preço de Venda) × 100
                </code>
              </div>

              <div className="space-y-2 p-4 bg-white rounded-lg border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <p className="font-semibold text-purple-900">Comissão</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Valor pago ao vendedor sobre o preço final
                </p>
                <code className="block bg-purple-50 p-3 rounded-md text-sm border border-purple-200">
                  Preço de Venda × Comissão%
                </code>
              </div>

              <div className="space-y-2 p-4 bg-white rounded-lg border border-emerald-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <p className="font-semibold text-emerald-900">Lucro Líquido</p>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Lucro real após descontar a comissão
                </p>
                <code className="block bg-emerald-50 p-3 rounded-md text-sm border border-emerald-200">
                  Lucro Total - Comissão
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        <LeadCapture />

        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-sm">
            Desenvolvido para agências de turismo que querem crescer
          </p>
        </div>
      </div>

      <ChatBot />
    </div>
  )
}
