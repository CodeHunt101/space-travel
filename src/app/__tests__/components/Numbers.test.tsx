import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Numbers from '@/app/components/Numbers'

describe('Numbers Component', () => {
  const mockOnNumberChange = jest.fn()
  const items = ['Item 1', 'Item 2', 'Item 3']

  beforeEach(() => {
    mockOnNumberChange.mockClear()
  })

  test('renders the correct number of number buttons', () => {
    render(<Numbers items={items} onNumberChange={mockOnNumberChange} />)

    const numberButtons = screen.getAllByRole('tab')
    expect(numberButtons).toHaveLength(items.length)
  })

  test('first number is selected initially', () => {
    render(<Numbers items={items} onNumberChange={mockOnNumberChange} />)

    const firstNumberButton = screen.getAllByRole('tab')[0]
    expect(firstNumberButton).toHaveAttribute('aria-selected', 'true')
  })

  test('clicking a number triggers onNumberChange with correct item', () => {
    render(<Numbers items={items} onNumberChange={mockOnNumberChange} />)

    const secondNumberButton = screen.getAllByRole('tab')[1]
    fireEvent.click(secondNumberButton)

    expect(mockOnNumberChange).toHaveBeenCalledWith(items[1])
  })

  test('clicking a number changes its selected state', () => {
    render(<Numbers items={items} onNumberChange={mockOnNumberChange} />)

    const secondNumberButton = screen.getAllByRole('tab')[1]
    fireEvent.click(secondNumberButton)

    expect(secondNumberButton).toHaveAttribute('aria-selected', 'true')
  })

  test('only one number is selected at a time', () => {
    render(<Numbers items={items} onNumberChange={mockOnNumberChange} />)

    const numberButtons = screen.getAllByRole('tab')

    fireEvent.click(numberButtons[1])
    expect(numberButtons[1]).toHaveAttribute('aria-selected', 'true')
    expect(numberButtons[0]).toHaveAttribute('aria-selected', 'false')

    fireEvent.click(numberButtons[2])
    expect(numberButtons[2]).toHaveAttribute('aria-selected', 'true')
    expect(numberButtons[1]).toHaveAttribute('aria-selected', 'false')
  })

  test('number buttons display the correct text', () => {
    render(<Numbers items={items} onNumberChange={mockOnNumberChange} />)

    items.forEach((_, index) => {
      const numberButton = screen.getByText((index + 1).toString())
      expect(numberButton).toBeInTheDocument()
    })
  })

  test('number button has active class when selected', () => {
    render(<Numbers items={items} onNumberChange={mockOnNumberChange} />)

    const secondNumberButton = screen.getAllByRole('tab')[1]
    fireEvent.click(secondNumberButton)

    expect(secondNumberButton).toHaveClass('active')
  })
})
