import { describe, expect, it } from 'vitest'
import { SelectionSort } from '../SelectionSort'

describe('Selection sort', () => {
  it('should sort', () => {
    const arr = [5, 9, 3, 2, 4]

    SelectionSort.sort(arr)

    expect(arr).toEqual([2, 3, 4, 5, 9])
  })
})
