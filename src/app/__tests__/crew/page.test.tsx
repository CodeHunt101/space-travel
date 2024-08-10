import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Crew from '@/app/crew/page';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt }: {src: string, alt: string}) => <img src={src} alt={alt} />,
}));

// Mock the Dots component
jest.mock('../../components/Dots', () => {
  return function MockedDots({ items, onDotChange }: {items: string[], onDotChange: (item: string)=>void}) {
    return (
      <div data-testid="mocked-dots">
        {items.map((item) => (
          <button key={item} onClick={() => onDotChange(item)}>
            {item}
          </button>
        ))}
      </div>
    );
  };
});

// Mock the crewData
jest.mock('../../data.json', () => ({
  crew: [
    {
      name: 'John Doe',
      role: 'Commander',
      images: { webp: '/john_doe.webp' },
      bio: 'John Doe bio',
    },
    {
      name: 'Jane Smith',
      role: 'Pilot',
      images: { webp: '/jane_smith.webp' },
      bio: 'Jane Smith bio',
    },
  ],
}));

describe('Crew Component', () => {
  test('renders the Dots component inside a Suspense boundary', async () => {
    render(<Crew />);
    
    expect(screen.getByText('Loading navigation elements...')).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    render(<Crew />);
    expect(screen.getByText('Meet your crew')).toBeInTheDocument();
  });

  test('displays the first crew member by default', () => {
    render(<Crew />);
    const heading = screen.getByRole('heading', { name: 'Commander John Doe' });
    expect(heading).toBeInTheDocument();
  });

  test('displays the correct bio for the first crew member', () => {
    render(<Crew />);
    expect(screen.getByText('John Doe bio')).toBeInTheDocument();
  });

  test('changes crew member when a new dot is selected', async () => {
    render(<Crew />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mocked-dots')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Jane Smith'));
    expect(screen.getByRole('heading', { name: 'Pilot Jane Smith' })).toBeInTheDocument();
  });

  test('displays the correct bio after changing the dot', async () => {
    render(<Crew />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mocked-dots')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Jane Smith'));
    expect(screen.getByText('Jane Smith bio')).toBeInTheDocument();
  });

  test('displays the correct image for the current crew member', () => {
    render(<Crew />);
    const image = screen.getByAltText('John Doe');
    expect(image).toHaveAttribute('src', '/john_doe.webp');
  });

  test('has the correct ARIA attributes for accessibility', () => {
    render(<Crew />);
    const heading = screen.getByText('Meet your crew');
    expect(heading).toHaveAttribute('id', 'crew-heading');
  });

  test('renders the crew section with correct ARIA attribute', () => {
    render(<Crew />);
    const section = screen.getByRole('region', { name: /Meet your crew/i });
    expect(section).toHaveAttribute('aria-labelledby', 'crew-heading');
  });

  test('renders the Dots component after loading', async () => {
    render(<Crew />);
    
    await waitFor(() => {
      expect(screen.getByTestId('mocked-dots')).toBeInTheDocument();
    });
  });
});
