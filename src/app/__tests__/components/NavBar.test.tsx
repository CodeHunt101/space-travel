import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { usePathname } from 'next/navigation'
import NavBar from '@/app/components/NavBar'
import { Path } from '@/app/utils/types'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('NavBar Component', () => {
  beforeEach(() => {
    ;(usePathname as jest.Mock).mockReturnValue('/')
  })

  test('renders navigation bar with closed menu button initially', () => {
    render(<NavBar />)

    const button = screen.getByRole('button', { name: /open menu/i })
    expect(button).toBeInTheDocument()
  })

  test('navigation bar has closed class initially', () => {
    render(<NavBar />)

    const navWrapper = screen.getByTestId('nav-wrapper')
    expect(navWrapper).toHaveClass('closed')
  })

  test('toggles button label to close menu when clicked', () => {
    render(<NavBar />)

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-label', 'Close menu')
  })

  test('navigation wrapper has open class when button is clicked', () => {
    render(<NavBar />)

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)

    const navWrapper = screen.getByTestId('nav-wrapper')
    expect(navWrapper).toHaveClass('open')
  })

  test('toggles button label back to open menu when clicked again', () => {
    render(<NavBar />)

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    fireEvent.click(button)

    expect(button).toHaveAttribute('aria-label', 'Open menu')
  })

  test('navigation wrapper has closed class when button is clicked again', () => {
    render(<NavBar />)

    const button = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(button)
    fireEvent.click(button)

    const navWrapper = screen.getByTestId('nav-wrapper')
    expect(navWrapper).toHaveClass('closed')
  })

  test('renders Home navigation item', () => {
    render(<NavBar />)

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  test('renders Destination navigation item', () => {
    render(<NavBar />)

    expect(screen.getByText('Destination')).toBeInTheDocument()
  })

  test('renders Crew navigation item', () => {
    render(<NavBar />)

    expect(screen.getByText('Crew')).toBeInTheDocument()
  })

  test('renders Technology navigation item', () => {
    render(<NavBar />)

    expect(screen.getByText('Technology')).toBeInTheDocument()
  })

  test('highlights Home navigation item when active', () => {
    ;(usePathname as jest.Mock).mockReturnValue(Path.HOME)
    render(<NavBar />)

    const homeLink = screen.getByText('Home').closest('li')
    expect(homeLink).toHaveClass('active')
  })

  test('does not highlight Destination navigation item when Home is active', () => {
    ;(usePathname as jest.Mock).mockReturnValue(Path.HOME)
    render(<NavBar />)

    const destinationLink = screen.getByText('Destination').closest('li')
    expect(destinationLink).not.toHaveClass('active')
  })
})
