
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../@types/props'

const _role = 'icon-close-code-outlined'
const _prefix = getPrefixCls(_role)

export const CloseCodeOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, role = _role, className, children, style, onClick }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role={role} style={style} onClick={onClick}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M292.908 150.97l54.184 34.06a8 8 0 0 1 2.732 10.664l-0.216 0.366L147.244 518l202.364 321.94a8 8 0 0 1-2.16 10.796l-0.356 0.234-54.184 34.06a7.998 7.998 0 0 1-11.03-2.516L52.754 518 281.88 153.486a7.998 7.998 0 0 1 11.03-2.516zM717.712 150.97l-54.184 34.06a8 8 0 0 0-2.734 10.664l0.218 0.366L863.376 518 661.012 839.94a8 8 0 0 0 2.16 10.796l0.356 0.234 54.184 34.06a7.998 7.998 0 0 0 11.03-2.516L957.866 518 728.74 153.486a7.998 7.998 0 0 0-11.03-2.516zM548.56 152.05l62.88 11.91a8 8 0 0 1 6.372 9.35l-133.022 702.314a8 8 0 0 1-9.348 6.372l-62.884-11.91a8 8 0 0 1-6.37-9.35l133.022-702.314a8 8 0 0 1 9.348-6.372z" p-id="12665"></path></svg>
    )
  }
)

if (__DEV__) {
  CloseCodeOutlined.displayName = 'CloseCodeOutlined'
}
  