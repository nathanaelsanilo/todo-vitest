import { todoKeys } from '@/models/todo/QueryKey'
import { TodoService } from '@/services/TodoService'
import { resolver } from '@/utils/Resolver'
import { useQuery } from '@tanstack/vue-query'

export function useTodoProgressQuery() {
  const service = resolver(TodoService)
  return useQuery({
    queryKey: todoKeys.progress(),
    queryFn: () => service.countCompleted()
  })
}
