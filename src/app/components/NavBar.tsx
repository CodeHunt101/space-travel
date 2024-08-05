'use client'
import { useState, useCallback } from 'react'
import styles from './NavBar.module.scss'
import Image from 'next/image'
import iconHamburger from '../../../public/assets/shared/icon-hamburger.svg'
import iconClose from '../../../public/assets/shared/icon-close.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Path } from '../utils/types'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  const renderNavItem = (path: Path, label: string, index: string) => (
    <li className={pathname === path ? 'active' : ''}>
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
      className={`${styles['primary-navigation']} ${
        isMenuOpen ? styles.open : styles.closed
      }`}
    >
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <Image
          src={isMenuOpen ? iconClose : iconHamburger}
          alt={isMenuOpen ? 'Close menu icon' : 'Open menu icon'}
        />
      </button>
      <nav className={styles.navbar}>
        <ul className={`underline-indicators ${isMenuOpen ? styles.open : ''}`}>
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
