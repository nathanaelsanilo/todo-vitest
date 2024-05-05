import { TodoRepositoryToken } from '@/models/Injection'
import { TodoRepositoryImpl } from '@/repository/TodoRepositoryImpl'
import { formatTimestamp } from '@/utils/Date'
import { flushPromises, mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import { container } from 'tsyringe'
import { describe, expect, it, vi } from 'vitest'
import TodoInput from '../TodoInput.vue'

describe('TodoInput.vue', () => {
  it('component should mount', () => {
    container.register(TodoRepositoryToken, {
      useValue: {
        create: vi.fn()
      }
    })

    const wrapper = mount(TodoInput, {})
    expect(wrapper).toBeDefined()
  })

  it('should call service', async () => {
    container.register(TodoRepositoryToken, {
      useClass: TodoRepositoryImpl
    })

    vi.spyOn(TodoRepositoryImpl.prototype, 'create').mockResolvedValue({
      description: '',
      id: 1,
      is_complete: false,
      timestamp: ''
    })

    const wrapper = mount(TodoInput, {})
    await wrapper.get('[data-testid="input-todo"]').setValue('lunch')
    await wrapper.get('[data-testid="btn-add"]').trigger('submit')

    await flushPromises()

    expect(TodoRepositoryImpl.prototype.create).toHaveBeenCalledWith({
      description: 'lunch',
      is_complete: false,
      timestamp: formatTimestamp(dayjs())
    })
  })
})
