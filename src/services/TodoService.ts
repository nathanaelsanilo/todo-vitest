import type { TodoCountCompletedDto } from '@/dtos/TodoCountCompletedDto'
import type { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoDetailDto } from '@/dtos/TodoDetailDto'
import type { TodoListDto } from '@/dtos/TodoListDto'
import type { TodoReorderDto } from '@/dtos/TodoReorderDto'
import { TodoRepositoryToken } from '@/models/injection/Injection'
import type { TodoQueryParams } from '@/models/todo/TodoQueryParams'
import type { TodoRepository } from '@/repository/TodoRepository'
import { inject, injectable } from 'tsyringe'

/**
 * @see https://dev.to/masanori_msl/typescript-try-di-with-tsyringe-p4n
 */
@injectable()
export class TodoService {
  constructor(@inject(TodoRepositoryToken) private db: TodoRepository) {}

  addTodo(item: TodoCreateDto): Promise<TodoDetailDto> {
    return this.db.create(item)
  }

  findAll(params?: TodoQueryParams): Promise<TodoListDto[]> {
    return this.db.findAll(params)
  }

  delete(id: number): Promise<boolean> {
    return this.db.delete(id)
  }

  complete(id: number): Promise<TodoDetailDto> {
    return this.db.complete(id)
  }

  countCompleted(): Promise<TodoCountCompletedDto> {
    return this.db.countCompleted()
  }

  reorder(dto: TodoReorderDto): Promise<TodoListDto[]> {
    return this.db.reorder(dto)
  }
}
