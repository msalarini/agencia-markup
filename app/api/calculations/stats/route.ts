import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
    try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
        }

        // Buscar todos os cálculos do usuário
        const { data: calculations, error } = await supabase
            .from('calculations')
            .select('*')
            .eq('user_id', user.id)

        if (error) {
            console.error('Erro ao buscar estatísticas:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        // Calcular métricas
        const totalCalculations = calculations.length
        const totalRevenue = calculations.reduce((sum, calc) => sum + parseFloat(calc.final_price), 0)
        const totalProfit = calculations.reduce((sum, calc) => sum + parseFloat(calc.profit), 0)
        const averageMarkup = calculations.length > 0
            ? calculations.reduce((sum, calc) => sum + parseFloat(calc.markup), 0) / calculations.length
            : 0

        // Taxa de conversão (approved / total)
        const approvedCount = calculations.filter(c => c.status === 'approved').length
        const conversionRate = totalCalculations > 0 ? (approvedCount / totalCalculations) * 100 : 0

        // Ticket médio
        const averageTicket = totalCalculations > 0 ? totalRevenue / totalCalculations : 0

        // Evolução mensal (últimos 6 meses)
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

        const monthlyData = calculations
            .filter(calc => new Date(calc.created_at) >= sixMonthsAgo)
            .reduce((acc, calc) => {
                const date = new Date(calc.created_at)
                const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
                const monthLabel = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })

                if (!acc[monthKey]) {
                    acc[monthKey] = { month: monthLabel, count: 0, revenue: 0, sortKey: monthKey }
                }
                acc[monthKey].count++
                acc[monthKey].revenue += parseFloat(calc.final_price)
                return acc
            }, {} as Record<string, { month: string; count: number; revenue: number; sortKey: string }>)

        const evolution = Object.values(monthlyData).sort((a, b) =>
            (a as { sortKey: string }).sortKey.localeCompare((b as { sortKey: string }).sortKey)
        )

        return NextResponse.json({
            metrics: {
                totalCalculations,
                totalRevenue,
                totalProfit,
                averageMarkup: Math.round(averageMarkup * 100) / 100,
                conversionRate: Math.round(conversionRate * 100) / 100,
                averageTicket: Math.round(averageTicket * 100) / 100
            },
            evolution
        })
    } catch (error) {
        console.error('Erro:', error)
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}
