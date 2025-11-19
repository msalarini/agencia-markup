import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Label } from './label'

describe('Label Component', () => {
  it('should render label element', () => {
    render(<Label>Test Label</Label>)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('should apply default classes', () => {
    render(<Label>Label</Label>)
    const label = screen.getByText('Label')
    expect(label.className).toContain('text-sm')
    expect(label.className).toContain('font-medium')
  })

  it('should apply custom className', () => {
    render(<Label className="custom-label">Custom</Label>)
    const label = screen.getByText('Custom')
    expect(label.className).toContain('custom-label')
  })

  it('should handle htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Email</Label>)
    const label = screen.getByText('Email')
    expect(label).toHaveAttribute('for', 'test-input')
  })

  it('should render with children', () => {
    render(
      <Label>
        <span>Nested Content</span>
      </Label>
    )
    expect(screen.getByText('Nested Content')).toBeInTheDocument()
  })

  it('should support ref forwarding', () => {
    const ref = { current: null }
    render(<Label ref={ref}>Label with Ref</Label>)
    expect(ref.current).not.toBeNull()
  })
})
