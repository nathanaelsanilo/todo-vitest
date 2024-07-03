import { useTodo } from '@/composables/todo/useTodo'
import type { TodoListDto } from '@/dtos/TodoListDto'
import { TodoRepositoryToken } from '@/models/injection/Injection'
import { TodoQueryParams } from '@/models/todo/TodoQueryParams'
import * as AxiosModule from '@/modules/axios'
import { TodoRepositoryImpl } from '@/repository/TodoRepositoryImpl'
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import { container } from 'tsyringe'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'

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
    timestamp: '1990-01-01 00:00',
    order_key: 1
  }
]

describe('useTodo.test', () => {
  const TestComponent = defineComponent({
    setup() {
      return {
        ...useTodo()
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
    const assertParams = new TodoQueryParams()

    component = mount(TestComponent)

    await flushPromises()

    expect(vi.isMockFunction(AxiosModule.http.get)).toBe(true)
    expect(AxiosModule.http.get).toHaveBeenCalled()
    expect(AxiosModule.http.get).toHaveBeenCalledWith('api/v1/todos', {
      params: assertParams
    })
  })
})
