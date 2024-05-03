import { TodoService } from '@/services/TodoService'
import { resolver } from '@/utils/Resolver'
import { useQuery } from '@tanstack/vue-query'

export function useTodoProgressQuery() {
  const service = resolver(TodoService)
  return useQuery({
    queryKey: ['todo', 'count-completed'],
    queryFn: () => service.countCompleted()
  })
}
