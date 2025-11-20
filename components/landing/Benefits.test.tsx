import { render, screen } from '@testing-library/react'

import { Benefits } from './Benefits'

describe('Benefits', () => {
    it('renders the section title', () => {
        render(<Benefits />)
        expect(screen.getByText('Por que usar o LucroTur?')).toBeInTheDocument()
    })

    it('renders all benefits', () => {
        render(<Benefits />)
        expect(screen.getByText('Nunca mais esqueça quanto deveria ter cobrado')).toBeInTheDocument()
        expect(screen.getByText('Padronize o markup da sua equipe')).toBeInTheDocument()
        expect(screen.getByText('Análise de descontos em tempo real')).toBeInTheDocument()
    })
})
