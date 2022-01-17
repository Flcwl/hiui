import React, { forwardRef } from 'react'
import { cx, getPrefixCls } from '@hi-ui/classname'
import { __DEV__ } from '@hi-ui/env'
import { useTableContext } from './context'
import { TableCell } from './TableCell'
import { TableEmbedRow } from './TableEmbedRow'
import { useLatestCallback } from '@hi-ui/use-latest'
import { setAttrAria } from '@hi-ui/dom-utils'
import { SELECTION_DATA_KEY } from './Table'
import { EMBED_DATA_KEY } from './BaseTable'
import { FlattedTableRowData } from './types'

const _role = 'table'
const _prefix = getPrefixCls(_role)

/**
 * TODO: What is TableRow
 */
export const TableRow = forwardRef<HTMLTableRowElement | null, TableRowProps>(
  (
    {
      prefixCls = _prefix,
      rowData: rowDataProp,
      expandedTree,
      isSumRow, // 是否为合计行
      isAvgRow, // 是否为平均行
      rowIndex,
    },
    ref
  ) => {
    const {
      onHighlightedRowChange,
      isHighlightedRow,
      flattedColumnsWithoutChildren,
      isErrorRow,
      columns,
      embedExpandable,
      // @ts-ignore
      hoverRow,
      draggable,
      // @ts-ignore
      onDragStart: onDragStartContext,
      // @ts-ignore
      onDragLeave: onDragLeaveContext,
      // @ts-ignore
      onDragEnd: onDragEndContext,
      onDrop: onDropContext,
      dragRowRef,
    } = useTableContext()

    const { raw: rowData, id: rowId } = rowDataProp

    // const rowExpand = rowExpandable && rowExpandable(rowData)

    // const sticky = flattedColumnsWithoutChildren.some((item) => {
    //   return (
    //     typeof item.leftStickyWidth !== 'undefined' || typeof item.rightStickyWidth !== 'undefined'
    //   )
    // })

    // ** ************** 拖拽管理 *************** *//

    const [dragging, setDragging] = React.useState(false)
    const [dragDirection, setDragDirection] = React.useState<string>()

    const onDragStartContextLatest = useLatestCallback(onDragStartContext)

    const onDragStart = React.useCallback(
      (evt) => {
        if (!draggable) return

        evt.stopPropagation()

        const clientY = evt.clientY

        dragRowRef.current = {
          startClientY: clientY,
          dragId: rowId,
          rowData: rowData,
        }

        setDragging(true)

        evt.dataTransfer.setData('tableRow', JSON.stringify({ sourceId: rowId }))

        onDragStartContextLatest(rowData)
      },
      [draggable, dragRowRef, onDragStartContextLatest, rowData, rowId]
    )

    const onDragOver = React.useCallback(
      (evt) => {
        if (!draggable) return

        evt.preventDefault()
        evt.stopPropagation()

        if (!dragRowRef.current) return

        const { startClientY, dragId } = dragRowRef.current

        if (dragId === rowId) return

        const hoverClientY = evt.clientY

        if (hoverClientY < startClientY) {
          setDragDirection('top')
        } else {
          setDragDirection('bottom')
        }
      },
      [draggable, dragRowRef, rowId]
    )

    const onDragLeaveContextLatest = useLatestCallback(onDragLeaveContext)

    const onDragLeave = React.useCallback(
      (evt: React.DragEvent) => {
        if (!draggable) return

        evt.preventDefault()
        evt.stopPropagation()

        setDragDirection(undefined)
        onDragLeaveContextLatest(evt)
      },
      [draggable, onDragLeaveContextLatest]
    )

    const onDragEndContextLatest = useLatestCallback(onDragEndContext)

    const onDragEnd = React.useCallback(
      (evt: React.DragEvent) => {
        if (!draggable) return

        evt.preventDefault()
        evt.stopPropagation()

        evt.dataTransfer.clearData()
        dragRowRef.current = null
        setDragDirection(undefined)
        setDragging(false)

        onDragEndContextLatest(evt)
      },
      [draggable, dragRowRef, onDragEndContextLatest]
    )

    const onDropContextLatest = useLatestCallback(onDropContext)

    // 放置目标元素时触发事件
    const onDrop = React.useCallback(
      (evt: React.DragEvent) => {
        // console.log(dragRowRef.current)

        if (!draggable) return
        if (!dragRowRef.current) return

        const { dragId } = dragRowRef.current

        evt.preventDefault()
        evt.stopPropagation()

        setDragDirection(undefined)
        dragRowRef.current = null

        const targetId = rowId

        if (dragId === targetId) return

        try {
          const { sourceId } = JSON.parse(evt.dataTransfer.getData('tableRow'))

          onDropContextLatest(sourceId, targetId, dragDirection)
        } catch (error) {
          console.error(error)
        }
      },
      [draggable, dragRowRef, onDropContextLatest, dragDirection, rowId]
    )

    const handleRowDoubleClick = () => {
      onHighlightedRowChange(rowData, !highlighted)
    }

    // ** ************** 行状态管理 *************** *//

    const highlighted = isHighlightedRow(rowId)
    const hovered = hoverRow === rowId
    const hasError = isErrorRow(rowId)

    const cls = cx(
      `${prefixCls}-row`,
      hasError && `${prefixCls}-row--error`,
      hovered && `${prefixCls}-row--hovered`,
      highlighted && `${prefixCls}-row--highlight`,
      draggable && `${prefixCls}-row--draggable`,
      draggable && dragging && `${prefixCls}-row--dragging`,
      draggable && dragDirection && `${prefixCls}-row--drag-${dragDirection}`,
      isSumRow && `${prefixCls}-row--total`,
      isAvgRow && `${prefixCls}-row--avg`
    )

    const firstColumn = flattedColumnsWithoutChildren.find((item) => {
      return item.dataKey !== SELECTION_DATA_KEY && item.dataKey !== EMBED_DATA_KEY
    })

    return (
      <>
        <tr
          ref={ref}
          className={cls}
          key="row"
          onDoubleClick={handleRowDoubleClick}
          draggable={setAttrAria(draggable)}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          {/* 表格列数据 */}
          {flattedColumnsWithoutChildren.map((column, idx) => {
            return (
              <TableCell
                key={idx}
                column={column}
                isSwitcherCol={firstColumn ? firstColumn.id === column.id : false}
                rowData={rowDataProp}
                rowIndex={rowIndex}
                expandedTree={expandedTree}
              />
            )
          })}
        </tr>

        {/* 可展开的内嵌面板 */}
        {embedExpandable ? (
          <TableEmbedRow colSpan={columns.length} rowData={rowDataProp} rowIndex={rowIndex} />
        ) : null}
      </>
    )
  }
)

export interface TableRowProps {
  /**
   * 组件默认的选择器类
   */
  prefixCls?: string
  /**
   * 是否为总计行
   */
  isSumRow?: boolean
  /**
   * 是否为均值行
   */
  isAvgRow?: boolean
  /**
   * 表格行数据
   */
  rowData: FlattedTableRowData
  /**
   * 表格行数据下标
   */
  rowIndex: number
  /**
   * 是否展开树表格行
   */
  expandedTree?: boolean
}

if (__DEV__) {
  TableRow.displayName = 'TableRow'
}
