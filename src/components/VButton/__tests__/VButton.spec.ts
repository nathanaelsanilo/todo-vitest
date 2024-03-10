import { mount, type VueWrapper } from '@vue/test-utils'
import VButton from '../VButton.vue'
import { describe, it, beforeEach, expect } from 'vitest'
import type { Props } from '../types.ts'

let wrapper: VueWrapper
const btn = '[data-testid="vbutton"]'
beforeEach(() => {
  wrapper = mount(VButton)
})

describe('VButton', () => {
  it('should render VButton', async () => {
    const props: Props = {
      label: 'button'
    }
    await wrapper.setProps(props)
    expect(wrapper.get(btn).text()).toBe('button')
  })

  it('should render primary color', async () => {
    const props: Props = {
      colors: 'primary',
      label: 'button'
    }
    await wrapper.setProps(props)
    expect(wrapper.get(btn).classes('is-primary')).toBe(true)
  })
})
