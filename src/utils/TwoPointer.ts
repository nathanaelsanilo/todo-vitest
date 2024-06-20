/**
 * @description Two pointer technique
 * - typically used for searching pairs in a sorted array
 * - one pointer slow-runner and the other fast-runner
 * - the input array should be sorted before using two pointer technique
 *
 * find if there exists any pair of elements arr[i], arr[j]
 * such that their sum is equal to X
 *
 * @param arr array of number
 * @param target the sum target
 */
export class TwoPointer {
  static findTarget(arr: number[], target: number) {
    const n = arr.length

    let i = 0 // left pointer
    let j = n - 1 // right pointer

    while (i < j) {
      // found a pair!
      if (arr[i] + arr[j] === target) {
        return 1
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
  }
}
