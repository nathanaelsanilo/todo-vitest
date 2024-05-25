import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SelectionSort from '../SelectionSort.vue'

describe('Selection sort', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should sort', async () => {
    const wrapper = mount(SelectionSort, {
      props: {
        data: [
          {
            lowest: false,
            selected: false,
            value: 5
          },
          {
            lowest: false,
            selected: false,
            value: 1
          },
          {
            lowest: false,
            selected: false,
            value: 10
          },
          {
            lowest: false,
            selected: false,
            value: 3
          }
        ]
      }
    })

    const btnSort = '[data-testid="btn-sort"]'
    const barItem = '[data-testid="bar-item"]'

    await wrapper.get(btnSort).trigger('click')
    await vi.runAllTimersAsync()

    await flushPromises()

    const items = wrapper.findAll(barItem).map((e) => e.getCurrentComponent()?.props.value)

    expect(items).toHaveLength(4)
    expect(items).toEqual([1, 3, 5, 10])
  })
})
