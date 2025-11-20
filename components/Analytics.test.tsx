import { render } from '@testing-library/react'
import { Analytics } from './Analytics'

describe('Analytics', () => {
    it('should not render when GA_ID is not set', () => {
        const { container } = render(<Analytics />)
        expect(container.firstChild).toBeNull()
    })
})
