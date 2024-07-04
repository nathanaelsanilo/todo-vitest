import { NodeItem } from '@/models/linked-list/SinglyLinkedList'

/**
 * @description Two pointer technique
 * - typically used for searching pairs in a sorted array
 * - one pointer slow-runner and the other fast-runner
 * - the input array should be sorted before using two pointer technique
 *
 
 */
export class TwoPointer {
  /**
   * find if there exists any pair of elements arr[i], arr[j]
   * such that their sum is equal to X
   * @param arr input array
   * @param target target sum
   * @returns 1 if found a pair
   */
  static findTarget(arr: number[], target: number): boolean {
    const n = arr.length

    let i = 0 // left pointer
    let j = n - 1 // right pointer

    while (i < j) {
      // found a pair!
      if (arr[i] + arr[j] === target) {
        return true
      }
      // if sum elements of current pointer is LESS than target
      // move left pointer to the next element
      // by INCREMENTING i
      else if (arr[i] + arr[j] < target) {
        i += 1
      }

      // if sum elements of current pointer is MORE than target
      // move right pointer to the previous element
      // by DECREMENTING j
      else {
        j -= 1
      }
    }

    return false
  }

  /**
   * @description leet code #21
   * @see https://leetcode.com/problems/merge-two-sorted-lists/description/
   */
  static mergeLinkedList(
    l1: NodeItem<number> | null,
    l2: NodeItem<number> | null
  ): NodeItem<number> | null {
    const new_node = new NodeItem(0)
    let pointer = new_node

    while (l1 && l2) {
      if (l1.getData() > l2.getData()) {
        pointer.setNext(l2)
        l2 = l2.getNext()
      } else {
        pointer.setNext(l1)
        l1 = l1.getNext()
      }

      pointer = pointer.getNext() as NodeItem<number>
    }

    pointer.setNext(l1 || l2)

    return new_node.getNext()
  }

  /**
   * @description
   * given an array of number. Count unique value in an array
   *
   * constraint
   * - numbers are sorted
   *
   * @example
   * const arr = [1,1,1,2]
   * countUniqueValue(arr) // 2
   *
   * const arr2 = [1,2,2,3,4,4,5]
   * countUniqueValue(arr2) // 5
   *
   * countUniqueValue([]) // 0
   */
  static countUniqueValue(arr: number[]): number {
    if (arr.length === 0) return 0

    let i = 0

    for (let j = 1; j < arr.length; j++) {
      if (arr[i] !== arr[j]) {
        i++
        arr[i] = arr[j]
      }
    }

    return i + 1
  }
}
