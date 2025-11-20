import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { LeadCapture } from './LeadCapture'

describe('LeadCapture', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.spyOn(window, 'alert').mockImplementation(() => { })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('renders the title and description', () => {
        render(<LeadCapture />)
        expect(screen.getByText('Versão PRO em breve!')).toBeInTheDocument()
        expect(screen.getByText(/Quer ser avisado/)).toBeInTheDocument()
    })

    it('allows entering an email and submitting successfully', async () => {
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

    it('shows error alert when API returns error', async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
            })
        ) as any

        render(<LeadCapture />)

        const input = screen.getByPlaceholderText('Seu melhor e-mail')
        const button = screen.getByRole('button', { name: /Me avise/i })

        fireEvent.change(input, { target: { value: 'test@example.com' } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Erro ao cadastrar email. Tente novamente.')
        })
    })

    it('shows error alert when network fails', async () => {
        global.fetch = vi.fn(() => Promise.reject(new Error('Network error'))) as any

        render(<LeadCapture />)

        const input = screen.getByPlaceholderText('Seu melhor e-mail')
        const button = screen.getByRole('button', { name: /Me avise/i })

        fireEvent.change(input, { target: { value: 'test@example.com' } })
        fireEvent.click(button)

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Erro ao cadastrar email. Tente novamente.')
        })
    })
})
