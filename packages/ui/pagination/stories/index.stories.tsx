import React from 'react'

export * from './basic.stories'
export * from './mini-input.stories'
export * from './page-size-options.stories'

export default {
  title: 'Pagination',
  decorators: [(story: Function) => <div>{story()}</div>],
}
