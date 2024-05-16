import { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoDetailDto } from '@/dtos/TodoDetailDto'
import { formatTimestamp } from '@/utils/Date'
import type { MutationOptions } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import { useTodoCreateMutation } from './useTodoCreateMutation'

export function useTodoCreate(conf?: MutationOptions<TodoDetailDto, unknown, TodoCreateDto>) {
  const { mutate, isPending } = useTodoCreateMutation(conf)

  const create = (state: { todo: string }) => {
    const dto = new TodoCreateDto()
    dto.setDescription(state.todo)
    dto.setIsComplete(false)
    dto.setTimestamp(formatTimestamp(dayjs()))

    mutate(dto)
  }

  return { create, isLoading: isPending }
}
