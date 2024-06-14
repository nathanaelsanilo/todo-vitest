export function CountingSort(arr: number[]) {
  const max_int = Math.max(...arr)
  // setup the counting array from possible different values
  const counting_array = Array(max_int + 1).fill(0)

  // counting array
  while (arr.length > 0) {
    const first = <number>arr.shift() // pop the first element in array
    counting_array[first] += 1 // counting
  }

  // recreate array
  for (let i = 0; i < counting_array.length; i++) {
    // insert the value to arr
    while (counting_array[i] > 0) {
      // insert the real value
      arr.push(i)
      counting_array[i] -= 1
    }
  }

  return arr
}
