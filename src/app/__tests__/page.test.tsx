import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

jest.mock('../components/LargeButton', () => {
  const MockButton = () => <div data-testid="large-button" />
  return MockButton
})

describe('Home Component', () => {
  test('renders main element with correct class names', () => {
    render(<Home />)
    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('text-accent ff-serif text-accent')
  })

  test('main element contains a section with correct class names', () => {
    render(<Home />)
    const sectionElement = screen.getByRole('region')
    expect(sectionElement).toHaveClass('container flex')
  })

  test('section element has aria-labelledby attribute', () => {
    render(<Home />)
    const sectionElement = screen.getByRole('region')
    expect(sectionElement).toHaveAttribute('aria-labelledby', 'hero-heading')
  })

  test('renders heading with correct text', () => {
    render(<Home />)
    const headingElement = screen.getByRole('heading', {
      name: /so, you want to travel to/i,
    })
    expect(headingElement).toBeInTheDocument()
  })

  test('heading element has correct class names', () => {
    render(<Home />)
    const headingElement = screen.getByRole('heading', {
      name: /so, you want to travel to/i,
    })
    expect(headingElement).toHaveClass(
      'uppercase fs-400 ff-sans-cond letter-spacing-2'
    )
  })

  test('heading contains span with correct text', () => {
    render(<Home />)
    const spanElement = screen.getByText(/space/i, { selector: 'span' })
    expect(spanElement).toBeInTheDocument()
  })

  test('span element has correct class names', () => {
    render(<Home />)
    const spanElement = screen.getByText(/space/i, { selector: 'span' })
    expect(spanElement).toHaveClass('uppercase ff-serif')
  })

  test('renders paragraph with correct text', () => {
    render(<Home />)
    const paragraphElement = screen.getByText(
      /let’s face it; if you want to go to space/i
    )
    expect(paragraphElement).toBeInTheDocument()
  })

  test('paragraph element has correct class names', () => {
    render(<Home />)
    const paragraphElement = screen.getByText(
      /let’s face it; if you want to go to space/i
    )
    expect(paragraphElement).toHaveClass('ff-sans-normal text-accent fs-300')
  })

  test('renders LargeButton component', () => {
    render(<Home />)
    const largeButtonElement = screen.getByTestId('large-button')
    expect(largeButtonElement).toBeInTheDocument()
  })
})
