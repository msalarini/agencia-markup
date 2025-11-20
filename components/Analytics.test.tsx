import { render, screen } from '@testing-library/react'
import { Analytics } from './Analytics'
import { vi } from 'vitest'

// Mock @vercel/analytics/react
vi.mock('@vercel/analytics/react', () => ({
    Analytics: () => <div data-testid="vercel-analytics" />,
}))

describe('Analytics', () => {
    it('should render Vercel Analytics', () => {
        render(<Analytics />)
        expect(screen.getByTestId('vercel-analytics')).toBeInTheDocument()
    })
})
