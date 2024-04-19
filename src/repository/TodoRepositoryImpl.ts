import type { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoDetailDto } from '@/dtos/TodoDetailDto'
import type { TodoListDto } from '@/dtos/TodoListDto'
import type { Todo } from '@/models/Todo'
import { http } from '@/modules/axios'
import type { AxiosResponse } from 'axios'
import type { TodoRepository } from './TodoRepository'

export class TodoRepositoryImpl implements TodoRepository {
  private rows: Todo[] = []

  async create(dto: TodoCreateDto): Promise<TodoDetailDto> {
    return http
      .post<TodoDetailDto, AxiosResponse<TodoDetailDto, TodoCreateDto>>('api/v1/todos', dto)
      .then(({ data }) => data)
  }

  clear() {
    this.rows.length = 0
    return this.rows
  }

  async findAll(): Promise<TodoListDto[]> {
    return http.get<TodoListDto[]>('api/v1/todos').then(({ data }) => data)
  }
}
