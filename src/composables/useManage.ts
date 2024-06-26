import { useLib } from '@/libs/useLib'
import { formatDate } from '@/utils/Date'
import dayjs from 'dayjs'
import { useWrapper } from './useWrapper'

export function useManage() {
  const lib = useLib()
  const mutation = useWrapper()

  function sign() {
    const result = lib.minus(10)
    formatDate(dayjs())

    return result
  }

  function copy() {
    mutation.mutate()
  }

  return { sign, copy }
}
