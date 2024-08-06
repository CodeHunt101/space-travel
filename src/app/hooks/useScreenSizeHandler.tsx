import { SetStateAction, useEffect } from 'react'
import { BreakPoints } from '../utils/types'

export const useScreenSizeHandler = (
  setState: SetStateAction<any>,
  value: any,
  screenSize: BreakPoints
) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= screenSize) {
        setState(value)
      }
    }
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setState, screenSize, value])
}

export default useScreenSizeHandler
