import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'

describe('Card Components', () => {
  describe('Card', () => {
    it('should render card element', () => {
      render(<Card>Card Content</Card>)
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      const { container } = render(<Card>Test</Card>)
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('rounded-xl')
      expect(card.className).toContain('border')
      expect(card.className).toContain('bg-card')
    })

    it('should apply custom className', () => {
      const { container } = render(<Card className="custom-card">Test</Card>)
      const card = container.firstChild as HTMLElement
      expect(card.className).toContain('custom-card')
    })

    it('should support ref forwarding', () => {
      const ref = { current: null }
      render(<Card ref={ref}>Test</Card>)
      expect(ref.current).not.toBeNull()
    })
  })

  describe('CardHeader', () => {
    it('should render header element', () => {
      render(<CardHeader>Header Content</CardHeader>)
      expect(screen.getByText('Header Content')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      const { container } = render(<CardHeader>Test</CardHeader>)
      const header = container.firstChild as HTMLElement
      expect(header.className).toContain('flex')
      expect(header.className).toContain('flex-col')
      expect(header.className).toContain('p-6')
    })

    it('should apply custom className', () => {
      const { container } = render(<CardHeader className="custom-header">Test</CardHeader>)
      const header = container.firstChild as HTMLElement
      expect(header.className).toContain('custom-header')
    })
  })

  describe('CardTitle', () => {
    it('should render title element', () => {
      render(<CardTitle>Card Title</CardTitle>)
      expect(screen.getByText('Card Title')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      const { container } = render(<CardTitle>Test</CardTitle>)
      const title = container.firstChild as HTMLElement
      expect(title.className).toContain('font-semibold')
      expect(title.className).toContain('leading-none')
    })

    it('should apply custom className', () => {
      const { container } = render(<CardTitle className="custom-title">Test</CardTitle>)
      const title = container.firstChild as HTMLElement
      expect(title.className).toContain('custom-title')
    })
  })

  describe('CardDescription', () => {
    it('should render description element', () => {
      render(<CardDescription>Card Description</CardDescription>)
      expect(screen.getByText('Card Description')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      const { container } = render(<CardDescription>Test</CardDescription>)
      const description = container.firstChild as HTMLElement
      expect(description.className).toContain('text-sm')
      expect(description.className).toContain('text-muted-foreground')
    })

    it('should apply custom className', () => {
      const { container } = render(<CardDescription className="custom-desc">Test</CardDescription>)
      const description = container.firstChild as HTMLElement
      expect(description.className).toContain('custom-desc')
    })
  })

  describe('CardContent', () => {
    it('should render content element', () => {
      render(<CardContent>Card Content</CardContent>)
      expect(screen.getByText('Card Content')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      const { container } = render(<CardContent>Test</CardContent>)
      const content = container.firstChild as HTMLElement
      expect(content.className).toContain('p-6')
      expect(content.className).toContain('pt-0')
    })

    it('should apply custom className', () => {
      const { container } = render(<CardContent className="custom-content">Test</CardContent>)
      const content = container.firstChild as HTMLElement
      expect(content.className).toContain('custom-content')
    })
  })

  describe('CardFooter', () => {
    it('should render footer element', () => {
      render(<CardFooter>Card Footer</CardFooter>)
      expect(screen.getByText('Card Footer')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      const { container } = render(<CardFooter>Test</CardFooter>)
      const footer = container.firstChild as HTMLElement
      expect(footer.className).toContain('flex')
      expect(footer.className).toContain('items-center')
      expect(footer.className).toContain('p-6')
    })

    it('should apply custom className', () => {
      const { container } = render(<CardFooter className="custom-footer">Test</CardFooter>)
      const footer = container.firstChild as HTMLElement
      expect(footer.className).toContain('custom-footer')
    })
  })

  describe('Card Integration', () => {
    it('should render complete card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
            <CardDescription>Description</CardDescription>
          </CardHeader>
          <CardContent>Content</CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      )

      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('Description')).toBeInTheDocument()
      expect(screen.getByText('Content')).toBeInTheDocument()
      expect(screen.getByText('Footer')).toBeInTheDocument()
    })
  })
})
