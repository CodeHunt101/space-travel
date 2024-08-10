import styles from './Dots.module.scss'
import BaseNavigator from './BaseNavigator'

const Dots = ({
  items,
  onDotChange,
}: {
  items: string[]
  onDotChange: (name: string) => void
}) => (
  <BaseNavigator
    items={items}
    onItemChange={onDotChange}
    className={`${styles['dot-indicators']} flex`}
    ariaLabel="Crew member navigation"
    renderButton={(item, _index, isSelected, handleClick) => (
      <button
        key={item}
        role="tab"
        aria-selected={isSelected}
        onClick={handleClick}
      >
        <span className={`${isSelected ? styles['active'] : ''} sr-only`}>
          {`View information about ${item}`}
        </span>
      </button>
    )}
  />
)

export default Dots
