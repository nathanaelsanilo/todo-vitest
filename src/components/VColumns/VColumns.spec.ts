import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe } from 'node:test'
import { it } from 'vitest'
import VColumns from './VColumns.vue'

describe('VColumns', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(VColumns)
  })

  it('it should render VColumns', () => {})
})
