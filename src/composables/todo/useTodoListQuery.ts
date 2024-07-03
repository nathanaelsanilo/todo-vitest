import { todoKeys } from '@/models/todo/QueryKey'
import type { TodoQueryParams } from '@/models/todo/TodoQueryParams'
import { TodoService } from '@/services/TodoService'
import { resolver } from '@/utils/Resolver'
import { useQuery } from '@tanstack/vue-query'

export function useTodoListQuery(params: TodoQueryParams) {
  const service = resolver(TodoService)

  return useQuery({
    queryKey: todoKeys.list(params),
    queryFn: () => service.findAll(params)
  })
}
