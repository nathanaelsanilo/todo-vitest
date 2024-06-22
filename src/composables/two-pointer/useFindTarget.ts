export function useFindTarget() {
  function find(arr: number[], target: number): [number, number] | null {
    let i = 0
    let j = arr.length - 1

    while (i < j) {
      const sum = arr[i] + arr[j]
      if (sum === target) {
        return [arr[i], arr[j]]
      } else if (sum < target) {
        i++
      } else {
        j--
      }
    }

    return null
  }

  return { find }
}
