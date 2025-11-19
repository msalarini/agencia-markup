'use client'

import { useState, useEffect } from 'react'

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

  // Carregar pacotes salvos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pacotes-salvos')
    if (saved) {
      setPacotesSalvos(JSON.parse(saved))
    }
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

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Calculadora de Markup <span className="text-indigo-600">PRO</span>
          </h1>
          <p className="text-lg text-gray-600">
            Calcule, salve e gerencie seus pacotes turísticos
          </p>
        </div>

        {/* Botão Meus Pacotes */}
        {pacotesSalvos.length > 0 && (
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setMostrarPacotes(!mostrarPacotes)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg"
            >
              📦 Meus Pacotes ({pacotesSalvos.length})
            </button>
          </div>
        )}

        {/* Lista de Pacotes Salvos */}
        {mostrarPacotes && pacotesSalvos.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                📦 Pacotes Salvos
              </h2>
              <button
                onClick={() => setMostrarPacotes(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pacotesSalvos.map((pacote) => {
                const custo = parseFloat(pacote.custo || '0') + parseFloat(pacote.taxas || '0')
                const markup = parseFloat(pacote.markup || '0') / 100
                const preco = custo * (1 + markup)
                const lucro = preco - custo
                
                return (
                  <div
                    key={pacote.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-gray-800 mb-2 truncate">
                      {pacote.nome}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      <p>Preço: {formatCurrency(preco)}</p>
                      <p>Lucro: {formatCurrency(lucro)}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(pacote.dataCriacao).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => carregarPacote(pacote)}
                        className="flex-1 bg-indigo-600 text-white py-2 px-3 rounded text-sm hover:bg-indigo-700 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => duplicarPacote(pacote)}
                        className="bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-300 transition"
                      >
                        🔄
                      </button>
                      <button
                        onClick={() => deletarPacote(pacote.id)}
                        className="bg-red-100 text-red-600 py-2 px-3 rounded text-sm hover:bg-red-200 transition"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Main Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Dados do Pacote
                </h2>
                {(custoPackage || taxas || markup || comissao || nomePacote) && (
                  <button
                    onClick={limparCampos}
                    className="text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Nome do Pacote */}
              <div>
                <label
                  htmlFor="nome"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome do Pacote
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nomePacote}
                  onChange={(e) => setNomePacote(e.target.value)}
                  placeholder="Ex: Cancún 5 dias"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Custo do Pacote */}
              <div>
                <label
                  htmlFor="custo"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Custo do Pacote (R$)
                </label>
                <input
                  id="custo"
                  type="number"
                  min="0"
                  step="0.01"
                  value={custoPackage}
                  onChange={(e) => setCustoPackage(e.target.value)}
                  placeholder="2500.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Taxas/Impostos */}
              <div>
                <label
                  htmlFor="taxas"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Taxas/Impostos (R$)
                </label>
                <input
                  id="taxas"
                  type="number"
                  min="0"
                  step="0.01"
                  value={taxas}
                  onChange={(e) => setTaxas(e.target.value)}
                  placeholder="350.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Markup Desejado */}
              <div>
                <label
                  htmlFor="markup"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Markup Desejado (%)
                </label>
                <input
                  id="markup"
                  type="number"
                  min="0"
                  step="0.1"
                  value={markup}
                  onChange={(e) => setMarkup(e.target.value)}
                  placeholder="25"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
              </div>

              {/* Comissão do Vendedor */}
              <div>
                <label
                  htmlFor="comissao"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Comissão do Vendedor (%) <span className="text-indigo-600 font-semibold">PRO</span>
                </label>
                <input
                  id="comissao"
                  type="number"
                  min="0"
                  step="0.1"
                  value={comissao}
                  onChange={(e) => setComissao(e.target.value)}
                  placeholder="10"
                  className="w-full px-4 py-3 border border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-indigo-50"
                />
              </div>

              {/* Botão Salvar */}
              <button
                onClick={salvarPacote}
                disabled={!nomePacote.trim()}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                💾 Salvar Pacote
              </button>
            </div>

            {/* Results Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Resultado
              </h2>

              <div className="space-y-3">
                {/* Preço de Venda */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">
                    Preço Sugerido de Venda
                  </p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {formatCurrency(precoVenda)}
                  </p>
                </div>

                {/* Lucro Total */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">Lucro Total</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(lucroTotal)}
                  </p>
                </div>

                {/* Comissão do Vendedor */}
                {comissao && parseFloat(comissao) > 0 && (
                  <div className="bg-indigo-50 rounded-lg p-4 shadow-sm border border-indigo-200">
                    <p className="text-sm text-indigo-700 mb-1 flex items-center gap-2">
                      Comissão ({comissao}%) <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">PRO</span>
                    </p>
                    <p className="text-xl font-bold text-indigo-600">
                      {formatCurrency(comissaoValor)}
                    </p>
                  </div>
                )}

                {/* Lucro Líquido */}
                {comissao && parseFloat(comissao) > 0 && (
                  <div className="bg-green-50 rounded-lg p-4 shadow-sm border border-green-200">
                    <p className="text-sm text-green-700 mb-1">
                      Lucro Líquido (após comissão)
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {formatCurrency(lucroLiquido)}
                    </p>
                  </div>
                )}

                {/* Margem Percentual */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-sm text-gray-600 mb-1">
                    Margem Percentual
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatPercent(margemPercentual)}
                  </p>
                </div>

                {/* Feedback de Negócio */}
                {custoTotal > 0 && (
                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mt-4">
                    <p className="text-sm text-yellow-800">
                      💡 Com esses valores, você lucra <strong>{formatCurrency(comissao && parseFloat(comissao) > 0 ? lucroLiquido : lucroTotal)}</strong> por venda.
                      {' '}Se vender <strong>10 pacotes/mês</strong>, isso representa <strong>{formatCurrency((comissao && parseFloat(comissao) > 0 ? lucroLiquido : lucroTotal) * 10)}</strong> de lucro!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Explicação das Fórmulas */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            🧠 Como calculamos?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div className="space-y-2">
              <p className="font-semibold text-gray-800">Preço de Venda:</p>
              <p className="bg-gray-50 p-3 rounded font-mono text-xs">
                (Custo + Taxas) × (1 + Markup%)
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-800">Margem Percentual:</p>
              <p className="bg-gray-50 p-3 rounded font-mono text-xs">
                (Lucro / Preço de Venda) × 100
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-800">Comissão:</p>
              <p className="bg-gray-50 p-3 rounded font-mono text-xs">
                Preço de Venda × Comissão%
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-gray-800">Lucro Líquido:</p>
              <p className="bg-gray-50 p-3 rounded font-mono text-xs">
                Lucro Total - Comissão
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">
            🚀 Quer ainda mais recursos?
          </h3>
          <p className="text-lg mb-6 text-indigo-100">
            Em breve: exportar pacotes em PDF, cálculos multi-moeda, 
            relatórios mensais e integração com seu sistema!
          </p>
          <a
            href="https://wa.me/5511999999999?text=Oi!%20Quero%20saber%20mais%20sobre%20os%20próximos%20recursos%20da%20Calculadora%20de%20Markup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-lg hover:bg-indigo-50 transition transform hover:scale-105 shadow-lg"
          >
            💬 Me avise quando lançar
          </a>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-sm">
            Desenvolvido para agências de turismo que querem crescer
          </p>
        </div>
      </div>
    </div>
  )
}
