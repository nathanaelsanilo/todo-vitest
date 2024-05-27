import { describe, expect, it } from 'vitest'
import { InsertionSort } from '../InsertionSort'

describe('Insertion sort', () => {
  it('should sort', () => {
    const arr = [5, 2, 10, 44, 3]

    InsertionSort.sort(arr)

    expect(arr).toEqual([2, 3, 5, 10, 44])
  })
})
