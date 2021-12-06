import React from 'react'

export * from './basic.stories'
export * from './custom-icon.stories'
export * from './async.stories'

export default {
  title: 'PopConfirm',
  decorators: [(story: Function) => <div>{story()}</div>],
}
