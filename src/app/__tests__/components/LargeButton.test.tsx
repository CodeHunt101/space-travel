import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LargeButton from '@/app/components/LargeButton'

describe('LargeButton Component', () => {
  test('renders an anchor element with the role of button', () => {
    render(<LargeButton />)
    const anchorElement = screen.getByRole('button')
    expect(anchorElement).toBeInTheDocument()
  })

  test('anchor element has correct href attribute', () => {
    render(<LargeButton />)
    const anchorElement = screen.getByRole('button')
    expect(anchorElement).toHaveAttribute('href', '#')
  })

  test('anchor element has correct aria-label attribute', () => {
    render(<LargeButton />)
    const anchorElement = screen.getByRole('button')
    expect(anchorElement).toHaveAttribute(
      'aria-label',
      'Explore more about space travel'
    )
  })

  test('anchor element has correct class names', () => {
    render(<LargeButton />)
    const anchorElement = screen.getByRole('button')
    expect(anchorElement).toHaveClass('uppercase ff-serif text-dark bg-white')
  })

  test('anchor element contains a div with text "Explore"', () => {
    render(<LargeButton />)
    const anchorElement = screen.getByRole('button')
    const divElement = anchorElement.querySelector('div')
    expect(divElement).toHaveTextContent('Explore')
  })

  test('anchor element has the correct style class', () => {
    render(<LargeButton />)
    const anchorElement = screen.getByRole('button')
    expect(anchorElement).toHaveClass('large-button')
  })
})
