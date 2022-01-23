
import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { IconProps } from '../../@types/props'

const _prefix = getPrefixCls('icon-skin-outlined')

export const SkinOutlined = forwardRef<SVGSVGElement | null, IconProps>(
  ({ prefixCls = _prefix, className, children, ...rest }, ref) => {
    const cls = cx(prefixCls, className)

    return (
      <svg className={cls} ref={ref} role="icon" {...rest}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" version="1.1"><path d="M407.466667 106.666667c9.898667 24.362667 52.949333 42.666667 104.533333 42.666666s94.634667-18.304 104.533333-42.666666H746.666667c12.714667 0 24.533333 3.712 34.496 10.090666a105.898667 105.898667 0 0 1 50.581333 38.314667l3.157333 4.672 94.634667 148.309333 2.944 4.842667a128 128 0 0 1-42.538667 172.266667l-4.309333 2.581333L810.666667 531.029333V789.333333a128 128 0 0 1-128 128H341.333333a128 128 0 0 1-128-128V531.029333l-74.965333-43.285333a128 128 0 0 1-46.848-174.848l2.944-4.842667 94.634667-148.309333a106.069333 106.069333 0 0 1 53.717333-43.008A63.872 63.872 0 0 1 277.333333 106.666667h130.133334zM740.416 192L654.976 192l-0.512 0.426667c-34.688 27.2-83.626667 41.066667-135.68 42.176L512 234.666667c-51.818667 0-101.077333-12.501333-136.917333-38.101334L369.024 192h-85.546667l-11.754666 5.034667a20.608 20.608 0 0 0-8.981334 6.272l-1.706666 2.346666L166.4 353.92l-0.981333 1.621333a42.666667 42.666667 0 0 0 12.8 56.512l2.816 1.770667L298.666667 481.749333V789.333333a42.666667 42.666667 0 0 0 39.466666 42.56L341.333333 832h341.333334a42.666667 42.666667 0 0 0 42.56-39.466667L725.333333 789.333333V481.749333l116.224-67.050666 2.901334-1.749334a42.666667 42.666667 0 0 0 15.722666-54.357333l-1.6-3.029333-0.981333-1.621334-94.08-147.413333-1.450667-2.154667-1.429333-1.792a20.373333 20.373333 0 0 0-5.973333-4.522666L740.416 192z" p-id="38955"></path></svg>
    )
  }
)

if (__DEV__) {
  SkinOutlined.displayName = 'SkinOutlined'
}
  