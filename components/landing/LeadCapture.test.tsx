import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { LeadCapture } from './LeadCapture'

describe('LeadCapture', () => {
    it('renders the title and description', () => {
        render(<LeadCapture />)
        expect(screen.getByText('Versão PRO em breve!')).toBeInTheDocument()
        expect(screen.getByText(/Quer ser avisado/)).toBeInTheDocument()
    })

    it('allows entering an email and submitting', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
            })
        ) as any

        render(<LeadCapture />)

        const input = screen.getByPlaceholderText('Seu melhor e-mail')
        const button = screen.getByRole('button', { name: /Me avise/i })

        fireEvent.change(input, { target: { value: 'test@example.com' } })
        expect(input).toHaveValue('test@example.com')

        fireEvent.click(button)

        await waitFor(() => {
            expect(screen.getByText('Obrigado! Você está na lista.')).toBeInTheDocument()
        })
    })
})
