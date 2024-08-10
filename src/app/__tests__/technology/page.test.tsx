import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import Technology from '@/app/technology/page'

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

// Mock the technologyData
jest.mock('../../data.json', () => ({
  technology: [
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
}))

describe('Technology Component', () => {
  it('renders the Numbers component inside a Suspense boundary', async () => {
    render(<Technology />)

    expect(
      screen.getByText('Loading navigation numbers...')
    ).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    render(<Technology />)
    expect(screen.getByText('Space Launch 101')).toBeInTheDocument()
  })

  it('displays the first technology by default', () => {
    render(<Technology />)
    const heading = screen.getByRole('heading', { name: 'Launch Vehicle' })
    expect(heading).toBeInTheDocument()
  })

  it('displays the correct description for the first technology', () => {
    render(<Technology />)
    expect(screen.getByText('Launch Vehicle description')).toBeInTheDocument()
  })

  it('changes technology when a new number is selected', async () => {
    render(<Technology />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-numbers')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('2'))
    expect(
      screen.getByRole('heading', { name: 'Spaceport' })
    ).toBeInTheDocument()
  })

  it('displays the correct description after changing the number', async () => {
    render(<Technology />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-numbers')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('2'))
    expect(screen.getByText('Spaceport description')).toBeInTheDocument()
  })

  it('displays the correct images for the current technology', () => {
    render(<Technology />)
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

  it('has the correct ARIA attributes for accessibility', () => {
    render(<Technology />)
    const heading = screen.getByText('Space Launch 101')
    expect(heading).toHaveAttribute('id', 'technology-heading')
  })

  it('renders the technology section with correct ARIA attribute', () => {
    render(<Technology />)
    const section = screen.getByRole('region', { name: /Space Launch 101/i })
    expect(section).toHaveAttribute('aria-labelledby', 'technology-heading')
  })

  it('renders the Numbers component after loading', async () => {
    render(<Technology />)

    await waitFor(() => {
      expect(screen.getByTestId('mocked-numbers')).toBeInTheDocument()
    })
  })
})
