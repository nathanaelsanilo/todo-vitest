import { formatDate } from '@/utils/Date'
import dayjs from 'dayjs'

export interface ITodo {
  label: string
  isComplete: boolean
  timestamp: string
}

export class Todo implements ITodo {
  isComplete = false
  label = ''
  timestamp = formatDate(dayjs())
}
