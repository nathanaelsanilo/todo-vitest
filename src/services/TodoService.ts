import type { Todo } from '@/models/Todo'
import type { TodoRepository } from '@/repository/TodoRepository'
import { injectable } from 'tsyringe'

@injectable()
export class TodoService {
  constructor(private db: TodoRepository) {}

  addTodo(item: Todo) {
    return this.db.save(item)
  }

  getAll() {
    return this.db.findAll()
  }
}
