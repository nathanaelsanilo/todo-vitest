import { TodoRepositoryToken } from '@/models/injection/Injection'
import { flushPromises, mount } from '@vue/test-utils'
import { container } from 'tsyringe'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { useTodoCreate } from '../todo/useTodoCreate'

describe('useTodoCreate', () => {
  it('should create', async () => {
    // Arrange
    const MockComponent = defineComponent({
      setup() {
        return {
          ...useTodoCreate()
        }
      },
      template: '<div></div>'
    })

    const mockRepository = {
      create: vi.fn()
    }

    container.register(TodoRepositoryToken, {
      useValue: mockRepository
    })

    const wrapper = mount(MockComponent)

    // Act
    wrapper.vm.create({ todo: 'lunch' })

    await flushPromises()

    // Action
    expect(mockRepository.create).toHaveBeenCalled()
  })
})
