import type { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoDetailDto } from '@/dtos/TodoDetailDto'
import type { TodoListDto } from '@/dtos/TodoListDto'

export interface TodoRepository {
  create(dto: TodoCreateDto): Promise<TodoDetailDto>
  clear(): void
  findAll(): Promise<TodoListDto[]>
}
