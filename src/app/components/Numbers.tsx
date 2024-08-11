import styles from './Numbers.module.scss'
import BaseNavigator from './BaseNavigator'

const Numbers = ({
  items,
  onNumberChange,
}: {
  items: string[]
  onNumberChange: (name: string) => void
}) => (
  <BaseNavigator
    items={items}
    onItemChange={onNumberChange}
    className={`${styles['number-indicators']} flex`}
    ariaLabel="Number navigation"
    renderButton={(item, index, isSelected, handleClick) => (
      <button
        key={item}
        role="tab"
        aria-selected={isSelected}
        className={`${isSelected ? styles.active : ''} text-white ff-serif`}
        onClick={handleClick}
      >
        {index + 1}
      </button>
    )}
  />
)

export default Numbers
