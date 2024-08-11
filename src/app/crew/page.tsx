'use client'
import React, { useState, Suspense, useCallback, useContext } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'
import { CrewData, SpaceTravelData } from '../utils/types'
import { DataContext } from '../context/DataContext'
const Dots = React.lazy(() => import('../components/Dots'))

const Crew = () => {
  const { crew = [] } = useContext<SpaceTravelData>(DataContext)
  const [currentCrewMember, setCurrentCrewMember] = useState<CrewData>(crew[0])

  const handleDotChange = useCallback(
    (name: string) => {
      const newCrewMember = crew.find((crewMember) => crewMember.name === name)
      if (newCrewMember) {
        setCurrentCrewMember(newCrewMember)
      }
    },
    [crew]
  )

  if (crew.length === 0) {
    return <div>No crew available</div>
  }

  return (
    <main className={`${styles.crew} text-accent ff-serif`}>
      <section
        aria-labelledby="crew-heading"
        className={`container ${styles['content-wrapper']}`}
      >
        <h1 id="crew-heading" className="numbered-title text-white">
          <span>02</span>Meet your crew
        </h1>
        <div className={`${styles['crew-data-wrapper']} flex`}>
          <div className={`${styles['crew-data']} flex`}>
            <h2 className="uppercase letter-spacing-4 text-white">
              {currentCrewMember.role}
              <span className="uppercase ff-serif text-white">
                {currentCrewMember.name}
              </span>
            </h2>
            <p className="ff-sans-normal fs-300">{currentCrewMember.bio}</p>
            <Suspense fallback={<div>Loading navigation elements...</div>}>
              <Dots
                items={crew.map((crewMember) => crewMember.name)}
                onDotChange={handleDotChange}
              />
            </Suspense>
          </div>
          <Image
            src={currentCrewMember.images.webp}
            alt={currentCrewMember.name}
            width={539.28}
            height={676}
            priority={true}
          />
        </div>
      </section>
    </main>
  )
}

export default Crew
