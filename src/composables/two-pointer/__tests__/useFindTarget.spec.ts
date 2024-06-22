import { describe, expect, it } from 'vitest'
import { useFindTarget } from '../useFindTarget'

describe('useFindTarget', () => {
  it('should return value', () => {
    const arr = [3, 4, 1, 2, 0, 5]
    const { find, sort } = useFindTarget(arr, 7)

    sort()

    const res = find()

    expect(res).toEqual([2, 5])
  })
})
