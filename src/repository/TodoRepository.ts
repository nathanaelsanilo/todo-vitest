import type { Todo } from '@/models/Todo'

export interface TodoRepository {
  save(todo: Todo): Todo
  clear(): void
  findAll(): Todo[]
}
