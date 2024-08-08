/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useState } from 'react'
import styles from './Dots.module.scss'

const Dots = ({
  items,
  onDotChange,
}: {
  items: string[]
  onDotChange: (name: string) => void
}) => {
  const [selectedDot, setSelectedDot] = useState<number>(0)

  const handleClick = (index: number) => {
    setSelectedDot(index)
    onDotChange(items[index])
  }

  return (
    <div className={`${styles['dot-indicators']} flex`}>
      {items.map((item, index) => (
        <button key={item} aria-selected={selectedDot === index} onClick={() => handleClick(index)}>
          <span
            className={`${
              selectedDot === index ? styles['active'] : ''
            } sr-only`}
          >
            Slide title
          </span>
        </button>
      ))}
    </div>
  )
}

export default Dots
