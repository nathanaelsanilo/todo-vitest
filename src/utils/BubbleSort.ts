export class BubbleSort {
  static sort(arr: number[]) {
    const n = arr.length

    for (let i = 1; i < n - 1; i++) {
      for (let j = 0; j < n - i; j++) {
        const current = arr[j]
        const next = arr[j + 1]

        if (current > next) {
          arr[j + 1] = current
          arr[j] = next
        }
      }
    }
  }
}
