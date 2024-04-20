import { TodoDetailDto } from '@/dtos/TodoDetailDto'
import type { TodoListDto } from '@/dtos/TodoListDto'
import { TodoRepositoryToken } from '@/models/Injection'
import { container } from 'tsyringe'
import { vi } from 'vitest'

export function setup() {
  function mockTodo(): TodoDetailDto {
    const mockTodo = new TodoDetailDto()
    mockTodo.description = 'lunch'
    mockTodo.id = 1
    mockTodo.is_complete = false
    mockTodo.timestamp = ''
    return mockTodo
  }

  function mockAllTodo(): TodoListDto[] {
    return [
      {
        description: 'lunch',
        is_complete: false,
        id: 1,
        timestamp: ''
      },
      {
        description: 'dinner',
        is_complete: true,
        id: 2,
        timestamp: ''
      }
    ]
  }

  function init() {
    container.register(TodoRepositoryToken, {
      useValue: {
        create: vi
          .fn()
          .mockResolvedValueOnce({
            ...mockTodo()
          })
          .mockResolvedValueOnce({
            ...mockTodo(),
            id: 2,
            timestamp: ''
          }),
        findAll: vi.fn().mockResolvedValue(mockAllTodo())
      }
    })
  }

  return { init, mockAllTodo, mockTodo }
}
