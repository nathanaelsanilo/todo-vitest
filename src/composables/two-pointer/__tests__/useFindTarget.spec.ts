import { describe, expect, it } from 'vitest'
import { useFindTarget } from '../useFindTarget'

describe('useFindTarget', () => {
  it('should return value', () => {
    const arr = [3, 4, 1, 2, 0, 5].sort()
    const { find } = useFindTarget()

    const res = find(arr, 7)

    expect(res).toEqual([2, 5])
  })
})
