import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import VColumns from './VColumns.vue'

describe('VColumns', () => {
  let wrapper: VueWrapper<InstanceType<typeof VColumns>>

  beforeEach(() => {
    wrapper = mount(VColumns)

    return () => wrapper.unmount()
  })

  it('it should render VColumns', () => {
    expect(wrapper.classes('columns')).toBe(true)
  })
})
