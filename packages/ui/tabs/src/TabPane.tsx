import React from 'react'

export const TabPane: React.FC<TabPaneProps> = ({ children, className, style, active }) => {
  return (
    <div style={style} className={className}>
      {active ? children : null}
    </div>
  )
}

export interface TabPaneProps {
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  tabId: React.ReactText
  tabTitle: React.ReactNode
  tabDesc?: React.ReactNode
  closeable?: boolean
  active?: boolean
}