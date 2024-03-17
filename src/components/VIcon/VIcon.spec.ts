import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VIcon from './VIcon.vue'
import { defineComponent, h } from 'vue'

describe('VIcon', () => {
  const wrapper = mount(VIcon, {
    props: { as: 'span' },
    slots: {
      default: h('div', 'vicon')
    }
  })

  it('should render VIcon', () => {
    expect(wrapper.get('[data-testid="vicon"]').text()).toBe('vicon')
  })
})
