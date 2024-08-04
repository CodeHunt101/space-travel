'use client'
import { useState } from 'react'
import styles from './NavBar.module.scss'
import Image from 'next/image'
import hamburger from '../../../public/assets/shared/icon-hamburger.svg'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div
      className={`${styles['primary-navigation']} ${
        isMenuOpen ? styles.open : styles.closed
      }`}
    >
      <button className={styles.hamburger} onClick={toggleMenu}>
        <Image src={hamburger} alt="hamburger-menu-button" />
      </button>
      <nav className={styles.navbar}>
        <ul className={`underline-indicators ${isMenuOpen ? styles.open : ''}`}>
          <li className="active">
            <a className="uppercase text-white letter-spacing-2" href="#">
              <span>00</span>Home
            </a>
          </li>
          <li>
            <a className="uppercase text-white letter-spacing-2" href="#">
              <span>01</span>Destination
            </a>
          </li>
          <li>
            <a className="uppercase text-white letter-spacing-2" href="#">
              <span>02</span>Crew
            </a>
          </li>
          <li>
            <a className="uppercase text-white letter-spacing-2" href="#">
              <span>03</span>Technology
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
