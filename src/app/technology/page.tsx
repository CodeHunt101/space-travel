'use client'
import React, { useState, Suspense, useCallback } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'
import technologyData from '../data.json'
import { TechnologyData } from '../utils/types'
const Numbers = React.lazy(() => import('../components/Numbers'))

const Technology = () => {
  const [technologies] = useState<TechnologyData[]>(
    technologyData.technology || []
  )
  const [currentTechnology, setCurrentTechnology] = useState<TechnologyData>(
    technologies[0]
  )

  const handleNumberChange = useCallback(
    (tabName: string) => {
      const newTechnology = technologies.find((tech) => tech.name === tabName)
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
    <main className={`${styles.technology} text-accent ff-serif`}>
      <section
        aria-labelledby="technology-heading"
        className={`${styles['content-wrapper']}`}
      >
        <h1 id="technology-heading" className="numbered-title text-white">
          <span>03</span>Space Launch 101
        </h1>
        <div className={`${styles['technology-data']} flex`}>
          <Image
            src={currentTechnology.images.landscape}
            alt={currentTechnology.name}
            width={445}
            height={445}
          />
          <div className={`${styles.information} flex container`}>
            <Suspense fallback={<div>Loading navigation numbers...</div>}>
              <Numbers
                items={technologies.map((tech) => tech.name)}
                onNumberChange={handleNumberChange}
              />
            </Suspense>
            <div>
              <h2 className="uppercase letter-spacing-4 text-white">
                The Terminology...
              </h2>
              <h3 className="uppercase fs-900 ff-serif text-white">
                {currentTechnology.name}
              </h3>
              <p className="ff-sans-normal fs-300">
                {currentTechnology.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Technology
