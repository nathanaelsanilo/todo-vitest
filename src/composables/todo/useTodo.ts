import { TodoQueryParams } from '@/models/todo/TodoQueryParams'
import { useTodoListQuery } from './useTodoListQuery'

export function useTodo() {
  const params = new TodoQueryParams()
  const todoQuery = useTodoListQuery(params)

  return { todoQuery }
}
