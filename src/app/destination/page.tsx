'use client'
import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'
import destinationData from '../data.json'
const Tabs = React.lazy(() => import('../components/Tabs'))

interface Destination {
  name: string
  images: {
    png: string
    webp: string
  }
  description: string
  distance: string
  travel: string
}

const Destination: React.FC = () => {
  const [destinations] = useState<Destination[]>(destinationData.destinations)
  const [currentDestination, setCurrentDestination] = useState<Destination>(
    destinations[0]
  )

  const handleTabChange = (tabName: string) => {
    const newDestination = destinations.find((dest) => dest.name === tabName)
    if (newDestination) {
      setCurrentDestination(newDestination)
    }
  }

  return (
    <main className={`${styles.destination} text-accent ff-serif text-accent`}>
      <section className={`container ${styles['content-wrapper']}`}>
        <h1 className="numbered-title">
          <span>01</span>Pick your destination
        </h1>
        <div id={styles['destination-data']} className="flex">
          <Image
            src={currentDestination.images.webp}
            alt={currentDestination.name}
            width={445}
            height={445}
          />
          <div>
            <Suspense fallback={<div>Loading tabs...</div>}>
              <Tabs
                items={destinations.map((dest) => dest.name)}
                onTabChange={handleTabChange}
              />
            </Suspense>
            <h2 className="uppercase fs-900 ff-serif letter-spacing-2">
              {currentDestination.name}
            </h2>
            <p className="ff-sans-normal text-accent fs-300">
              {currentDestination.description}
            </p>
            <hr />
            <div id={styles['interesting-facts']} className="flex">
              <div>
                <h3 className="uppercase ff-sans-cond fs-200 letter-spacing-2">
                  Avg. Distance
                </h3>
                <p className="uppercase fs-500">
                  {currentDestination.distance}
                </p>
              </div>
              <div>
                <h3 className="uppercase ff-sans-cond fs-200 letter-spacing-2">
                  Est. Travel Time
                </h3>
                <p className="uppercase fs-500">{currentDestination.travel}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Destination
