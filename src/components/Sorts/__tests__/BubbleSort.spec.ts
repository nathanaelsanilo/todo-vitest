import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import BubbleSort from '../BubbleSort.vue'

describe('BubbleSort.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should sort', async () => {
    const wrapper = mount(BubbleSort, {
      props: {
        data: [
          { selected: false, value: 1 },
          {
            selected: false,
            value: 3
          },
          {
            selected: false,
            value: 2
          }
        ]
      }
    })

    const barItem = '[data-testid="bar-item"]'
    const btnSort = '[data-testid="btn-sort"]'

    await wrapper.get(btnSort).trigger('click')
    await vi.runAllTimersAsync()

    await flushPromises()

    const items = wrapper.findAll(barItem).map((e) => e.getCurrentComponent()?.props.value)

    expect(items).toHaveLength(3)
    expect(items).toEqual([1, 2, 3])
  })
})
