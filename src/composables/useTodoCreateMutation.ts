import type { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoDetailDto } from '@/dtos/TodoDetailDto'
import { TodoService } from '@/services/TodoService'
import { resolver } from '@/utils/Resolver'
import { useMutation, type MutationOptions } from '@tanstack/vue-query'

export function useTodoCreateMutation(
  conf?: MutationOptions<TodoDetailDto, unknown, TodoCreateDto>
) {
  const service = resolver(TodoService)
  return useMutation({
    ...conf,
    mutationFn: (dto: TodoCreateDto) => service.addTodo(dto)
  })
}
