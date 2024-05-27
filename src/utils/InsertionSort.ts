export class InsertionSort {
  static sort(arr: number[]) {
    const n = arr.length

    // start from the first index
    for (let i = 1; i < n; i++) {
      const current = arr[i]

      // compare with the sorted parts
      let j = i - 1

      while (j >= 0 && arr[j] > current) {
        arr[j + 1] = arr[j]
        j = j - 1
      }

      // insert the current value
      arr[j + 1] = current
    }
  }
}
