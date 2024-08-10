/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useState } from 'react'
import styles from './Numbers.module.scss'

const Numbers = ({
  items,
  onNumberChange,
}: {
  items: string[]
  onNumberChange: (name: string) => void
}) => {
  const [selectedNumber, setSelectedNumber] = useState<number>(0)

  const handleClick = (index: number) => {
    setSelectedNumber(index)
    onNumberChange(items[index])
  }

  return (
    <div className={`${styles['number-indicators']} flex`}>
      {items.map((item, index) => (
        <button
          key={item}
          aria-selected={selectedNumber === index}
          className={`${
            selectedNumber === index ? styles.active : ''
          } text-white ff-serif`}
          onClick={() => handleClick(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}

export default Numbers
