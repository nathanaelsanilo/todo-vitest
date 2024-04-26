import { useMutation } from './vue-query'

export function useLib() {
  function plus() {
    return 'plus'
  }

  function minus(n: number) {
    return 'minus'
  }

  function clear() {
    console.log('clear')
  }

  return { plus, minus, clear }
}
export const lib = useLib()
export const person = {
  run() {},
  sit() {},
  talk() {}
}

export function useConsume() {
  return useMutation()
}
