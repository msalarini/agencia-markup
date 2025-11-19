import { render, screen } from '@testing-library/react'

import { TargetAudience } from './TargetAudience'

describe('TargetAudience', () => {
    it('renders the section title', () => {
        render(<TargetAudience />)
        expect(screen.getByText('Pra quem é o PricePro?')).toBeInTheDocument()
    })

    it('renders all 3 target audience bullets', () => {
        render(<TargetAudience />)

        const items = [
            "Donos de pequenas agências que não querem errar no preço.",
            "Vendedores que precisam responder rápido no WhatsApp.",
            "Gente que ainda usa Excel ou calculadora manual."
        ]

        items.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument()
        })
    })

    it('renders check icons', () => {
        const { container } = render(<TargetAudience />)
        // Check for the lucide icon class or SVG
        const icons = container.querySelectorAll('.lucide-check-circle-2')
        expect(icons.length).toBe(3)
    })
})
