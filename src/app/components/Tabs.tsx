import styles from './Tabs.module.scss'
import BaseNavigator from './BaseNavigator'

const Tabs = ({
  items,
  onTabChange,
}: {
  items: string[]
  onTabChange: (tabName: string) => void
}) => (
  <BaseNavigator
    items={items}
    onItemChange={onTabChange}
    className={`${styles['tab-list']} underline-indicators flex`}
    ariaLabel="Tab navigation"
    renderButton={(item, index, isSelected, handleClick) => (
      <button
        key={item}
        role="tab"
        aria-selected={isSelected}
        className="uppercase ff-sans-cond text-accent letter-spacing-2"
        onClick={handleClick}
      >
        {item}
      </button>
    )}
  />
)

export default Tabs
