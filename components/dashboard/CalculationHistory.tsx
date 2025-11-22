'use client'

import { useState, useEffect } from 'react'
import { formatCurrencyValue } from '@/lib/currency/converter'
import { Loader2, Trash2, Filter, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Calculation {
    id: string
    created_at: string
    package_name: string
    cost: number
    markup: number
    final_price: number
    profit: number
    currency: string
    status: string
}

export function CalculationHistory() {
    const [calculations, setCalculations] = useState<Calculation[]>([])
    const [loading, setLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    // Filters
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [currencyFilter, setCurrencyFilter] = useState<string>('all')
    const [showFilters, setShowFilters] = useState(false)

    const fetchCalculations = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            params.append('limit', '20')

            if (statusFilter !== 'all') params.append('status', statusFilter)
            if (currencyFilter !== 'all') params.append('currency', currencyFilter)

            const response = await fetch(`/api/calculations?${params.toString()}`)
            const data = await response.json()
            setCalculations(data.calculations || [])
        } catch (error) {
            console.error('Erro ao buscar histórico:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCalculations()
    }, [statusFilter, currencyFilter]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este cálculo?')) return

        setDeletingId(id)
        try {
            await fetch(`/api/calculations?id=${id}`, { method: 'DELETE' })
            setCalculations(calculations.filter(c => c.id !== id))
        } catch (error) {
            console.error('Erro ao deletar:', error)
        } finally {
            setDeletingId(null)
        }
    }

    const clearFilters = () => {
        setStatusFilter('all')
        setCurrencyFilter('all')
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle>Histórico de Cálculos</CardTitle>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        className={showFilters ? 'bg-secondary' : ''}
                    >
                        <Filter className="mr-2 h-4 w-4" />
                        Filtros
                    </Button>
                </div>
            </CardHeader>

            {showFilters && (
                <CardContent className="pb-4 border-b mb-4">
                    <div className="flex flex-wrap gap-4 items-end">
                        <div className="space-y-2 w-40">
                            <label className="text-sm font-medium">Status</label>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todos</SelectItem>
                                    <SelectItem value="draft">Rascunho</SelectItem>
                                    <SelectItem value="saved">Salvo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2 w-40">
                            <label className="text-sm font-medium">Moeda</label>
                            <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Todas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Todas</SelectItem>
                                    <SelectItem value="BRL">Real (BRL)</SelectItem>
                                    <SelectItem value="USD">Dólar (USD)</SelectItem>
                                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {(statusFilter !== 'all' || currencyFilter !== 'all') && (
                            <Button variant="ghost" size="icon" onClick={clearFilters} title="Limpar filtros">
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            )}

            <CardContent>
                {loading ? (
                    <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : calculations.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        Nenhum cálculo encontrado com os filtros atuais.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                                <tr>
                                    <th className="px-4 py-3">Data</th>
                                    <th className="px-4 py-3">Pacote</th>
                                    <th className="px-4 py-3">Custo</th>
                                    <th className="px-4 py-3">Markup</th>
                                    <th className="px-4 py-3">Preço Final</th>
                                    <th className="px-4 py-3">Lucro</th>
                                    <th className="px-4 py-3 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calculations.map((calc) => (
                                    <tr key={calc.id} className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="px-4 py-3">
                                            {new Date(calc.created_at).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {calc.package_name || 'Sem nome'}
                                            {calc.status === 'draft' && (
                                                <Badge variant="outline" className="ml-2 text-[10px] h-5">Rascunho</Badge>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {formatCurrencyValue(calc.cost, calc.currency as any)}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant="secondary">{calc.markup}%</Badge>
                                        </td>
                                        <td className="px-4 py-3 font-bold">
                                            {formatCurrencyValue(calc.final_price, calc.currency as any)}
                                        </td>
                                        <td className="px-4 py-3 text-green-600">
                                            {formatCurrencyValue(calc.profit, calc.currency as any)}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50 mr-1"
                                                onClick={() => {
                                                    const priceFormatted = formatCurrencyValue(calc.final_price, calc.currency as any)
                                                    let text = `*Orçamento: ${calc.package_name || 'Pacote Turístico'}*\n\n`
                                                    text += `Valor Final: *${priceFormatted}*\n\n`
                                                    text += `\n_Gerado por LucroTur_`
                                                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
                                                }}
                                                title="Compartilhar no WhatsApp"
                                            >
                                                <MessageCircle className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                                                onClick={() => handleDelete(calc.id)}
                                                disabled={deletingId === calc.id}
                                                title="Excluir cálculo"
                                            >
                                                {deletingId === calc.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
