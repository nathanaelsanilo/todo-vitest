import Todo from '@/components/Todo.vue'
import { TodoCountCompletedDto } from '@/dtos/TodoCountCompletedDto'
import { TodoListDto } from '@/dtos/TodoListDto'
import { TodoRepositoryToken } from '@/models/Injection'
import { VueWrapper, mount } from '@vue/test-utils'
import { container } from 'tsyringe'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockTodoCountCompletedDto = new TodoCountCompletedDto()
const mockAll = [new TodoListDto()]

describe('Todo Component', () => {
  let wrapper: VueWrapper<InstanceType<typeof Todo>>

  beforeEach(() => {
    container.register(TodoRepositoryToken, {
      useValue: {
        countCompleted: vi.fn().mockResolvedValue(mockTodoCountCompletedDto),
        findAll: vi.fn().mockResolvedValue(mockAll)
      }
    })

    wrapper = mount(Todo)

    return () => {
      container.reset()
      wrapper.unmount()
    }
  })

  it('it should render component', () => {
    expect(wrapper).toBeDefined()
    expect(wrapper.findComponent({ name: 'TodoInput' })).toBeTruthy()
    expect(wrapper.findComponent({ name: 'ProgressCounter' })).toBeTruthy()
    expect(wrapper.findComponent({ name: 'TodoList' })).toBeTruthy()
  })
})
