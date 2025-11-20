import * as React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { maskCurrency, parseCurrency } from '@/lib/currency'

export interface CurrencyInputProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'onChange'> {
  value: string
  onValueChange: (value: string) => void
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState('')

    React.useEffect(() => {
      if (value) {
        const numericValue = parseFloat(value)
        if (!isNaN(numericValue) && numericValue > 0) {
          setDisplayValue(maskCurrency(Math.round(numericValue * 100).toString()))
        } else {
          setDisplayValue('')
        }
      } else {
        setDisplayValue('')
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      
      // Remove tudo que não é dígito
      const digits = inputValue.replace(/\D/g, '')
      
      if (!digits) {
        setDisplayValue('')
        onValueChange('')
        return
      }

      // Aplica máscara
      const masked = maskCurrency(digits)
      setDisplayValue(masked)
      
      // Converte para número e passa para o pai
      const numericValue = parseCurrency(masked)
      onValueChange(numericValue.toString())
    }

    return (
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
          R$
        </span>
        <Input
          {...props}
          ref={ref}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          className={cn('pl-10', className)}
        />
      </div>
    )
  }
)
CurrencyInput.displayName = 'CurrencyInput'

export { CurrencyInput }
