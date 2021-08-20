
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../@types/props'

const _role = 'icon-power-off-outlined'
const _prefix = getPrefixCls(_role)

export const PowerOffOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, role = _role, className, children, style, onClick }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role={role} style={style} onClick={onClick}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M202.446 209.904l56.568 56.568c-139.808 139.808-139.808 366.48 0 506.29 139.808 139.808 366.48 139.808 506.288 0 135.062-135.062 139.648-351.192 13.756-491.758l56.64-56.64c157.092 171.88 152.482 438.656-13.826 604.966-171.05 171.05-448.376 171.05-619.426 0-171.05-171.05-171.05-448.376 0-619.426zM544 74a8 8 0 0 1 8 8v352a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8V82a8 8 0 0 1 8-8h64z" p-id="13155"></path></svg>
    )
  }
)

if (__DEV__) {
  PowerOffOutlined.displayName = 'PowerOffOutlined'
}
  