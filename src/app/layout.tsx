import React, { Suspense, useEffect } from 'react'
import { useRouter } from 'next/router'
import type { Metadata } from 'next'
import './styles/globals.scss'
import styles from './layout.module.scss'
import { barlow, barlowCondensed, bellefair } from './utils/fonts'
import Image from 'next/image'
import logo from '../../public/assets/shared/logo.svg'
import Link from 'next/link'
import { Path } from './utils/types'
import { Content } from './Content'

const NavBar = React.lazy(() => import('./components/NavBar'))

export const metadata: Metadata = {
  title: 'Space travel website',
  description:
    "If you're a fan of the universe, immerse yourself in our website full of remarkable universe content.",
  // metadataBase: new URL('/') Not needed for vercel
  authors: [{ name: 'Harold Torres Marino' }],
  creator: 'Harold Torres Marino',
  publisher: 'Harold Torres Marino',
  twitter: {
    card: 'summary_large_image',
    title: 'Space travel website',
    description:
      "If you're a fan of the universe, immerse yourself in our website full of remarkable universe content.",
    creator: 'Harold Torres Marino',
    images: 'https://spacetravel-fe.vercel.app/opengraph-image.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${barlowCondensed} ${bellefair} ${barlow}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <header id={styles['main-header']} className="sticky">
          <section className={`${styles.menu} flex`}>
            <div className={`${styles.logo} flex`}>
              <Link href={Path.HOME}>
                <Image src={logo} alt="Space travel website logo" priority />
              </Link>
            </div>
            <Suspense fallback={<div>Loading navigation...</div>}>
              <NavBar />
            </Suspense>
          </section>
        </header>
        <Content>{children}</Content>
      </body>
    </html>
  )
}
