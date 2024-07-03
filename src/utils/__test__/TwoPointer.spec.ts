import { describe, expect, it } from 'vitest'
import { TwoPointer } from '../technique/TwoPointer'
import { NodeItem } from '@/models/linked-list/SinglyLinkedList'

describe('Two Pointer Technique', () => {
  it('find target of x', () => {
    const arr = [1, 9, 10, 18, 19]
    const target = 10

    arr.sort()

    const result = TwoPointer.findTarget(arr, target)

    expect(result).toBe(1)
  })

  it('should merge two linked list', () => {
    const l1 = new NodeItem(1)
    l1.setNext(new NodeItem(5))
    l1.getNext()?.setNext(new NodeItem(3))

    const l2 = new NodeItem(2)
    l2.setNext(new NodeItem(4))
    l2.getNext()?.setNext(new NodeItem(6))

    const result = TwoPointer.mergeLinkedList(l1, l2)

    let p = result
    while (p !== null) {
      p = p.getNext()
      console.log(p?.getData())
    }
  })
})
