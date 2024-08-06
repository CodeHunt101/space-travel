'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import styles from './NavBar.module.scss'
import Image from 'next/image'
import iconHamburger from '../../../public/assets/shared/icon-hamburger.svg'
import iconClose from '../../../public/assets/shared/icon-close.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BreakPoints, Path } from '../utils/types'
import useScreenSizeHandler from '../hooks/useScreenSizeHandler'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navWrapperRef = useRef<HTMLDivElement>(null)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      navWrapperRef.current &&
      !navWrapperRef.current.contains(event.target as HTMLDivElement)
    ) {
      setIsMenuOpen(false)
    }
  }, [])

  useScreenSizeHandler(setIsMenuOpen, false, BreakPoints.MD)

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const renderNavItem = (path: Path, label: string, index: string) => (
    <li className={`${pathname === path ? 'active' : ''} flex`} key={path}>
      <Link
        className="uppercase text-white letter-spacing-2"
        href={path}
        aria-current={pathname === path ? 'page' : undefined}
      >
        <span>{index}</span>
        {label}
      </Link>
    </li>
  )

  return (
    <div
      ref={navWrapperRef}
      data-testid="nav-wrapper"
      className={`${styles['primary-navigation']} ${
        isMenuOpen ? styles.open : styles.closed
      }`}
    >
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
      >
        <Image
          src={isMenuOpen ? iconClose : iconHamburger}
          alt={isMenuOpen ? 'Close menu icon' : 'Open menu icon'}
        />
      </button>
      <nav className={styles.navbar}>
        <ul
          id="primary-navigation"
          className={`underline-indicators ff-sans-cond fs-300 ${
            isMenuOpen ? styles.open : ''
          }`}
        >
          {renderNavItem(Path.HOME, 'Home', '00')}
          {renderNavItem(Path.DESTINATION, 'Destination', '01')}
          {renderNavItem(Path.CREW, 'Crew', '02')}
          {renderNavItem(Path.TECHNOLOGY, 'Technology', '03')}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
