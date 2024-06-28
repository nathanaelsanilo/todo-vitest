/**
 * @description used to find position of a target value within a SORTED array
 *
 * input requirements
 * 1. sorted array
 * 2. contstant time of access O(1) in any data structure
 */
export class BinarySearch {
  static search(arr: number[], k: number): number {
    let left = 0 // left pointer
    let right = arr.length - 1 // right most pointer

    while (left <= right) {
      // count mid index on each iteration
      const mid = Math.floor((left + right) / 2)

      // if mid value less than target value (k)
      if (arr[mid] < k) {
        // move left pointer to the mid + 1
        left = mid + 1
      } else if (arr[mid] > k) {
        // else move right pointer to the mid - 1
        right = mid - 1
      } else {
        // else should be arr[mid] equal with target value (k)
        return arr[mid]
      }
    }

    // return the correct value
    return arr[left]
  }
}
