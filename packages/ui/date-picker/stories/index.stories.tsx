import React from 'react'

export * from './basic.stories'

export default {
  title: 'DatePicker',
  decorators: [(story: Function) => <div>{story()}</div>],
}
