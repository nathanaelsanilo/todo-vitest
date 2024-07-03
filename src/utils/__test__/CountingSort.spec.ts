import { describe, expect, it } from 'vitest'
import { CountingSort } from '../sorts/CountingSort'

describe('Counting Sort', () => {
  it('should sort', () => {
    const arr = [2, 3, 0, 2, 3, 2]

    const sorted = CountingSort(arr)

    expect(sorted).toEqual([0, 2, 2, 2, 3, 3])
  })
})
