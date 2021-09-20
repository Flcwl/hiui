
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../@types/props'

const _role = 'icon-user-add-outlined'
const _prefix = getPrefixCls(_role)

export const UserAddOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, role = _role, className, children, style, onClick }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role={role} style={style} onClick={onClick}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M602 656v64a8 8 0 0 1-8 8H252c-43.74 0-79.282 35.104-79.99 78.678L172 808v136a8 8 0 0 1-8 8H100a8 8 0 0 1-8-8v-136c0-87.482 70.208-158.566 157.354-159.98L252 648h342a8 8 0 0 1 8 8zM512 88c143.594 0 260 116.406 260 260s-116.406 260-260 260-260-116.406-260-260S368.406 88 512 88z m0 80c-99.412 0-180 80.588-180 180s80.588 180 180 180 180-80.588 180-180-80.588-180-180-180zM812 648a8 8 0 0 1 8 8v104h104a8 8 0 0 1 8 8v64a8 8 0 0 1-8 8h-104.002l0.002 104a8 8 0 0 1-8 8h-64a8 8 0 0 1-8-8l-0.002-104H636a8 8 0 0 1-8-8v-64a8 8 0 0 1 8-8h104v-104a8 8 0 0 1 8-8h64z" p-id="12445"></path></svg>
    )
  }
)

if (__DEV__) {
  UserAddOutlined.displayName = 'UserAddOutlined'
}
  