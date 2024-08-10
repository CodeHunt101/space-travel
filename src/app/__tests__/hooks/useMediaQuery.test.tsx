import { useMediaQuery } from '@/app/hooks/useMediaQuery'
import { act, renderHook } from '@testing-library/react'

describe('useMediaQuery', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return the correct initial state', () => {
    const mockMatchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(true);
    expect(mockMatchMedia).toHaveBeenCalledWith('(min-width: 600px)');
  });

  test('should update the state when media query matches', async () => {
    let listener: ((e: MediaQueryListEvent) => void) | undefined;
    const mockMatchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn().mockImplementation((_, cb) => {
        listener = cb;
      }),
      removeEventListener: jest.fn(),
    }));

    window.matchMedia = mockMatchMedia;

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(false);

    // Simulate a media query match
    act(() => {
      if (listener) {
        listener({ matches: true } as MediaQueryListEvent);
      }
    });

    expect(result.current).toBe(true);
  });

  test('should clean up the event listener on unmount', () => {
    const removeEventListenerMock = jest.fn();
    const mockMatchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: removeEventListenerMock,
    }));

    window.matchMedia = mockMatchMedia;

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledTimes(1);
  });

  test('should return false when window is undefined (SSR)', () => {
    // Store the original window object
    const originalWindow = global.window;

    // Set window to undefined to simulate SSR environment
    // @ts-ignore
    global.window = undefined;

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(false);

    global.window = originalWindow;
  });
});
