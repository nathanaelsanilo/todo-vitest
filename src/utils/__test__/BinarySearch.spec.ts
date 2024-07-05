import { describe, expect, it } from 'vitest'
import { BinarySearch } from '../search/BinarySearch'

describe('Binary Search', () => {
  it('do search', () => {
    const arr = [5, 9, 22, 29, 35, 56, 72]

    const result = BinarySearch.search(arr, 29)

    expect(result).toBe(29)
  })
})
