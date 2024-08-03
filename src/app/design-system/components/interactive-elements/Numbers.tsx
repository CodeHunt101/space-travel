/* eslint-disable jsx-a11y/role-supports-aria-props */
import styles from './Numbers.module.scss'

const Numbers = () => (
  <div className={`${styles['number-indicators']} flex`}>
    <button aria-selected="true" className={`${styles.active} text-white ff-serif`}>
      1
    </button>
    <button aria-selected="false" className='text-white ff-serif'>
      2
    </button>
    <button aria-selected="false" className='text-white ff-serif'>
      3
    </button>
  </div>
)

export default Numbers
