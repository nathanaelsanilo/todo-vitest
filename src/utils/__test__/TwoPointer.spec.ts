import { describe, expect, it } from 'vitest'
import { TwoPointer } from '../TwoPointer'

describe('Two Pointer Technique', () => {
  it('find target of x', () => {
    const arr = [1, 9, 10, 18, 19]
    const target = 10

    arr.sort()

    const result = TwoPointer.findTarget(arr, target)

    expect(result).toBe(1)
  })
})
