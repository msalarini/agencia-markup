export interface CurrencyRate {
    code: string
    rate: number
    name: string
    updatedAt: Date
}

export const SUPPORTED_CURRENCIES = {
    BRL: { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$', flag: '🇧🇷' },
    USD: { code: 'USD', name: 'Dólar Americano', symbol: '$', flag: '🇺🇸' },
    EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    ARS: { code: 'ARS', name: 'Peso Argentino', symbol: '$', flag: '🇦🇷' }
} as const

export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES

/**
 * Converte um valor de uma moeda para outra
 * Usa BRL como moeda base
 */
export const convertCurrency = (
    amount: number,
    from: CurrencyCode,
    to: CurrencyCode,
    rates: CurrencyRate[]
): number => {
    if (from === to) return amount

    const fromRate = rates.find(r => r.code === from)?.rate || 1
    const toRate = rates.find(r => r.code === to)?.rate || 1

    // Converte para BRL primeiro, depois para moeda de destino
    const inBRL = amount / fromRate
    return inBRL * toRate
}

/**
 * Formata valor com símbolo da moeda
 */
export const formatCurrencyValue = (
    value: number,
    currency: CurrencyCode
): string => {
    const currencyInfo = SUPPORTED_CURRENCIES[currency]
    return `${currencyInfo.symbol} ${value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`
}

/**
 * Calcula a taxa de conversão entre duas moedas
 */
export const getConversionRate = (
    from: CurrencyCode,
    to: CurrencyCode,
    rates: CurrencyRate[]
): number => {
    if (from === to) return 1

    const fromRate = rates.find(r => r.code === from)?.rate || 1
    const toRate = rates.find(r => r.code === to)?.rate || 1

    return toRate / fromRate
}
