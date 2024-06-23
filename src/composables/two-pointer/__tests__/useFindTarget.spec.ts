import { beforeEach, describe, expect, it, vi } from 'vitest'
import { reactive } from 'vue'
import { useFindTarget } from '../useFindTarget'

describe('useFindTarget', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should return value', async () => {
    const arr = reactive([
      {
        selected: false,
        value: 7
      },
      {
        selected: false,
        value: 4
      },
      {
        selected: false,
        value: 2
      },
      {
        selected: false,
        value: 1
      },
      {
        selected: false,
        value: 5
      },
      {
        selected: false,
        value: 9
      },
      {
        selected: false,
        value: 8
      },
      {
        selected: false,
        value: 3
      },
      {
        selected: false,
        value: 6
      }
    ])
    const { find } = useFindTarget(arr)

    const res = await find(7)
    await vi.runAllTimersAsync()

    expect(res).toEqual([2, 5])
  })
})
