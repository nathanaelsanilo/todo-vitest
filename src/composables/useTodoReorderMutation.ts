import type { TodoListDto } from '@/dtos/TodoListDto'
import type { TodoReorderDto } from '@/dtos/TodoReorderDto'
import { TodoService } from '@/services/TodoService'
import { resolver } from '@/utils/Resolver'
import { useMutation, type MutationOptions } from '@tanstack/vue-query'

export function useTodoReorderMutation(
  conf?: MutationOptions<TodoListDto[], unknown, TodoReorderDto>
) {
  const service = resolver(TodoService)
  return useMutation({
    mutationFn: (dto) => service.reorder(dto),
    ...conf
  })
}
