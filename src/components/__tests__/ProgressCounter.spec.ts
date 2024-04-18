import { mount, type VueWrapper } from '@vue/test-utils'
import { useDateFormat, useNow } from '@vueuse/core'
import { beforeEach, describe, expect, it } from 'vitest'
import ProgressCounter from '../ProgressCounter.vue'

describe('ProgressCounter Component', () => {
  let wrapper: VueWrapper<InstanceType<typeof ProgressCounter>>

  beforeEach(() => {
    wrapper = mount(ProgressCounter, {
      props: {
        completed: 1,
        progress: 1,
        todos: [
          {
            description: 'lunch',
            id: 1,
            is_complete: true,
            timestamp: useDateFormat(useNow()).value
          }
        ]
      }
    })
  })

  it('should render correctly', () => {
    expect(wrapper).toBeDefined()
  })

  it('it should show total todo', () => {
    const todoLabel = '[data-testid="progress-todo-label"]'
    const display = '1/1'
    expect(wrapper.get(todoLabel).text()).toBe(display)
  })
})
