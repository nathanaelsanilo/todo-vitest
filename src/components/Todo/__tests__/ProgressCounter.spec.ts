import { TodoCountCompletedDto } from '@/dtos/TodoCountCompletedDto'
import { TodoRepositoryToken } from '@/models/injection/Injection'
import { mount, type VueWrapper } from '@vue/test-utils'
import { useDateFormat, useNow } from '@vueuse/core'
import { container } from 'tsyringe'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProgressCounter from '../ProgressCounter.vue'

describe('ProgressCounter Component', () => {
  let wrapper: VueWrapper<InstanceType<typeof ProgressCounter>>

  const mockDto = new TodoCountCompletedDto()
  mockDto.completed = 1
  mockDto.progress = 50
  mockDto.total = 2

  beforeEach(() => {
    container.register(TodoRepositoryToken, {
      useValue: {
        countCompleted: vi.fn().mockResolvedValue(mockDto)
      }
    })

    wrapper = mount(ProgressCounter, {
      props: {
        completed: 1,
        progress: 1,
        todos: [
          {
            description: 'lunch',
            id: 1,
            is_complete: true,
            timestamp: useDateFormat(useNow()).value
          }
        ]
      }
    })
  })

  it('should render correctly', () => {
    expect(wrapper).toBeDefined()
  })

  it('it should show total todo', () => {
    const todoLabel = '[data-testid="progress-todo-label"]'
    const display = '1/2'
    expect(wrapper.get(todoLabel).text()).toBe(display)
  })
})
