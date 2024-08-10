'use client'
import React, { useState, Suspense, useCallback } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'
import technologyData from '../data.json'
import { TechnologyData } from '../utils/types'
const Tabs = React.lazy(() => import('../components/Tabs'))

const Technology = () => {
  const [technologies] = useState<TechnologyData[]>(
    technologyData.technology || []
  )
  const [currentTechnology, setCurrentTechnology] = useState<TechnologyData>(
    technologies[0]
  )

  const handleTabChange = useCallback(
    (tabName: string) => {
      const newTechnology = technologies.find((dest) => dest.name === tabName)
      if (newTechnology) {
        setCurrentTechnology(newTechnology)
      }
    },
    [technologies]
  )

  if (technologies.length === 0) {
    return <div>No Technologies available</div>
  }

  return (
    <main className={`${styles.Technology} text-accent ff-serif`}>
      <section aria-labelledby='Technology-heading' className={`container ${styles['content-wrapper']}`}>
        <h1 id="Technology-heading" className="numbered-title text-white">
          <span>03</span>Space Launch 101
        </h1>
        <div className={`${styles['Technology-data']} flex`}>
          <Image
            src={currentTechnology.images.landscape}
            alt={currentTechnology.name}
            width={445}
            height={445}
          />
          <div className={styles.information}>
            <Suspense fallback={<div>Loading tabs...</div>}>
              <Tabs
                items={technologies.map((dest) => dest.name)}
                onTabChange={handleTabChange}
              />
            </Suspense>
            <h2 className='uppercase letter-spacing-4 text-white'>The Terminology...</h2>
            <h3 className="uppercase fs-900 ff-serif letter-spacing-2 text-white">
              {currentTechnology.name}
            </h3>
            <p className="ff-sans-normal fs-300">
              {currentTechnology.description}
            </p>
            <hr />
          </div>
        </div>
      </section>
    </main>
  )
}

export default Technology
