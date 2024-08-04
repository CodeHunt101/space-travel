import LargeButton from './components/LargeButton'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={`${styles.home} text-accent ff-serif text-accent`}>
      <section className={`${styles.hero} container flex`}>
        <div>
          <h1 className="uppercase fs-400 ff-sans-cond letter-spacing-2">
            So, you want to travel to{' '}
            <div className="uppercase ff-serif">Space</div>
          </h1>
          <p className="ff-sans-normal text-accent fs-300">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>
        <LargeButton />
      </section>
    </main>
  )
}
