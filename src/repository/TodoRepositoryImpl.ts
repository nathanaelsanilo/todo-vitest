import type { Todo } from '@/models/Todo'
import type { TodoRepository } from './TodoRepository'

export class TodoRepositoryImpl implements TodoRepository {
  private rows: Todo[] = []

  save(item: Todo) {
    this.rows.push(item)
    return item
  }

  clear() {
    this.rows.length = 0
    return this.rows
  }

  findAll() {
    return this.rows
  }
}
