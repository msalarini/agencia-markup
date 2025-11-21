import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

const CACHE_DURATION_HOURS = 24

interface AwesomeAPIResponse {
    [key: string]: {
        code: string
        codein: string
        name: string
        high: string
        low: string
        varBid: string
        pctChange: string
        bid: string
        ask: string
        timestamp: string
        create_date: string
    }
}

export async function GET() {
    try {
        const supabase = createClient()

        // 1. Verificar cache no Supabase
        const { data: cachedRates, error: cacheError } = await supabase
            .from('currency_rates')
            .select('*')
            .order('updated_at', { ascending: false })

        if (!cacheError && cachedRates && cachedRates.length > 0) {
            const lastUpdate = new Date(cachedRates[0].updated_at)
            const hoursSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60)

            // Se cache é válido (< 24h), retornar
            if (hoursSinceUpdate < CACHE_DURATION_HOURS) {
                return NextResponse.json({
                    rates: cachedRates.map(r => ({
                        code: r.code,
                        rate: parseFloat(r.rate),
                        name: r.name,
                        updatedAt: r.updated_at
                    })),
                    cached: true,
                    lastUpdate: lastUpdate.toISOString()
                })
            }
        }

        // 2. Buscar taxas atualizadas da AwesomeAPI
        const response = await fetch(
            'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,ARS-BRL',
            { next: { revalidate: 86400 } } // Cache de 24h no Next.js também
        )

        if (!response.ok) {
            throw new Error('Falha ao buscar taxas de câmbio')
        }

        const data: AwesomeAPIResponse = await response.json()

        // 3. Processar e atualizar cache
        const rates = [
            { code: 'BRL', rate: 1.0, name: 'Real Brasileiro' },
            { code: 'USD', rate: parseFloat(data.USDBRL.bid), name: 'Dólar Americano' },
            { code: 'EUR', rate: parseFloat(data.EURBRL.bid), name: 'Euro' },
            { code: 'ARS', rate: parseFloat(data.ARSBRL.bid), name: 'Peso Argentino' }
        ]

        // 4. Atualizar Supabase
        for (const rate of rates) {
            await supabase
                .from('currency_rates')
                .upsert({
                    code: rate.code,
                    rate: rate.rate,
                    name: rate.name,
                    updated_at: new Date().toISOString()
                })
        }

        return NextResponse.json({
            rates: rates.map(r => ({
                ...r,
                updatedAt: new Date().toISOString()
            })),
            cached: false,
            lastUpdate: new Date().toISOString()
        })

    } catch (error) {
        console.error('Erro ao buscar taxas de câmbio:', error)

        // Fallback: retornar cache mesmo que expirado
        const supabase = createClient()
        const { data: fallbackRates } = await supabase
            .from('currency_rates')
            .select('*')

        if (fallbackRates && fallbackRates.length > 0) {
            return NextResponse.json({
                rates: fallbackRates.map(r => ({
                    code: r.code,
                    rate: parseFloat(r.rate),
                    name: r.name,
                    updatedAt: r.updated_at
                })),
                cached: true,
                error: 'Usando cache devido a erro na API',
                lastUpdate: fallbackRates[0].updated_at
            })
        }

        return NextResponse.json(
            { error: 'Erro ao buscar taxas de câmbio' },
            { status: 500 }
        )
    }
}
