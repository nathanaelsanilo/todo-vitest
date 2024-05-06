import { TodoService } from '@/services/TodoService'
import { resolver } from '@/utils/Resolver'
import { useMutation } from '@tanstack/vue-query'

export function useTodoDeleteMutation() {
  const service = resolver(TodoService)

  return useMutation({
    mutationFn: (id: number) => service.delete(id)
  })
}
