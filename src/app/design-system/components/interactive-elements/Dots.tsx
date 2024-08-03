/* eslint-disable jsx-a11y/role-supports-aria-props */
import styles from './Dots.module.scss'

const Dots = () => (
  <div className={`${styles['dot-indicators']} flex`}>
    <button aria-selected="true">
      <span className="active sr-only">Slide title</span>
    </button>
    <button aria-selected="false">
      <span className="sr-only">Slide title</span>
    </button>
    <button aria-selected="false">
      <span className="sr-only">Slide title</span>
    </button>
  </div>
)

export default Dots
