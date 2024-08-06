import Image from 'next/image'
import styles from './page.module.scss'
import moonImage from '../../../public/assets/destination/moon.webp'
import Tabs from '../components/Tabs'

const Destination = () => {
  return (
    <main className={`${styles.destination} text-accent ff-serif text-accent`}>
      <section
        className={`container`}
        // aria-labelledby="hero-heading"
      >
        <h1 className="numbered-title">
          <span>01</span> Pick your destination
        </h1>
        <div id={styles['destination-data']} className="flex">
          <Image src={moonImage} alt="The Moon" />
          <div>
            <Tabs items={['Moon', 'Mars', 'Europa', 'Titan']} />
            <h2 className='uppercase fs-900 ff-serif letter-spacing-2'>Moon</h2>
            <p className='ff-sans-normal text-accent fs-300'>
              See our planet as you’ve never seen it before. A perfect relaxing
              trip away to help regain perspective and come back refreshed.
              While you’re there, take in some history by visiting the Luna 2
              and Apollo 11 landing sites.
            </p>
            <hr />
            <div id={styles['interesting-facts']} className='flex'>
              <div>
                <h3 className="uppercase ff-sans-cond fs-200 letter-spacing-2">Avg. Distance</h3>
                <p className='uppercase fs-500'>384,400 Km</p>
              </div>
              <div>
                <h3 className="uppercase ff-sans-cond fs-200 letter-spacing-2">Est. Travel Time</h3>
                <p className='uppercase fs-500'>3 Days</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Destination
