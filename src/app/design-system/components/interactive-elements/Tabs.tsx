/* eslint-disable jsx-a11y/role-supports-aria-props */
import styles from './Tabs.module.scss'

const Tabs = () => (
  <div className={`${styles['tab-list']} underline-indicators flex`}>
    <button
      aria-selected="true"
      className="uppercase ff-sans-cond bg-dark text-accent letter-spacing-2"
    >
      Moon
    </button>
    <button
      aria-selected="false"
      className="uppercase ff-sans-cond bg-dark text-accent letter-spacing-2"
    >
      Mars
    </button>
    <button
      aria-selected="false"
      className="uppercase ff-sans-cond bg-dark text-accent letter-spacing-2"
    >
      Europa
    </button>
  </div>
)

export default Tabs
