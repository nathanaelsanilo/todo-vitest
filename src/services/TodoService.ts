import { TodoRepositoryToken } from '@/models/Injection'
import type { Todo } from '@/models/Todo'
import type { TodoRepository } from '@/repository/TodoRepository'
import { inject, injectable } from 'tsyringe'

@injectable()
export class TodoService {
  constructor(@inject(TodoRepositoryToken) private db: TodoRepository) {}

  addTodo(item: Todo) {
    return this.db.save(item)
  }

  getAll() {
    return this.db.findAll()
  }
}
