import { describe, expect, it } from 'vitest'
import { SlidingWindow } from '../technique/SlidingWindow'

describe('Sliding Window', () => {
  it('should find maximum sum of sub array', () => {
    const arr = [8, 5, 1, 3, 9, 1, 3, 1, 5]
    const size = 4
    const result = SlidingWindow.findMaxSum(arr, size)

    expect(result).toBe(18)
  })
})
