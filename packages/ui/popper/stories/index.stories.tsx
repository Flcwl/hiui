import React from 'react'

export * from './basic.stories'
export * from './placement.stories'
export * from './lazy.stories'

export default {
  title: 'Popper',
  decorators: [(story: Function) => <div>{story()}</div>],
}