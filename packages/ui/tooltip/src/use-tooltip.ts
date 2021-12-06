import { useRef, useCallback, useState, useMemo } from 'react'
import { useUncontrolledToggle } from '@hi-ui/use-toggle'
import { usePopper, PopperPortalProps, UsePopperProps } from '@hi-ui/popper'
import { mockDefaultHandlers } from '@hi-ui/dom-utils'
import { mergeRefs, withDefaultProps } from '@hi-ui/react-utils'
import { useUID } from '@hi-ui/use-id'
import { useUnmountEffect } from '@hi-ui/use-unmount-effect'
import { normalizeArray } from '@hi-ui/array-utils'
import { TriggerActionEnum } from './types'
import { useTimeout } from '@hi-ui/use-timeout'

export const useTooltip = ({
  visible: visibleProp,
  onOpen,
  onClose,
  trigger: triggerProp = 'hover',
  popper,
  disabled = false,
  ...rest
}: UseTooltipProps) => {
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null)

  /**
   * 抹平数组或字符串结构，同时 memo 处理，减少重渲染
   */
  const trigger = normalizeArray(triggerProp)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const triggersMemo = useMemo(() => trigger, trigger)

  /**
   * 维护 trigger 元素 或 tooltip 弹出层元素的 hover 态
   */
  const hoveringRef = useRef<boolean>(false)

  const { start: startOpenTimer, clear: clearOpenTimer } = useTimeout(() => {
    visibleAction.on()
  }, 0)

  const { start: startCloseTimer, clear: clearCloseTimer } = useTimeout(() => {
    if (hoveringRef.current) return
    visibleAction.off()
  }, 200)

  const clearToggleTimer = useCallback(() => {
    clearOpenTimer()
    clearCloseTimer()
  }, [clearOpenTimer, clearCloseTimer])

  useUnmountEffect(clearToggleTimer)

  const [visible, visibleAction] = useUncontrolledToggle({
    defaultVisible: false,
    visible: visibleProp,
    disabled,
    onOpen,
    onClose: () => {
      clearToggleTimer()
      onClose?.()
    },
  })

  const handlePopperLeave = useCallback(() => {
    hoveringRef.current = false

    clearOpenTimer()
    startCloseTimer()
  }, [startCloseTimer, clearOpenTimer])

  const handlePopperEnter = useCallback(() => {
    if (disabled) return

    hoveringRef.current = true

    startOpenTimer()
  }, [startOpenTimer, disabled])

  const usePopperProps: UsePopperProps = useMemo(() => {
    const popperProps: PopperPortalProps = withDefaultProps(popper, {
      placement: 'top',
      zIndex: 1060,
    })

    return {
      ...popperProps,
      visible,
      attachEl: triggerElement,
      onClose: visibleAction.off,
    }
  }, [visible, popper, visibleAction, triggerElement])

  const { shouldRenderPopper, getArrowProps, getPopperProps } = usePopper(usePopperProps)

  const tooltipId = useUID('popover')

  const getTooltipProps = useCallback(
    (props = {}, ref = null) => {
      const popoverProps = {
        ...props,
        ref,
        role: 'tooltip',
        id: tooltipId,
        ...rest,
      }

      if (triggersMemo.includes(TriggerActionEnum.HOVER)) {
        popoverProps.onMouseEnter = mockDefaultHandlers(props.onMouseEnter, () => {
          hoveringRef.current = true
        })

        popoverProps.onMouseLeave = mockDefaultHandlers(props.onMouseLeave, handlePopperLeave)
      }

      return popoverProps
    },
    [triggersMemo, tooltipId, handlePopperLeave, rest]
  )

  const getTriggerProps = useCallback(
    (props = {}, ref = null) => {
      const triggerProps = {
        ...props,
        ref: mergeRefs(setTriggerElement, ref),
        'aria-describedby': tooltipId,
        'aria-expanded': visible,
      }

      if (triggersMemo.includes(TriggerActionEnum.CLICK)) {
        triggerProps.onClick = mockDefaultHandlers(props.onClick, visibleAction.not)
      }

      if (triggersMemo.includes(TriggerActionEnum.HOVER)) {
        // @ref https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
        triggerProps.onFocus = mockDefaultHandlers(props.onFocus, visibleAction.on)
        triggerProps.onBlur = mockDefaultHandlers(props.onBlur, visibleAction.off)

        triggerProps.onMouseEnter = mockDefaultHandlers(props.onMouseEnter, handlePopperEnter)
        triggerProps.onMouseLeave = mockDefaultHandlers(props.onMouseLeave, handlePopperLeave)
      } else if (triggersMemo.includes(TriggerActionEnum.FOCUS)) {
        triggerProps.onFocus = mockDefaultHandlers(props.onFocus, visibleAction.on)
        triggerProps.onBlur = mockDefaultHandlers(props.onBlur, visibleAction.off)
      }

      if (triggersMemo.includes(TriggerActionEnum.CONTEXTMENU)) {
        triggerProps.onContextMenu = mockDefaultHandlers(props.onContextMenu, (evt: MouseEvent) => {
          // 阻止呼出默认浏览器菜单
          evt.preventDefault()
          visibleAction.not()
        })
      }

      return triggerProps
    },
    [triggersMemo, tooltipId, visibleAction, visible, handlePopperEnter, handlePopperLeave]
  )

  return {
    visible,
    visibleAction,
    getTooltipProps,
    getTriggerProps,
    getPopperProps,
    getArrowProps,
    shouldRenderPopper,
  }
}

export interface UseTooltipProps {
  /**
   * 控制气泡卡片的显示和隐藏（受控）
   */
  visible?: boolean
  /**
   * 开启禁用
   */
  disabled?: boolean
  /**
   * 打开时回调
   */
  onOpen?: () => void
  /**
   * 关闭时回调
   */
  onClose?: () => void
  /**
   * 	气泡卡片触发方式
   */
  trigger?: TriggerActionEnum[] | TriggerActionEnum
  /**
   * popper 透传的 props
   */
  popper?: PopperPortalProps
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>
