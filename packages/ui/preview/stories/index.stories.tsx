import React from 'react'

export * from './basic.stories'

export default {
  title: 'Preview',
  decorators: [(story: Function) => <div>{story()}</div>],
}
