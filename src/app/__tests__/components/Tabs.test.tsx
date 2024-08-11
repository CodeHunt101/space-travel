import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Tabs from '@/app/components/Tabs'

describe('Tabs Component', () => {
  const mockOnTabChange = jest.fn()
  const items = ['Tab 1', 'Tab 2', 'Tab 3']

  beforeEach(() => {
    mockOnTabChange.mockClear()
  })

  test('renders the correct number of tabs', () => {
    render(<Tabs items={items} onTabChange={mockOnTabChange} />)

    const tabs = screen.getAllByRole('tab')
    expect(tabs).toHaveLength(items.length)
  })

  test('first tab is selected initially', () => {
    render(<Tabs items={items} onTabChange={mockOnTabChange} />)

    const firstTab = screen.getAllByRole('tab')[0]
    expect(firstTab).toHaveAttribute('aria-selected', 'true')
  })

  test('clicking a tab triggers onTabChange with correct item', () => {
    render(<Tabs items={items} onTabChange={mockOnTabChange} />)

    const secondTab = screen.getAllByRole('tab')[1]
    fireEvent.click(secondTab)

    expect(mockOnTabChange).toHaveBeenCalledWith(items[1])
  })

  test('clicking a tab changes its selected state', () => {
    render(<Tabs items={items} onTabChange={mockOnTabChange} />)

    const secondTab = screen.getAllByRole('tab')[1]
    fireEvent.click(secondTab)

    expect(secondTab).toHaveAttribute('aria-selected', 'true')
  })

  test('only one tab is selected at a time', () => {
    render(<Tabs items={items} onTabChange={mockOnTabChange} />)

    const tabs = screen.getAllByRole('tab')

    fireEvent.click(tabs[1])
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false')

    fireEvent.click(tabs[2])
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[1]).toHaveAttribute('aria-selected', 'false')
  })

  test('tab displays the correct text', () => {
    render(<Tabs items={items} onTabChange={mockOnTabChange} />)

    const firstTab = screen.getByText(items[0])
    expect(firstTab).toBeInTheDocument()
  })
})
