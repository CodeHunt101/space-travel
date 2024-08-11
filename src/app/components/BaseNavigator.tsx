import { ReactNode, useState } from 'react'

type BaseNavigatorProps = {
  items: string[]
  onItemChange: (name: string) => void
  renderButton: (
    item: string,
    index: number,
    isSelected: boolean,
    handleClick: () => void
  ) => ReactNode
  className: string
  ariaLabel: string
}

const BaseNavigator = ({
  items,
  onItemChange,
  renderButton,
  className,
  ariaLabel,
}: BaseNavigatorProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const handleClick = (index: number) => {
    if (selectedIndex === index) return
    setSelectedIndex(index)
    onItemChange(items[index])
  }

  return (
    <nav aria-label={ariaLabel} className={className} role="tablist">
      {items.map((item, index) =>
        renderButton(item, index, selectedIndex === index, () =>
          handleClick(index)
        )
      )}
    </nav>
  )
}

export default BaseNavigator
