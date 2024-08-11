import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import BaseNavigator from '@/app/components/BaseNavigator'

describe('BaseNavigator', () => {
  const mockItems = ['Item 1', 'Item 2', 'Item 3']
  const mockOnItemChange = jest.fn()
  const mockRenderButton = (
    item: string,
    index: number,
    isSelected: boolean,
    handleClick: () => void
  ) => (
    // eslint-disable-next-line jsx-a11y/role-supports-aria-props
    <button
      key={index}
      onClick={handleClick}
      data-testid={`button-${index}`}
      aria-selected={isSelected}
    >
      {item}
    </button>
  )
  const mockClassName = 'test-class'
  const mockAriaLabel = 'Test Navigator'

  const renderComponent = (props = {}) => {
    return render(
      <BaseNavigator
        items={mockItems}
        onItemChange={mockOnItemChange}
        renderButton={mockRenderButton}
        className={mockClassName}
        ariaLabel={mockAriaLabel}
        {...props}
      />
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders correctly with given props', () => {
    renderComponent()

    const nav = screen.getByRole('tablist')
    expect(nav).toHaveClass(mockClassName)
    expect(nav).toHaveAttribute('aria-label', mockAriaLabel)

    mockItems.forEach((item, index) => {
      const button = screen.getByTestId(`button-${index}`)
      expect(button).toHaveTextContent(item)
    })
  })

  test('selects the first item by default', () => {
    renderComponent()

    const firstButton = screen.getByTestId('button-0')
    expect(firstButton).toHaveAttribute('aria-selected', 'true')
  })

  test('calls onItemChange with the correct item when a button is clicked', () => {
    renderComponent()

    const secondButton = screen.getByTestId('button-1')
    fireEvent.click(secondButton)

    expect(mockOnItemChange).toHaveBeenCalledWith('Item 2')
  })

  test('updates the selected item when a button is clicked', () => {
    renderComponent()

    const secondButton = screen.getByTestId('button-1')
    fireEvent.click(secondButton)

    expect(secondButton).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByTestId('button-0')).toHaveAttribute(
      'aria-selected',
      'false'
    )
  })

  test('renders custom button content using renderButton prop', () => {
    const customRenderButton = (
      item: string,
      index: number,
      isSelected: boolean,
      handleClick: () => void
    ) => (
      // eslint-disable-next-line jsx-a11y/role-supports-aria-props
      <span
        key={index}
        onClick={handleClick}
        data-testid={`custom-button-${index}`}
        role="button"
        aria-selected={isSelected}
      >
        Custom {item}
      </span>
    )

    renderComponent({ renderButton: customRenderButton })

    mockItems.forEach((item, index) => {
      const customButton = screen.getByTestId(`custom-button-${index}`)
      expect(customButton).toHaveTextContent(`Custom ${item}`)
    })
  })

  test('handles empty items array', () => {
    renderComponent({ items: [] })

    const nav = screen.getByRole('tablist')
    expect(nav).toBeEmptyDOMElement()
  })

  test('maintains selected state across re-renders', () => {
    const { rerender } = renderComponent()

    const secondButton = screen.getByTestId('button-1')
    fireEvent.click(secondButton)

    rerender(
      <BaseNavigator
        items={mockItems}
        onItemChange={mockOnItemChange}
        renderButton={mockRenderButton}
        className={mockClassName}
        ariaLabel={mockAriaLabel}
      />
    )

    expect(secondButton).toHaveAttribute('aria-selected', 'true')
  })
})
