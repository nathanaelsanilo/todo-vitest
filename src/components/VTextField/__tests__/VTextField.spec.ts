import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Props } from '../types'
import VTextField from '../VTextField.vue'

describe('VTextField', () => {
  let wrapper: VueWrapper
  const label = '[data-testid="vtextfield-label"]'
  const input = '[data-testid="vtextfield-input"]'

  beforeEach(() => {
    const props: Props = {
      modelValue: undefined,
      label: 'name',
      id: 'name',
      name: 'name'
    }
    wrapper = mount(VTextField, { props: props })
  })

  it('it should render', async () => {
    expect(wrapper.get(label).text()).toBe('name')
    expect(wrapper.get(input).attributes('id')).toBe('name')
  })

  it('it should update modelValue', async () => {
    const mock = 'lorem ipsum'
    await wrapper.setProps({
      'onUpdate:modelValue': (val: string) => wrapper.setProps({ modelValue: val })
    })
    await wrapper.find(input).setValue(mock)
    expect(wrapper.emitted('update:modelValue'), 'emits model').toEqual([[mock]])
    expect(wrapper.props()).toHaveProperty('modelValue', mock)
  })
})
