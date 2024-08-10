import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Dots from '@/app/components/Dots'

describe('Dots Component', () => {
  const mockOnDotChange = jest.fn()
  const items = ['Crew Member 1', 'Crew Member 2', 'Crew Member 3']

  beforeEach(() => {
    mockOnDotChange.mockClear()
  })

  test('renders the correct number of dots', () => {
    render(<Dots items={items} onDotChange={mockOnDotChange} />)

    const dots = screen.getAllByRole('tab')
    expect(dots).toHaveLength(items.length)
  })

  test('first dot is selected initially', () => {
    render(<Dots items={items} onDotChange={mockOnDotChange} />)

    const firstDot = screen.getAllByRole('tab')[0]
    expect(firstDot).toHaveAttribute('aria-selected', 'true')
  })

  test('clicking a dot triggers onDotChange with correct item', () => {
    render(<Dots items={items} onDotChange={mockOnDotChange} />)

    const secondDot = screen.getAllByRole('tab')[1]
    fireEvent.click(secondDot)

    expect(mockOnDotChange).toHaveBeenCalledWith(items[1])
  })

  test('clicking a dot changes its selected state', () => {
    render(<Dots items={items} onDotChange={mockOnDotChange} />)

    const secondDot = screen.getAllByRole('tab')[1]
    fireEvent.click(secondDot)

    expect(secondDot).toHaveAttribute('aria-selected', 'true')
  })

  test('only one dot is selected at a time', () => {
    render(<Dots items={items} onDotChange={mockOnDotChange} />)

    const dots = screen.getAllByRole('tab')

    fireEvent.click(dots[1])
    expect(dots[1]).toHaveAttribute('aria-selected', 'true')
    expect(dots[0]).toHaveAttribute('aria-selected', 'false')

    fireEvent.click(dots[2])
    expect(dots[2]).toHaveAttribute('aria-selected', 'true')
    expect(dots[1]).toHaveAttribute('aria-selected', 'false')
  })

  test('renders the correct aria-label for each dot', () => {
    render(<Dots items={items} onDotChange={mockOnDotChange} />)

    const firstDot = screen.getByText(`View information about ${items[0]}`)
    expect(firstDot).toBeInTheDocument()
  })
})
