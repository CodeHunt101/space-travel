'use client'
import React, { useState, Suspense, useCallback } from 'react'
import Image from 'next/image'
import styles from './page.module.scss'
import crewData from '../data.json'
import { CrewData } from '../utils/types'
const Dots = React.lazy(() => import('../components/Dots'))

const Crew = () => {
  const [crew] = useState<CrewData[]>(
    crewData.crew || []
  )
  const [currentCrewMember, setCurrentCrewMember] = useState<CrewData>(
    crew[0]
  )

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
    return <div>No destinations available</div>
  }

  return (
    <main className={`${styles.crew} text-accent ff-serif`}>
      <section className={`container ${styles['content-wrapper']}`}>
        <h1 className="numbered-title text-white">
          <span>02</span>Meet your crew
        </h1>
        <h2
            className="uppercase fs-400 ff-sans-cond letter-spacing-1"
          >
            {currentCrewMember.role}<span className="uppercase ff-serif text-white">{currentCrewMember.name}</span>
        </h2>
        <div className={`${styles['crew-data']} flex`}>
        <div className={styles.information}>
            <p className="ff-sans-normal fs-300">
              {currentCrewMember.bio}
            </p>
            <Suspense fallback={<div>Loading navigation elements...</div>}>

              {/* <Tabs
                items={destinations.map((dest) => dest.name)}
                onTabChange={handleTabChange}
              /> */}
              <Dots items={crew.map((crewMember) => crewMember.name)}  onDotChange={handleDotChange}/>
            </Suspense>
          </div>
          <Image
            src={currentCrewMember.images.webp}
            alt={currentCrewMember.name}
            width={539.28}
            height={676}
          />
        </div>
      </section>
    </main>
  )
}

export default Crew
