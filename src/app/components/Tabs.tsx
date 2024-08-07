'use client'
/* eslint-disable jsx-a11y/role-supports-aria-props */
import { useState } from 'react'
import styles from './Tabs.module.scss'

const Tabs = ({ items }: { items: string[] }) => {
  const [selectedTab, setSelectedTab] = useState<number | null>(null)

  const handleClick = (index: number) => {
    setSelectedTab(index)
  }

  return (
    <div className={`${styles['tab-list']} underline-indicators flex`}>
      {items.map((item, index) => (
        <button
          key={item}
          aria-selected={selectedTab === index}
          className="uppercase ff-sans-cond text-accent letter-spacing-2"
          onClick={() => handleClick(index)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default Tabs
