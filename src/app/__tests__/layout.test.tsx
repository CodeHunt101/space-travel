import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import RootLayout from '../layout'

jest.mock('../components/NavBar', () => {
  const MockNavbar = () => <nav data-testid="nav-bar" />
  return MockNavbar
})

describe('RootLayout Component', () => {
  test('renders skip link with correct href attribute', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    )
    const skipLink = screen.getByRole('link', { name: /skip to main content/i })
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  test('renders header element with sticky class', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    )
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toHaveClass('sticky')
  })

  test('renders NavBar component', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>
    )
    const navBarElement = screen.getByTestId('nav-bar')
    expect(navBarElement).toBeInTheDocument()
  })

  test('renders children inside body element', () => {
    render(
      <RootLayout>
        <div data-testid="child" />
      </RootLayout>
    )
    const childElement = screen.getByTestId('child')
    expect(childElement).toBeInTheDocument()
  })
})
