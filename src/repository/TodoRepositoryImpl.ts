import type { TodoCountCompletedDto } from '@/dtos/TodoCountCompletedDto'
import type { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoDetailDto } from '@/dtos/TodoDetailDto'
import type { TodoListDto } from '@/dtos/TodoListDto'
import type { TodoReorderDto } from '@/dtos/TodoReorderDto'
import type { Todo } from '@/models/todo/Todo'
import type { TodoQueryParams } from '@/models/todo/TodoQueryParams'
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

  async findAll(params: TodoQueryParams): Promise<TodoListDto[]> {
    return http
      .get<TodoListDto[]>('api/v1/todos', {
        params
      })
      .then(({ data }) => data)
  }

  async delete(id: number): Promise<boolean> {
    return http.delete<boolean>(`api/v1/todos/${id}`).then(({ data }) => data)
  }

  async complete(id: number): Promise<TodoDetailDto> {
    return http.patch<TodoDetailDto>(`api/v1/todos/${id}/complete`).then(({ data }) => data)
  }

  async countCompleted(): Promise<TodoCountCompletedDto> {
    return http.get<TodoCountCompletedDto>(`api/v1/todos/completed`).then(({ data }) => data)
  }

  async reorder(dto: TodoReorderDto): Promise<TodoListDto[]> {
    return http.patch<TodoListDto[]>(`api/v1/todos/reorder`, dto).then(({ data }) => data)
  }
}
