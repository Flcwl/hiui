import React from 'react'

export * from './basic.stories'
export * from './placement.stories'
export * from './arrow.stories'
export * from './lazy.stories'
export * from './toggle.stories'
export * from './portal.stories'
export * from './container.stories'
export * from './hook.stories'

export default {
  title: 'Popper',
  decorators: [(story: Function) => <div>{story()}</div>],
}
