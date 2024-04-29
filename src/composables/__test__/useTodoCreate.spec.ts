import { describe, expect, it, vi } from 'vitest'
import { useTodoCreate } from '../useTodoCreate'
import { useTodoCreateMutation } from '../useTodoCreateMutation'
import { container } from 'tsyringe'
import { TodoRepositoryToken } from '@/models/Injection'
import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'

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
