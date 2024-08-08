'use client'
import React, { useState, Suspense, useCallback } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'
import destinationData from '../data.json'
import { DestinationData } from '../utils/types'
const Tabs = React.lazy(() => import('../components/Tabs'))

const Destination = () => {
  const [destinations] = useState<DestinationData[]>(
    destinationData.destinations || []
  )
  const [currentDestination, setCurrentDestination] = useState<DestinationData>(
    destinations[0]
  )

  const handleTabChange = useCallback(
    (tabName: string) => {
      const newDestination = destinations.find((dest) => dest.name === tabName)
      if (newDestination) {
        setCurrentDestination(newDestination)
      }
    },
    [destinations]
  )

  if (destinations.length === 0) {
    return <div>No destinations available</div>
  }

  return (
    <main className={`${styles.destination} text-accent ff-serif`}>
      <section className={`container ${styles['content-wrapper']}`}>
        <h1 className="numbered-title text-white">
          <span>01</span>Pick your destination
        </h1>
        <div className={`${styles['destination-data']} flex`}>
          <Image
            src={currentDestination.images.webp}
            alt={currentDestination.name}
            width={445}
            height={445}
          />
          <div className={styles.information}>
            <Suspense fallback={<div>Loading tabs...</div>}>
              <Tabs
                items={destinations.map((dest) => dest.name)}
                onTabChange={handleTabChange}
              />
            </Suspense>
            <h2 className="uppercase fs-900 ff-serif letter-spacing-2 text-white">
              {currentDestination.name}
            </h2>
            <p className="ff-sans-normal fs-300">
              {currentDestination.description}
            </p>
            <hr />
            <div className={`${styles['interesting-facts']} flex`}>
              <div>
                <h3 className="uppercase ff-sans-cond fs-200 letter-spacing-2">
                  Avg. Distance
                </h3>
                <p className="uppercase text-white">
                  {currentDestination.distance}
                </p>
              </div>
              <div>
                <h3 className="uppercase ff-sans-cond fs-200 letter-spacing-2">
                  Est. Travel Time
                </h3>
                <p className="uppercase text-white">
                  {currentDestination.travel}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Destination
