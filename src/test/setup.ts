import { TodoRepositoryToken } from '@/models/Injection'
import { Todo } from '@/models/Todo'
import { container } from 'tsyringe'
import { vi } from 'vitest'

export function setup() {
  function mockTodoBuilder(label: string): Todo {
    const mockTodo = new Todo()
    mockTodo.label = label
    return mockTodo
  }

  function init() {
    container.register(TodoRepositoryToken, {
      useClass: vi.fn().mockImplementation(() => ({
        save: vi
          .fn()
          .mockReturnValueOnce(mockTodoBuilder('lunch'))
          .mockReturnValueOnce(mockTodoBuilder('dinner'))
      }))
    })
  }

  return { init }
}
