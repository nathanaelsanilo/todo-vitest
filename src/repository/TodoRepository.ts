import type { TodoCountCompletedDto } from '@/dtos/TodoCountCompletedDto'
import type { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoDetailDto } from '@/dtos/TodoDetailDto'
import type { TodoListDto } from '@/dtos/TodoListDto'
import type { TodoQueryParams } from '@/models/TodoQueryParams'

export interface TodoRepository {
  create(dto: TodoCreateDto): Promise<TodoDetailDto>
  clear(): void
  findAll(params?: TodoQueryParams): Promise<TodoListDto[]>
  delete(id: number): Promise<boolean>
  complete(id: number): Promise<TodoDetailDto>
  countCompleted(): Promise<TodoCountCompletedDto>
}
