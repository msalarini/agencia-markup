import { describe, it, expect } from 'vitest'
import {
  formatCurrency,
  formatPercent,
  parseCurrency,
  maskCurrency,
  isValidCurrency,
  sanitizeCurrencyInput,
} from './currency'

describe('formatCurrency', () => {
  it('should format number as Brazilian currency', () => {
    expect(formatCurrency(1234.56)).toBe('R$\xa01.234,56')
  })

  it('should format zero correctly', () => {
    expect(formatCurrency(0)).toBe('R$\xa00,00')
  })

  it('should handle negative numbers', () => {
    expect(formatCurrency(-100)).toBe('-R$\xa0100,00')
  })

  it('should handle large numbers', () => {
    expect(formatCurrency(1000000)).toBe('R$\xa01.000.000,00')
  })

  it('should return default format for NaN', () => {
    const result = formatCurrency(NaN)
    expect(result).toContain('R$')
    expect(result).toContain('0,00')
  })
})

describe('formatPercent', () => {
  it('should format number as percentage', () => {
    expect(formatPercent(12.34)).toBe('12,34%')
  })

  it('should format zero correctly', () => {
    expect(formatPercent(0)).toBe('0,00%')
  })

  it('should handle decimals', () => {
    expect(formatPercent(99.99)).toBe('99,99%')
  })

  it('should return 0,00% for NaN', () => {
    expect(formatPercent(NaN)).toBe('0,00%')
  })
})

describe('parseCurrency', () => {
  it('should parse Brazilian currency format', () => {
    expect(parseCurrency('R$ 1.234,56')).toBe(1234.56)
  })

  it('should parse simple comma format', () => {
    expect(parseCurrency('1234,56')).toBe(1234.56)
  })

  it('should handle empty string', () => {
    expect(parseCurrency('')).toBe(0)
  })

  it('should handle only digits', () => {
    expect(parseCurrency('1234')).toBe(1234)
  })

  it('should remove invalid characters', () => {
    expect(parseCurrency('R$ 1.234,56 abc')).toBe(1234.56)
  })

  it('should return 0 for invalid input', () => {
    expect(parseCurrency('abc')).toBe(0)
  })
})

describe('maskCurrency', () => {
  it('should mask digits as currency', () => {
    expect(maskCurrency('123456')).toBe('1.234,56')
  })

  it('should handle small values', () => {
    expect(maskCurrency('100')).toBe('1,00')
  })

  it('should handle large values', () => {
    expect(maskCurrency('100000000')).toBe('1.000.000,00')
  })

  it('should return empty string for empty input', () => {
    expect(maskCurrency('')).toBe('')
  })

  it('should handle single digit', () => {
    expect(maskCurrency('5')).toBe('0,05')
  })

  it('should ignore non-digit characters', () => {
    expect(maskCurrency('12abc34')).toBe('12,34')
  })
})

describe('isValidCurrency', () => {
  it('should return true for valid positive number', () => {
    expect(isValidCurrency('1234,56')).toBe(true)
  })

  it('should return true for zero', () => {
    expect(isValidCurrency('0')).toBe(true)
  })

  it('should return false for negative number', () => {
    expect(isValidCurrency('-100')).toBe(false)
  })

  it('should return true for empty string (treated as 0)', () => {
    expect(isValidCurrency('')).toBe(true)
  })

  it('should return true for invalid text (treated as 0)', () => {
    expect(isValidCurrency('abc')).toBe(true)
  })
})

describe('sanitizeCurrencyInput', () => {
  it('should return positive number for valid input', () => {
    expect(sanitizeCurrencyInput('1234,56')).toBe(1234.56)
  })

  it('should return 0 for negative number', () => {
    expect(sanitizeCurrencyInput('-100')).toBe(0)
  })

  it('should return 0 for empty string', () => {
    expect(sanitizeCurrencyInput('')).toBe(0)
  })

  it('should return 0 for invalid input', () => {
    expect(sanitizeCurrencyInput('abc')).toBe(0)
  })

  it('should handle zero correctly', () => {
    expect(sanitizeCurrencyInput('0')).toBe(0)
  })
})
