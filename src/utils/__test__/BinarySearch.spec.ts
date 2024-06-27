import { describe, expect, it } from 'vitest'
import { BinarySearch } from '../BinarySearch'

describe('Binary Search', () => {
  it('do search', () => {
    const arr = [8, 1, 3, 2, 5, 0, 9]
    arr.sort()

    const result = BinarySearch.search(arr, 9)

    expect(result).toBe(true)
  })
})
