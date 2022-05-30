import React from 'react'
import DatePicker from '../src'
import LocaleProvider from '@hi-ui/provider'

/**
 * @title 年份 / 月份 / 周
 * @desc 以年份 / 月份 / 周为展示粒度
 */
export const YearMonthWeek = () => {
  return (
    <>
      <h1>年份 / 月份 / 周</h1>
      <div className="date-picker-ymw__wrap">
        <h2>年份</h2>
        <DatePicker
          type="year"
          onChange={(date, dateStr) => {
            console.log('onChange', date, dateStr)
          }}
        />
        <h2>月份</h2>
        <DatePicker
          type="month"
          onChange={(date, dateStr) => {
            console.log('onChange', date, dateStr)
          }}
        />
        <h2>周(周一起始)</h2>
        <DatePicker
          type="week"
          weekOffset={1}
          defaultValue={new Date()}
          onChange={(date, dateStr) => {
            console.log('onChange', date, dateStr)
          }}
        />
        <DatePicker
          type="week"
          altCalendarPreset="zh-CN"
          dateMarkPreset="zh-CN"
          weekOffset={1}
          defaultValue={new Date()}
          onChange={(date, dateStr) => {
            console.log('onChange', date, dateStr)
          }}
        />
        <LocaleProvider locale="en-US">
          <DatePicker
            type="week"
            locale="en-US"
            weekOffset={1}
            defaultValue={new Date()}
            onChange={(date, dateStr) => {
              console.log('onChange', date, dateStr)
            }}
          />
        </LocaleProvider>
        <DatePicker
          type="week"
          locale="en-US"
          weekOffset={1}
          defaultValue={new Date()}
          onChange={(date, dateStr) => {
            console.log('onChange', date, dateStr)
          }}
        />
        <h2>周(周日起始)</h2>
        <DatePicker
          type="week"
          defaultValue={new Date()}
          weekOffset={0}
          onChange={(date, dateStr) => {
            console.log('onChange', date, dateStr)
          }}
        />
        <LocaleProvider locale="en-US">
          <DatePicker
            type="week"
            locale="en-US"
            weekOffset={0}
            defaultValue={new Date()}
            onChange={(date, dateStr) => {
              console.log('onChange', date, dateStr)
            }}
          />
        </LocaleProvider>
      </div>
    </>
  )
}
