import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import VProgress from './VProgress.vue'

describe('VProgress', () => {
  it('it should render VProgress', () => {
    const wrapper = mount(VProgress, {
      props: {
        value: 15
      }
    })
    expect(wrapper.find('[data-testid="vprogress"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="vprogress"]').attributes('value')).toBe('15')
  })
})
