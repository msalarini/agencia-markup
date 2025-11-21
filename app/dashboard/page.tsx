'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricsCard } from '@/components/dashboard/MetricsCard'
import { Calculator, DollarSign, TrendingUp, CheckCircle, Loader2 } from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'
import { formatCurrencyValue } from '@/lib/currency/converter'

interface Stats {
    metrics: {
        totalCalculations: number
        totalRevenue: number
        totalProfit: number
        averageMarkup: number
        conversionRate: number
        averageTicket: number
    }
    evolution: Array<{
        month: string
        count: number
        revenue: number
    }>
}

export default function DashboardPage() {
    const router = useRouter()
    const { isPro } = useAuth()
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (isPro === false) {
            router.push('/pro')
            return
        }

        if (isPro) {
            fetchStats()
        }
    }, [isPro, router])

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/calculations/stats')
            const data = await response.json()
            setStats(data)
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!isPro) {
        return null
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard PRO</h1>
                    <p className="text-muted-foreground">
                        Acompanhe suas métricas e histórico de cálculos
                    </p>
                </div>

                {stats && (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <MetricsCard
                                title="Total de Cálculos"
                                value={stats.metrics.totalCalculations}
                                icon={Calculator}
                                description="Cálculos realizados"
                            />
                            <MetricsCard
                                title="Ticket Médio"
                                value={formatCurrencyValue(stats.metrics.averageTicket, 'BRL')}
                                icon={DollarSign}
                                description="Valor médio por pacote"
                            />
                            <MetricsCard
                                title="Markup Médio"
                                value={`${stats.metrics.averageMarkup.toFixed(1)}%`}
                                icon={TrendingUp}
                                description="Margem média aplicada"
                            />
                            <MetricsCard
                                title="Taxa de Conversão"
                                value={`${stats.metrics.conversionRate.toFixed(1)}%`}
                                icon={CheckCircle}
                                description="Orçamentos aprovados"
                            />
                        </div>

                        {stats.evolution.length > 0 && (
                            <Card className="mb-8">
                                <CardHeader>
                                    <CardTitle>Evolução Mensal</CardTitle>
                                    <CardDescription>
                                        Últimos {stats.evolution.length} meses
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {stats.evolution.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium">{item.month}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {item.count} cálculo{item.count !== 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-green-600">
                                                        {formatCurrencyValue(item.revenue, 'BRL')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {stats.metrics.totalCalculations === 0 && (
                            <Card>
                                <CardContent className="py-12 text-center">
                                    <Calculator className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                    <h3 className="text-lg font-semibold mb-2">Nenhum cálculo ainda</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Comece a usar a calculadora para ver suas estatísticas aqui
                                    </p>
                                    <a
                                        href="/"
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                                    >
                                        Ir para Calculadora
                                    </a>
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
