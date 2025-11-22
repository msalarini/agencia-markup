'use client'

import { useState } from 'react'
import { Users, Building2, User } from 'lucide-react'
import { formatCurrencyValue, type CurrencyCode } from '@/lib/currency/converter'
import { cn } from '@/lib/utils'

interface CommissionSplitProps {
    totalCommission: number
    currency: CurrencyCode
    className?: string
}

export function CommissionSplit({ totalCommission, currency, className }: CommissionSplitProps) {
    const [agentPercent, setAgentPercent] = useState(50)
    const [isOpen, setIsOpen] = useState(false)

    const agentShare = totalCommission * (agentPercent / 100)
    const agencyShare = totalCommission - agentShare

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 flex items-center gap-1"
            >
                <Users className="w-3 h-3" />
                Simular divisão de comissão
            </button>
        )
    }

    return (
        <div className={cn("mt-3 p-3 bg-background/50 rounded-lg border border-blue-100 dark:border-blue-900", className)}>
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Divisão</span>
                </div>
                <button
                    onClick={() => setIsOpen(false)}
                    className="text-xs text-muted-foreground hover:text-foreground"
                >
                    Fechar
                </button>
            </div>

            <div className="space-y-3">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Agência ({100 - agentPercent}%)</span>
                        <span>Agente ({agentPercent}%)</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={agentPercent}
                        onChange={(e) => setAgentPercent(Number(e.target.value))}
                        className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-800 accent-blue-600"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-1 mb-1">
                            <Building2 className="w-3 h-3 text-blue-700" />
                            <span className="text-[10px] text-blue-700 uppercase font-bold">Agência</span>
                        </div>
                        <p className="font-bold text-sm text-blue-900 dark:text-blue-100">
                            {formatCurrencyValue(agencyShare, currency)}
                        </p>
                    </div>
                    <div className="p-2 bg-green-100/50 dark:bg-green-900/30 rounded border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-1 mb-1">
                            <User className="w-3 h-3 text-green-700" />
                            <span className="text-[10px] text-green-700 uppercase font-bold">Você</span>
                        </div>
                        <p className="font-bold text-sm text-green-900 dark:text-green-100">
                            {formatCurrencyValue(agentShare, currency)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
