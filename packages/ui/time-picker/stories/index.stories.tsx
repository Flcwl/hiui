import React from 'react'

export * from './basic.stories'

export default {
  title: 'TimePicker',
  decorators: [(story: Function) => <div>{story()}</div>],
}
