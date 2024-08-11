import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Crew from '@/app/crew/page'
import { SpaceTravelData } from '@/app/utils/types'
import { DataContext } from '@/app/context/DataContext'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

// Mock the Dots component
jest.mock('../../components/Dots', () => {
  return function MockedDots({
    items,
    onDotChange,
  }: {
    items: string[]
    onDotChange: (item: string) => void
  }) {
    return (
      <div data-testid="mocked-dots">
        {items.map((item) => (
          <button key={item} onClick={() => onDotChange(item)}>
            {item}
          </button>
        ))}
      </div>
    )
  }
})

const mockData: SpaceTravelData = {
  crew: [
    {
      name: 'John Doe',
      role: 'Commander',
      images: { webp: '/john_doe.webp', png: '/john_doe.png' },
      bio: 'John Doe bio',
    },
    {
      name: 'Jane Smith',
      role: 'Pilot',
      images: { webp: '/jane_smith.webp', png: '/jane_smith.png' },
      bio: 'Jane Smith bio',
    },
  ],
}

const renderWithProvider = (component: React.ReactNode) => {
  return render(
    <DataContext.Provider value={mockData}>{component}</DataContext.Provider>
  )
}

describe('Crew Component', () => {
  test('renders the Dots component inside a Suspense boundary', async () => {
    renderWithProvider(<Crew />)

    expect(
      screen.getByText('Loading navigation elements...')
    ).toBeInTheDocument()
  })

  test('renders without crashing', () => {
    renderWithProvider(<Crew />)
    expect(screen.getByText('Meet your crew')).toBeInTheDocument()
  })

  test('displays the first crew member by default', () => {
    renderWithProvider(<Crew />)
    const heading = screen.getByRole('heading', { name: 'Commander John Doe' })
    expect(heading).toBeInTheDocument()
  })

  test('displays the correct bio for the first crew member', () => {
    renderWithProvider(<Crew />)
    expect(screen.getByText('John Doe bio')).toBeInTheDocument()
  })

  test('changes crew member when a new dot is selected', async () => {
    renderWithProvider(<Crew />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-dots')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Jane Smith'))
    expect(
      screen.getByRole('heading', { name: 'Pilot Jane Smith' })
    ).toBeInTheDocument()
  })

  test('displays the correct bio after changing the dot', async () => {
    renderWithProvider(<Crew />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-dots')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Jane Smith'))
    expect(screen.getByText('Jane Smith bio')).toBeInTheDocument()
  })

  test('displays the correct image for the current crew member', () => {
    renderWithProvider(<Crew />)
    const image = screen.getByAltText('John Doe')
    expect(image).toHaveAttribute('src', '/john_doe.webp')
  })

  test('has the correct ARIA attributes for accessibility', () => {
    renderWithProvider(<Crew />)
    const heading = screen.getByText('Meet your crew')
    expect(heading).toHaveAttribute('id', 'crew-heading')
  })

  test('renders the crew section with correct ARIA attribute', () => {
    renderWithProvider(<Crew />)
    const section = screen.getByRole('region', { name: /Meet your crew/i })
    expect(section).toHaveAttribute('aria-labelledby', 'crew-heading')
  })

  test('renders the Dots component after loading', async () => {
    renderWithProvider(<Crew />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-dots')).toBeInTheDocument()
    })
  })
})
