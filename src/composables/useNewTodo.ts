import { useTodoListQuery } from './useTodoListQuery'

export function useNewTodo() {
  const todoQuery = useTodoListQuery()

  return { todoQuery }
}
