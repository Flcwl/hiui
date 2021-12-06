import React from 'react'

export * from './basic.stories'
export * from './disabled.stories'
export * from './controlled.stories'
export * from './group.stories'

export default {
  title: 'Radio',
  decorators: [(story: Function) => <div>{story()}</div>],
}
