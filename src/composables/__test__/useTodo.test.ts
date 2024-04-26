import type { TodoListDto } from '@/dtos/TodoListDto'
import { TodoRepositoryToken } from '@/models/Injection'
import * as AxiosModule from '@/modules/axios'
import { TodoRepositoryImpl } from '@/repository/TodoRepositoryImpl'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { container } from 'tsyringe'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { useNewTodo } from '../useNewTodo'

vi.mock('@/modules/axios', () => {
  return {
    http: {
      get: vi.fn().mockResolvedValue({ data: true })
    }
  }
})

const mockAll: TodoListDto[] = [
  {
    description: 'this is mock',
    id: 1,
    is_complete: false,
    timestamp: '1990-01-01 00:00'
  }
]

describe('useTodo.test', () => {
  const TestComponent = defineComponent({
    setup() {
      return {
        ...useNewTodo()
      }
    },
    template: '<div></div>'
  })

  let component: VueWrapper<InstanceType<typeof TestComponent>>

  beforeAll(() => {
    container.register(TodoRepositoryToken, {
      useClass: TodoRepositoryImpl
    })
  })

  beforeEach(() => {
    return () => {
      component.unmount()
    }
  })

  it('should find all todo', async () => {
    vi.mocked(AxiosModule.http.get).mockImplementationOnce(() => {
      return Promise.resolve({ data: mockAll })
    })

    component = mount(TestComponent)

    await flushPromises()

    expect(vi.isMockFunction(AxiosModule.http.get)).toBe(true)
    expect(AxiosModule.http.get).toHaveBeenCalled()
    expect(AxiosModule.http.get).toHaveBeenCalledWith('api/v1/todos', {
      params: undefined
    })
  })
})
