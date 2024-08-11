import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Technology from '@/app/technology/page'
import { SpaceTravelData } from '@/app/utils/types'
import { DataContext } from '@/app/context/DataContext'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
  }: {
    src: string
    alt: string
    className: string
    // eslint-disable-next-line @next/next/no-img-element
  }) => <img src={src} alt={alt} className={className} />,
}))

// Mock the Numbers component
jest.mock('../../components/Numbers', () => {
  return function MockedNumbers({
    items,
    onNumberChange,
  }: {
    items: string[]
    onNumberChange: (item: string) => void
  }) {
    return (
      <div data-testid="mocked-numbers">
        {items.map((item, index) => (
          <button key={index} onClick={() => onNumberChange(item)}>
            {index + 1}
          </button>
        ))}
      </div>
    )
  }
})

const mockData: SpaceTravelData = {
  technologies: [
    {
      name: 'Launch Vehicle',
      images: {
        landscape: '/launch_vehicle_landscape.webp',
        portrait: '/launch_vehicle_portrait.webp',
      },
      description: 'Launch Vehicle description',
    },
    {
      name: 'Spaceport',
      images: {
        landscape: '/spaceport_landscape.webp',
        portrait: '/spaceport_portrait.webp',
      },
      description: 'Spaceport description',
    },
  ],
}

const renderWithProvider = (component: React.ReactNode) => {
  return render(
    <DataContext.Provider value={mockData}>{component}</DataContext.Provider>
  )
}

describe('Technology Component', () => {
  test('renders the Numbers component inside a Suspense boundary', async () => {
    renderWithProvider(<Technology />)

    expect(
      screen.getByText('Loading navigation numbers...')
    ).toBeInTheDocument()
  })

  test('renders without crashing', () => {
    renderWithProvider(<Technology />)
    expect(screen.getByText('Space Launch 101')).toBeInTheDocument()
  })

  test('displays the first technology by default', () => {
    renderWithProvider(<Technology />)
    const heading = screen.getByRole('heading', { name: 'Launch Vehicle' })
    expect(heading).toBeInTheDocument()
  })

  test('displays the correct description for the first technology', () => {
    renderWithProvider(<Technology />)
    expect(screen.getByText('Launch Vehicle description')).toBeInTheDocument()
  })

  test('changes technology when a new number is selected', async () => {
    renderWithProvider(<Technology />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-numbers')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('2'))
    expect(
      screen.getByRole('heading', { name: 'Spaceport' })
    ).toBeInTheDocument()
  })

  test('displays the correct description after changing the number', async () => {
    renderWithProvider(<Technology />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-numbers')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('2'))
    expect(screen.getByText('Spaceport description')).toBeInTheDocument()
  })

  test('displays the correct images for the current technology', () => {
    renderWithProvider(<Technology />)
    const landscapeImage = screen.getAllByAltText('Launch Vehicle')[0]
    const portraitImage = screen.getAllByAltText('Launch Vehicle')[1]
    expect(landscapeImage).toHaveAttribute(
      'src',
      '/launch_vehicle_landscape.webp'
    )
    expect(portraitImage).toHaveAttribute(
      'src',
      '/launch_vehicle_portrait.webp'
    )
  })

  test('has the correct ARIA attributes for accessibility', () => {
    renderWithProvider(<Technology />)
    const heading = screen.getByText('Space Launch 101')
    expect(heading).toHaveAttribute('id', 'technology-heading')
  })

  test('renders the technology section with correct ARIA attribute', () => {
    renderWithProvider(<Technology />)
    const section = screen.getByRole('region', { name: /Space Launch 101/i })
    expect(section).toHaveAttribute('aria-labelledby', 'technology-heading')
  })

  test('renders the Numbers component after loading', async () => {
    renderWithProvider(<Technology />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-numbers')).toBeInTheDocument()
    })
  })
})
