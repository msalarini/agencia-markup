'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { SUPPORTED_CURRENCIES, type CurrencyCode, type CurrencyRate } from '@/lib/currency/converter'

import { Loader2 } from 'lucide-react'

interface CurrencySelectorProps {
    value: CurrencyCode
    onChange: (currency: CurrencyCode) => void
    showRate?: boolean
    isPro: boolean
}

export const CurrencySelector = ({ value, onChange, showRate = true, isPro }: CurrencySelectorProps) => {
    // const { isPro } = useProStatus() - Removed to use prop from parent
    const [rates, setRates] = useState<CurrencyRate[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState<string>('')

    useEffect(() => {
        let mounted = true

        const fetchRates = async () => {
            try {
                // Timeout de 5 segundos para não ficar travado
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 5000)

                const response = await fetch('/api/currency/rates', {
                    signal: controller.signal,
                    next: { revalidate: 3600 }
                })
                clearTimeout(timeoutId)

                if (!response.ok) throw new Error('Falha na API')

                const data = await response.json()
                if (mounted) {
                    setRates(data.rates)
                    setLastUpdate(data.lastUpdate)
                }
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.warn('Timeout ao buscar taxas (5s) - Usando valores offline')
                } else {
                    console.error('Erro ao buscar taxas:', error)
                }
                // Fallback silencioso - usa moedas suportadas sem taxa dinâmica
            } finally {
                if (mounted) setLoading(false)
            }
        }

        fetchRates()

        return () => { mounted = false }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value as CurrencyCode

        if (!isPro && newCurrency !== 'BRL') {
            window.location.href = '/pro'
            return
        }
        onChange(newCurrency)
    }

    const currentRate = rates.find(r => r.code === value)
    const timeSinceUpdate = lastUpdate
        ? Math.floor((Date.now() - new Date(lastUpdate).getTime()) / (1000 * 60 * 60))
        : 0

    return (
        <div className="space-y-2">
            <Label htmlFor="currency-select" className="flex items-center gap-2">
                Moeda
                {!isPro && (
                    <Badge variant="secondary" className="text-[10px] px-1 h-5">
                        Opções PRO
                    </Badge>
                )}
            </Label>
            <div className="relative">
                <select
                    id="currency-select"
                    value={value}
                    onChange={handleChange}
                    disabled={loading}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? (
                        <option>Carregando moedas...</option>
                    ) : (
                        Object.values(SUPPORTED_CURRENCIES).map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.flag} {currency.name} ({currency.code})
                                {!isPro && currency.code !== 'BRL' ? ' (PRO)' : ''}
                            </option>
                        ))
                    )}
                </select>
                {loading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                )}
            </div>

            {showRate && currentRate && value !== 'BRL' && !loading && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>
                        1 {value} = R$ {currentRate.rate.toFixed(4)}
                    </span>
                    {timeSinceUpdate > 0 && (
                        <span>• atualizado há {timeSinceUpdate}h</span>
                    )}
                </div>
            )}
        </div>
    )
}
