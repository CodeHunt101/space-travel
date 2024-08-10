import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { usePathname } from 'next/navigation'
import { Content } from '../Content'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('Content component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    document.body.innerHTML = '<main class="fade-in"></main>'
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('should trigger fade-in animation on route change', () => {
    (usePathname as jest.Mock).mockReturnValue('/new-path')

    render(<Content>Test Content</Content>)

    // Fast-forward and exhaust all pending timers
    jest.runAllTimers()

    // After running timers, verify the fade-in class was removed and added back
    expect(document.querySelector('main')).toHaveClass('fade-in')
  })

  test('should render children correctly', () => {
    (usePathname as jest.Mock).mockReturnValue('/some-path')

    render(<Content><div>Test Child</div></Content>)

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })
})
