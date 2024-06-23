import { wait } from '@/utils/Wait'
import { type UnwrapNestedRefs } from 'vue'

export function useFindTarget(arr: UnwrapNestedRefs<{ selected: boolean; value: number }[]>) {
  async function find(target: number): Promise<[number, number] | null> {
    let i = 0
    let j = arr.length - 1

    while (i < j) {
      arr[i].selected = true
      arr[j].selected = true
      const sum = arr[i].value + arr[j].value
      if (sum === target) {
        return [arr[i].value, arr[j].value]
      } else if (sum < target) {
        i++
        await wait(500)
        arr[i - 1].selected = false
      } else {
        j--
        await wait(500)
        arr[j + 1].selected = false
      }
    }

    return null
  }

  return { find }
}
