import type { Todo } from '@/models/Todo'
import { injectable } from 'tsyringe'

@injectable()
export class TodoRepository {
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
