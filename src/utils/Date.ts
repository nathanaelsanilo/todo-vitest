import type { Dayjs } from 'dayjs'

export function formatDate(d: Dayjs) {
  return d.format('D MMM, H:m')
}
