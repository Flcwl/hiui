import React from 'react'
import Timeline from '../src'

export const Group = () => {
  return (
    <>
      <h1>Basic</h1>
      <div className="timeline-basic__wrap">
        <Timeline
          data={[
            {
              groupTitle: '上午',
              children: [
                {
                  title: '管理层例会',
                  content: '毕加索会议室 B2层 可提前预定预…',
                  timestamp: '10:00',
                },
                {
                  title: '社招面试-设计师',
                  content: '总参',
                  timestamp: '10:00',
                },
              ],
            },
            {
              groupTitle: '下午',
              children: [
                {
                  title: '管理层例会',
                  content: '毕加索会议室 B2层 可提前预定预…',
                  timestamp: '12:00',
                },
                {
                  title: '社招面试-设计师',
                  content: '总参',
                  timestamp: '11:00',
                },
              ],
            },
          ]}
        />
      </div>
    </>
  )
}
