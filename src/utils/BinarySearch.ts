/**
 * @description used to find position of a target value within a SORTED array
 *
 * input requirements
 * 1. sorted array
 * 2. contstant time of access O(1) in any data structure
 */
export class BinarySearch {
  static search(arr: number[], k: number) {
    let left = 0
    let right = arr.length - 1

    while (left < right) {
      const mid = Math.floor((right - left) / 2)

      if (arr[mid] < k) {
        left = mid + 1
      } else if (arr[mid] > k) {
        right = mid - 1
      } else {
        return true
      }
    }

    return false
  }
}
