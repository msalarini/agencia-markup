import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CurrencyInput } from './currency-input'

describe('CurrencyInput Component', () => {
  it('should render with R$ prefix', () => {
    render(<CurrencyInput value="0" onValueChange={() => {}} />)
    expect(screen.getByText('R$')).toBeInTheDocument()
  })

  it('should display formatted value', () => {
    render(<CurrencyInput value="1234.56" onValueChange={() => {}} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('1.234,56')
  })

  it('should handle user input with formatting', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<CurrencyInput value="0" onValueChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, '123456')
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('should clear value when empty', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<CurrencyInput value="100" onValueChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    await user.clear(input)
    
    expect(handleChange).toHaveBeenCalledWith('0')
  })

  it('should apply custom className', () => {
    const { container } = render(
      <CurrencyInput value="0" onValueChange={() => {}} className="custom-class" />
    )
    const input = container.querySelector('input')
    expect(input?.className).toContain('custom-class')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<CurrencyInput value="0" onValueChange={() => {}} disabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('should handle placeholder', () => {
    render(
      <CurrencyInput value="0" onValueChange={() => {}} placeholder="Digite o valor" />
    )
    expect(screen.getByPlaceholderText('Digite o valor')).toBeInTheDocument()
  })

  it('should have numeric input mode', () => {
    render(<CurrencyInput value="0" onValueChange={() => {}} />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('inputMode', 'numeric')
  })

  it('should ignore non-numeric characters', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    
    render(<CurrencyInput value="0" onValueChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'abc123')
    
    const inputElement = screen.getByRole('textbox') as HTMLInputElement
    expect(inputElement.value).toBe('1,23')
  })

  it('should display empty string for zero value', () => {
    render(<CurrencyInput value="0" onValueChange={() => {}} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('')
  })

  it('should format large numbers correctly', () => {
    render(<CurrencyInput value="1000000" onValueChange={() => {}} />)
    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input.value).toBe('1.000.000,00')
  })
})
