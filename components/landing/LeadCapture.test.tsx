import { render, screen, fireEvent } from '@testing-library/react'

import { LeadCapture } from './LeadCapture'

describe('LeadCapture', () => {
    it('renders the title and description', () => {
        render(<LeadCapture />)
        expect(screen.getByText('Versão PRO em breve!')).toBeInTheDocument()
        expect(screen.getByText(/Quer ser avisado/)).toBeInTheDocument()
    })

    it('allows entering an email and submitting', () => {
        render(<LeadCapture />)

        const input = screen.getByPlaceholderText('Seu melhor e-mail')
        const button = screen.getByRole('button', { name: /Me avise/i })

        fireEvent.change(input, { target: { value: 'test@example.com' } })
        expect(input).toHaveValue('test@example.com')

        fireEvent.click(button)

        expect(screen.getByText('Obrigado! Você está na lista.')).toBeInTheDocument()
    })
})
