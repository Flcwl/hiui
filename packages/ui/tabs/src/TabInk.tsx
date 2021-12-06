import React, { useRef, useEffect } from 'react'
import { cx } from '@hi-ui/classname'

interface TabInkProps {
  disabled?: boolean
  prefixCls?: string
  itemRef: HTMLElement
  tabListRef: HTMLElement
  direction: 'vertical' | 'horizontal'
}

export const TabInk: React.FC<TabInkProps> = ({
  disabled,
  prefixCls,
  itemRef,
  tabListRef,
  direction,
}) => {
  const inkRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inkRef.current && itemRef && tabListRef) {
      const itemRect = itemRef.getBoundingClientRect()
      const listRect = tabListRef.getBoundingClientRect()
      let _style: React.CSSProperties = {}
      if (direction === 'vertical') {
        _style = {
          top: `${itemRect.top - listRect.top}px`,
          height: `${itemRect.height}px`,
          left: '',
          width: '',
        }
      } else {
        _style = {
          left: `${itemRect.left - listRect.left}px`,
          width: `${itemRect.width}px`,
          top: '',
          height: '',
        }
      }
      Object.assign(inkRef.current.style, _style)
    }
  }, [itemRef, tabListRef, direction])

  return (
    <div
      className={cx(`${prefixCls}__ink`, {
        [`${prefixCls}__ink--disabled`]: disabled,
      })}
      ref={inkRef}
    />
  )
}

export default TabInk
