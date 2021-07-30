
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../@types/props'

const _role = 'icon-export-outlined'
const _prefix = getPrefixCls(_role)

export const ExportOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, role = _role, className, children, style, onClick }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role={role} style={style} onClick={onClick}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M896 112a16 16 0 0 1 16 16v768a16 16 0 0 1-16 16H128a16 16 0 0 1-16-16V128a16 16 0 0 1 16-16h768z m-64 80H192v640h640V192zM552 355.054V740.24c0 4.09-3.58 7.406-8 7.406h-64c-4.42 0-8-3.316-8-7.406V355.054c0-4.09 3.58-7.408 8-7.408h64c4.42 0 8 3.318 8 7.408zM711.876 475.876c2.082 2.082 1.238 6.304-1.886 9.428l-45.254 45.254c-3.126 3.124-7.346 3.968-9.43 1.886l-143.304-143.308-143.308 143.308c-2.084 2.082-6.304 1.24-9.43-1.886l-45.254-45.254c-3.124-3.124-3.968-7.346-1.886-9.428l196.104-196.104c0.928-0.928 2.28-1.276 3.77-1.1 1.494-0.176 2.846 0.172 3.774 1.1l196.104 196.104z" p-id="11265"></path></svg>
    )
  }
)

if (__DEV__) {
  ExportOutlined.displayName = 'ExportOutlined'
}
  