import { useEffect, useState } from 'react'

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(
    () => {
      if (typeof window !== 'undefined') {
        return window.matchMedia(query).matches
      }
      return false
    }
  )

  useEffect(() => {
    const matchQueryList = window.matchMedia(query)
    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches)
    }
    matchQueryList.addEventListener('change', handleChange)

    return () => {
      matchQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
