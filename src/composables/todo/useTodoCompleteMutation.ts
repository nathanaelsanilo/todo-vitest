import type { TodoDetailDto } from '@/dtos/TodoDetailDto'
import { TodoService } from '@/services/TodoService'
import { resolver } from '@/utils/Resolver'
import { useMutation, type MutationOptions } from '@tanstack/vue-query'

export function useTodoCompleteMutation(conf?: MutationOptions<TodoDetailDto, unknown, number>) {
  const service = resolver(TodoService)
  return useMutation({
    mutationFn: (id) => service.complete(id),
    ...conf
  })
}
