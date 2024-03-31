import dayjs, { type Dayjs } from 'dayjs'

export interface ITodo {
  label: string
  isComplete: boolean
  timestamp: Dayjs
}

export class Todo implements ITodo {
  isComplete = false
  label = ''
  timestamp = dayjs()
}
