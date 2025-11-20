import { render } from '@testing-library/react'
import { Analytics } from './Analytics'

describe('Analytics', () => {
    const originalEnv = process.env.NEXT_PUBLIC_GA_ID

    afterEach(() => {
        process.env.NEXT_PUBLIC_GA_ID = originalEnv
    })

    it('should not render when GA_ID is not set', () => {
        delete process.env.NEXT_PUBLIC_GA_ID
        const { container } = render(<Analytics />)
        expect(container.firstChild).toBeNull()
    })

    it('should render scripts when GA_ID is set', () => {
        process.env.NEXT_PUBLIC_GA_ID = 'G-TEST123'
        render(<Analytics />)
        const script = document.querySelector('script[src*="googletagmanager.com/gtag/js"]')
        expect(script).not.toBeNull()
        expect(script?.getAttribute('src')).toContain('G-TEST123')
    })
})
