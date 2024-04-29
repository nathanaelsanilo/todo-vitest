import { TodoCreateDto } from '@/dtos/TodoCreateDto'
import { useTodoCreateMutation } from './useTodoCreateMutation'
import { formatTimestamp } from '@/utils/Date'
import dayjs from 'dayjs'
import type { MutationOptions } from '@tanstack/vue-query'
import type { TodoDetailDto } from '@/dtos/TodoDetailDto'

export function useTodoCreate(conf?: MutationOptions<TodoDetailDto, unknown, TodoCreateDto>) {
  const { mutate } = useTodoCreateMutation(conf)

  const create = (state: { todo: string }) => {
    const dto = new TodoCreateDto()
    dto.setDescription(state.todo)
    dto.setIsComplete(false)
    dto.setTimestamp(formatTimestamp(dayjs()))

    mutate(dto)
  }

  return { create }
}
