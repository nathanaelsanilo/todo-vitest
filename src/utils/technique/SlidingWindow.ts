export class SlidingWindow {
  static findMaxSum(arr: number[], size: number) {
    let max = 0
    for (let i = 0; i < size; i++) {
      max += arr[i]
    }

    let current = max
    for (let i = size; i < arr.length; i++) {
      current = current - arr[i - size] + arr[i]

      if (current > max) {
        max = current
      }
    }

    return max
  }
}
