export class SelectionSort {
  static sort(arr: number[]) {
    const n = arr.length

    for (let i = 0; i < n - 1; i++) {
      let min = i

      for (let j = i + 1; j < n; j++) {
        if (arr[j] < arr[min]) {
          min = j
        }
      }

      // swap
      const newMin = arr[min]
      arr[min] = arr[i]
      arr[i] = newMin
    }
  }
}
