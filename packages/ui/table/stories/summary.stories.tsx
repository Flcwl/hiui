import React from 'react'
import Table, { TableColumnItem } from '../src'

export const Summary = () => {
  const [columns] = React.useState<TableColumnItem[]>([
    {
      title: '商品名',
      dataKey: 'name',
      width: 150,
    },
    {
      title: '品类',
      dataKey: 'type',
      width: 150,
    },
    {
      title: '规格',
      dataKey: 'size',
      width: 150,
    },
    {
      title: '单价',
      dataKey: 'price',
      align: 'right',
      width: 150,
    },
    {
      title: '门店',
      dataKey: 'address',
      width: 150,
    },
    {
      title: '库存',
      dataKey: 'stock',
      align: 'right',
      width: 150,
    },
  ])
  const [data] = React.useState([
    {
      name: '小米9',
      type: '手机',
      size: '6G+64G 全息幻彩蓝',
      price: '3299.00',
      address: '华润五彩城店',
      stock: '29,000',
      key: 1,
    },
    {
      name: '小米9 SE',
      type: '手机',
      size: '6G+64G 全息幻彩蓝',
      price: '1999.00',
      address: '清河店',
      stock: '10,000',
      key: 2,
    },
    {
      name: '小米8',
      type: '手机',
      size: '6G+64G 全息幻彩蓝',
      price: '2599.00',
      address: '双安店',
      stock: '12,000',
      key: 3,
    },
    {
      name: 'Redmi Note7',
      type: '手机',
      size: '6G+64G 全息幻彩蓝',
      price: '999.00',
      address: '华润五彩城店',
      stock: '140,000',
      key: 4,
    },
    {
      name: '小米8 SE',
      type: '手机',
      size: '6G+64G 全息幻彩蓝',
      price: '699.00',
      address: '双安店',
      stock: '12,000',
      key: 5,
    },
  ])

  return (
    <>
      <h1>Summary for Table</h1>
      <div className="table-summary__wrap" style={{ width: 800, background: '#eee' }}>
        <Table
          columns={columns}
          data={data}
          fixedToColumn={{ right: 'stock' }}
          summary={(data: any[]) => {
            const totalPrice = data.reduce((acc, { price }) => {
              acc += Number(price)
              return acc
            }, 0)

            return [
              // 键为对应列的 dataKey，值为对应内容
              {
                name: '合计金额',
                price: `￥${totalPrice.toFixed(2)}`,
                type: 'xxx',
              },
              {
                name: '总结行',
                price: `总结内容`,
              },
            ]
          }}
        />
      </div>
    </>
  )
}
