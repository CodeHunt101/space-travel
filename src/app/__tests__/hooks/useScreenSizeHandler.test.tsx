import useScreenSizeHandler from '@/app/hooks/useScreenSizeHandler'
import { BreakPoints } from '@/app/utils/types'
import { renderHook } from '@testing-library/react'

describe('useScreenSizeHandler', () => {
  let originalInnerWidth: number
  let addEventListenerMock: jest.SpyInstance<void, [type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions | undefined], any>
  let removeEventListenerMock: jest.SpyInstance<void, [type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions | undefined], any>
  const mockSetState = jest.fn()
  const value = 'testValue'
  const screenSize = BreakPoints.MD

  beforeEach(() => {
    originalInnerWidth = global.innerWidth
    addEventListenerMock = jest.spyOn(window, 'addEventListener')
    removeEventListenerMock = jest.spyOn(window, 'removeEventListener')
    mockSetState.mockClear()
  })

  afterEach(() => {
    global.innerWidth = originalInnerWidth
    addEventListenerMock.mockRestore()
    removeEventListenerMock.mockRestore()
  })

  afterEach(() => {
    global.innerWidth = originalInnerWidth
    addEventListenerMock.mockRestore()
    removeEventListenerMock.mockRestore()
  })

  test('should set state when window width is greater than or equal to screenSize', () => {
    global.innerWidth = screenSize + 1
    renderHook(() => useScreenSizeHandler(mockSetState, value, screenSize))
    expect(mockSetState).toHaveBeenCalledWith(value)
  })

  test('should not set state when window width is less than screenSize', () => {
    global.innerWidth = screenSize - 1
    renderHook(() => useScreenSizeHandler(mockSetState, value, screenSize))
    expect(mockSetState).not.toHaveBeenCalled()
  })

  test('should add resize event listener', () => {
    renderHook(() =>
      useScreenSizeHandler(mockSetState, value, screenSize)
    )
    expect(addEventListenerMock).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    )
  })

  test('should remove resize event listener on unmount', () => {
    const { unmount } = renderHook(() =>
      useScreenSizeHandler(mockSetState, value, screenSize)
    )
    unmount()
    expect(removeEventListenerMock).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    )
  })

  test('should handle resize event when window width becomes greater than or equal to screenSize', () => {
    global.innerWidth = screenSize - 1
    renderHook(() =>
      useScreenSizeHandler(mockSetState, value, screenSize)
    )
    global.innerWidth = screenSize + 1
    window.dispatchEvent(new Event('resize'))
    expect(mockSetState).toHaveBeenCalledWith(value)
  })

  test('should not set state when window width is less than screenSize on resize event', () => {
    global.innerWidth = screenSize + 1
    renderHook(() =>
      useScreenSizeHandler(mockSetState, value, screenSize)
    )
    mockSetState.mockClear()
    global.innerWidth = screenSize - 1
    window.dispatchEvent(new Event('resize'))
    expect(mockSetState).not.toHaveBeenCalled()
  })
})