'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { SUPPORTED_CURRENCIES, type CurrencyCode, type CurrencyRate } from '@/lib/currency/converter'
import { useProStatus } from '@/hooks/useProStatus'
import { Loader2 } from 'lucide-react'

interface CurrencySelectorProps {
    value: CurrencyCode
    onChange: (currency: CurrencyCode) => void
    showRate?: boolean
}

export const CurrencySelector = ({ value, onChange, showRate = true }: CurrencySelectorProps) => {
    const { isPro } = useProStatus()
    const [rates, setRates] = useState<CurrencyRate[]>([])
    const [loading, setLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState<string>('')

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('/api/currency/rates')
                const data = await response.json()
                setRates(data.rates)
                setLastUpdate(data.lastUpdate)
            } catch (error) {
                console.error('Erro ao buscar taxas:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRates()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value as CurrencyCode

        if (!isPro && newCurrency !== 'BRL') {
            // Redirecionar para upgrade
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
            <Label htmlFor="currency-select">Moeda</Label>
            <div className="relative">
                <select
                    id="currency-select"
                    value={value}
                    onChange={handleChange}
                    disabled={loading}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? (
                        <option>Carregando...</option>
                    ) : (
                        Object.values(SUPPORTED_CURRENCIES).map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.flag} {currency.name} ({currency.code})
                                {!isPro && currency.code !== 'BRL' ? ' - PRO' : ''}
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

            {!isPro && value !== 'BRL' && (
                <Badge variant="secondary" className="text-xs">
                    Feature PRO - Faça upgrade para usar outras moedas
                </Badge>
            )}
        </div>
    )
}
