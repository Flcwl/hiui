
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _role = 'icon-qr-code-filled'
const _prefix = getPrefixCls(_role)

export const QrCodeFilled = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, role = _role, className, children, style, onClick }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role={role} style={style} onClick={onClick}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M341.333333 554.666667a128 128 0 0 1 128 128v106.666666a128 128 0 0 1-128 128h-106.666666a128 128 0 0 1-128-128v-106.666666a128 128 0 0 1 128-128h106.666666z m277.333334 128a42.666667 42.666667 0 0 1 42.666666 42.666666v149.333334a42.666667 42.666667 0 1 1-85.333333 0v-149.333334a42.666667 42.666667 0 0 1 42.666667-42.666666z m128-64a42.666667 42.666667 0 0 1 42.666666 42.666666v213.333334a42.666667 42.666667 0 1 1-85.333333 0V661.333333a42.666667 42.666667 0 0 1 42.666667-42.666666z m128-64a42.666667 42.666667 0 0 1 42.666666 42.666666v277.333334a42.666667 42.666667 0 1 1-85.333333 0V597.333333a42.666667 42.666667 0 0 1 42.666667-42.666666z m-576 149.333333h-21.333334a21.333333 21.333333 0 0 0-21.333333 21.333333v21.333334a21.333333 21.333333 0 0 0 21.333333 21.333333h21.333334a21.333333 21.333333 0 0 0 21.333333-21.333333v-21.333334a21.333333 21.333333 0 0 0-21.333333-21.333333z m42.666666-597.333333a128 128 0 0 1 128 128v106.666666a128 128 0 0 1-128 128h-106.666666a128 128 0 0 1-128-128v-106.666666a128 128 0 0 1 128-128h106.666666z m448 0a128 128 0 0 1 128 128v106.666666a128 128 0 0 1-128 128h-106.666666a128 128 0 0 1-128-128v-106.666666a128 128 0 0 1 128-128h106.666666z m-490.666666 149.333333h-21.333334a21.333333 21.333333 0 0 0-21.333333 21.333333v21.333334a21.333333 21.333333 0 0 0 21.333333 21.333333h21.333334a21.333333 21.333333 0 0 0 21.333333-21.333333v-21.333334a21.333333 21.333333 0 0 0-21.333333-21.333333z m448 0h-21.333334a21.333333 21.333333 0 0 0-21.333333 21.333333v21.333334a21.333333 21.333333 0 0 0 21.333333 21.333333h21.333334a21.333333 21.333333 0 0 0 21.333333-21.333333v-21.333334a21.333333 21.333333 0 0 0-21.333333-21.333333z" p-id="15411"></path></svg>
    )
  }
)

if (__DEV__) {
  QrCodeFilled.displayName = 'QrCodeFilled'
}
  