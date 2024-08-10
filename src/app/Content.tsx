'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const Content = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const pathname = usePathname()

  useEffect(() => {
    // Trigger the animation on route change
    const mainElement = document.querySelector('main')
    mainElement?.classList.remove('fade-in')
    void document.body.offsetWidth // Trigger reflow to restart the animation
    mainElement?.classList.add('fade-in')
  }, [pathname])

  return <>{children}</>
}
