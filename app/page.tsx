'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Package, TrendingUp, DollarSign, Percent, Copy, Trash2, Calculator } from 'lucide-react'

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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  const formatPercent = (value: number) => `${value.toFixed(2)}%`

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="h-10 w-10 text-primary" />
            <h1 className="text-5xl font-bold tracking-tight">
              Calculadora de Markup <Badge variant="default">PRO</Badge>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Calcule, salve e gerencie seus pacotes turísticos com precisão
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
                <Label htmlFor="custo">Custo do Pacote (R$)</Label>
                <Input
                  id="custo"
                  type="number"
                  min="0"
                  step="0.01"
                  value={custoPackage}
                  onChange={(e) => setCustoPackage(e.target.value)}
                  placeholder="2500.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxas">Taxas/Impostos (R$)</Label>
                <Input
                  id="taxas"
                  type="number"
                  min="0"
                  step="0.01"
                  value={taxas}
                  onChange={(e) => setTaxas(e.target.value)}
                  placeholder="350.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="markup">Markup Desejado (%)</Label>
                <Input
                  id="markup"
                  type="number"
                  min="0"
                  step="0.1"
                  value={markup}
                  onChange={(e) => setMarkup(e.target.value)}
                  placeholder="25"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comissao" className="flex items-center gap-2">
                  Comissão do Vendedor (%)
                  <Badge variant="secondary">PRO</Badge>
                </Label>
                <Input
                  id="comissao"
                  type="number"
                  min="0"
                  step="0.1"
                  value={comissao}
                  onChange={(e) => setComissao(e.target.value)}
                  placeholder="10"
                  className="border-primary/50 bg-primary/5"
                />
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
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-sm text-amber-800">
                      💡 Lucro de <strong>{formatCurrency(comissao && parseFloat(comissao) > 0 ? lucroLiquido : lucroTotal)}</strong> por venda.
                      {' '}Em 10 vendas/mês: <strong>{formatCurrency((comissao && parseFloat(comissao) > 0 ? lucroLiquido : lucroTotal) * 10)}</strong>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Como calculamos?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold">Preço de Venda:</p>
                <code className="block bg-muted p-3 rounded-md">
                  (Custo + Taxas) × (1 + Markup%)
                </code>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Margem Percentual:</p>
                <code className="block bg-muted p-3 rounded-md">
                  (Lucro / Preço de Venda) × 100
                </code>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Comissão:</p>
                <code className="block bg-muted p-3 rounded-md">
                  Preço de Venda × Comissão%
                </code>
              </div>
              <div className="space-y-2">
                <p className="font-semibold">Lucro Líquido:</p>
                <code className="block bg-muted p-3 rounded-md">
                  Lucro Total - Comissão
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-primary to-blue-600 text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-2">🚀 Quer ainda mais recursos?</CardTitle>
            <CardDescription className="text-primary-foreground/80 text-base">
              Em breve: exportar pacotes em PDF, cálculos multi-moeda, relatórios mensais e integração com seu sistema!
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="shadow-lg"
            >
              <a
                href="https://wa.me/5511999999999?text=Oi!%20Quero%20saber%20mais%20sobre%20os%20próximos%20recursos%20da%20Calculadora%20de%20Markup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Me avise quando lançar
              </a>
            </Button>
          </CardContent>
        </Card>

        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-sm">
            Desenvolvido para agências de turismo que querem crescer
          </p>
        </div>
      </div>
    </div>
  )
}
