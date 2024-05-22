import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import BubbleSort from '../BubbleSort.vue'

describe('BubbleSort.vue', () => {
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
    vi.useFakeTimers()

    const barItem = '[data-testid="bar-item"]'
    const btnSort = '[data-testid="btn-sort"]'

    await wrapper.get(btnSort).trigger('click')
    vi.runAllTimers()

    await flushPromises()

    const items = wrapper.findAll(barItem)

    expect(items).toHaveLength(3)

    const bars = items.map((bar) => <`height: ${number}px;`>bar.attributes('style'))
    expect(bars).toEqual(['height: 1px;', 'height: 2px;', 'height: 3px;'])
  })
})
