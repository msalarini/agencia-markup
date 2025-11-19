/**
 * Formata um número para moeda brasileira (R$ 1.234,56)
 */
export function formatCurrency(value: number): string {
  if (isNaN(value)) return 'R$ 0,00'
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Formata um número para percentual (12,34%)
 */
export function formatPercent(value: number): string {
  if (isNaN(value)) return '0,00%'
  return `${value.toFixed(2).replace('.', ',')}%`
}

/**
 * Remove formatação de moeda e converte para número
 * "R$ 1.234,56" -> 1234.56
 */
export function parseCurrency(value: string): number {
  if (!value) return 0
  
  // Detecta se o número é negativo
  const isNegative = value.includes('-')
  
  const cleaned = value
    .replace(/[^\d,]/g, '') // Remove tudo exceto dígitos e vírgula
    .replace(',', '.') // Troca vírgula por ponto
  
  const number = parseFloat(cleaned)
  const result = isNaN(number) ? 0 : number
  
  return isNegative ? -result : result
}

/**
 * Aplica máscara de moeda enquanto o usuário digita
 * 1234.56 -> "R$ 1.234,56"
 */
export function maskCurrency(value: string): string {
  if (!value) return ''
  
  // Remove tudo que não é dígito
  const digits = value.replace(/\D/g, '')
  
  if (!digits) return ''
  
  // Converte para centavos
  const cents = parseInt(digits, 10)
  
  // Divide por 100 para obter reais
  const reais = cents / 100
  
  // Formata como moeda
  return formatCurrency(reais).replace('R$\xa0', '')
}

/**
 * Valida se o valor é um número válido e não negativo
 */
export function isValidCurrency(value: string): boolean {
  const number = parseCurrency(value)
  return !isNaN(number) && number >= 0
}

/**
 * Converte string de entrada para número, garantindo valor não negativo
 */
export function sanitizeCurrencyInput(value: string): number {
  const number = parseCurrency(value)
  return Math.max(0, isNaN(number) ? 0 : number)
}
