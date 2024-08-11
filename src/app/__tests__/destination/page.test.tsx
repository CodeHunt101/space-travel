import React from 'react'
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react'
import '@testing-library/jest-dom'
import Destination from '@/app/destination/page'
import { SpaceTravelData } from '@/app/utils/types'
import { DataContext } from '@/app/context/DataContext'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}))

// Mock the Tabs component
jest.mock('../../components/Tabs', () => {
  return function MockedTabs({
    items,
    onTabChange,
  }: {
    items: string[]
    onTabChange: (item: string) => void
  }) {
    return (
      <div data-testid="mocked-tabs">
        {items.map((item) => (
          <button key={item} onClick={() => onTabChange(item)}>
            {item}
          </button>
        ))}
      </div>
    )
  }
})

const mockData: SpaceTravelData = {
  destinations: [
    {
      name: 'Moon',
      images: { webp: '/moon.webp', png: '/moon.png' },
      description: 'Moon description',
      distance: '384,400 km',
      travel: '3 days',
    },
    {
      name: 'Mars',
      images: { webp: '/mars.webp', png: '/mars.png' },
      description: 'Mars description',
      distance: '225 mil. km',
      travel: '9 months',
    },
  ],
}

const renderWithProvider = (component: React.ReactNode) => {
  return render(
    <DataContext.Provider value={mockData}>{component}</DataContext.Provider>
  )
}

describe('Destination Component', () => {
  afterEach(cleanup)

  test('renders the Tabs component inside a Suspense boundary', async () => {
    renderWithProvider(<Destination />)

    expect(screen.getByText('Loading tabs...')).toBeInTheDocument()
  })

  test('renders without crashing', () => {
    renderWithProvider(<Destination />)
    expect(screen.getByText('Pick your destination')).toBeInTheDocument()
  })

  test('displays the first destination by default', () => {
    renderWithProvider(<Destination />)
    const heading = screen.getByRole('heading', { name: 'Moon' })
    expect(heading).toBeInTheDocument()
  })

  test('displays the correct description for the first destination', () => {
    renderWithProvider(<Destination />)
    expect(screen.getByText('Moon description')).toBeInTheDocument()
  })

  test('displays the correct distance for the first destination', () => {
    renderWithProvider(<Destination />)
    expect(screen.getByText('384,400 km')).toBeInTheDocument()
  })

  test('displays the correct travel time for the first destination', () => {
    renderWithProvider(<Destination />)
    expect(screen.getByText('3 days')).toBeInTheDocument()
  })

  test('changes destination when a new tab is selected', async () => {
    renderWithProvider(<Destination />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-tabs')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Mars'))
    expect(screen.getByRole('heading', { name: 'Mars' })).toBeInTheDocument()
  })

  test('displays the correct description after changing the tab', async () => {
    renderWithProvider(<Destination />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-tabs')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Mars'))
    expect(screen.getByText('Mars description')).toBeInTheDocument()
  })

  test('displays the correct distance after changing the tab', async () => {
    renderWithProvider(<Destination />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-tabs')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Mars'))
    expect(screen.getByText('225 mil. km')).toBeInTheDocument()
  })

  test('displays the correct travel time after changing the tab', async () => {
    renderWithProvider(<Destination />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-tabs')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Mars'))
    expect(screen.getByText('9 months')).toBeInTheDocument()
  })

  test('displays the correct image for the current destination', () => {
    renderWithProvider(<Destination />)
    const image = screen.getByAltText('Moon')
    expect(image).toHaveAttribute('src', '/moon.webp')
  })

  test('has the correct ARIA attributes for accessibility', () => {
    renderWithProvider(<Destination />)
    const heading = screen.getByText('Pick your destination')
    expect(heading).toHaveAttribute('id', 'destination-heading')
  })

  test('renders the destination section with correct ARIA attribute', () => {
    renderWithProvider(<Destination />)
    const section = screen.getByRole('region', {
      name: /Pick your destination/i,
    })
    expect(section).toHaveAttribute('aria-labelledby', 'destination-heading')
  })

  test('renders the Tabs component after loading', async () => {
    renderWithProvider(<Destination />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-tabs')).toBeInTheDocument()
    })
  })
})
