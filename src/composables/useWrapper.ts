import { useMutation } from '@/libs/vue-query'

export function useWrapper() {
  const { mutate } = useMutation()

  return { mutate }
}
