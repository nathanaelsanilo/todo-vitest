import { Dayjs } from 'dayjs'

export function formatDate(d: Dayjs) {
  return d.format('D MMM, H:m')
}

export function formatTimestamp(d: Dayjs) {
  return d.format('YYYY-MM-DD HH:mm:ss')
}
