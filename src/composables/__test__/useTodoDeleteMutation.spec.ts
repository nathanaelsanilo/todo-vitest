import { TodoRepositoryToken } from '@/models/Injection'
import { mount } from '@vue/test-utils'
import { container } from 'tsyringe'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { useTodoDeleteMutation } from '../useTodoDeleteMutation'

describe('useTodoDeleteMutation', () => {
  it('should call service', async () => {
    const MockComponent = defineComponent({
      setup() {
        return {
          ...useTodoDeleteMutation()
        }
      },
      template: '<div></div>'
    })

    const mockRepository = {
      delete: vi.fn()
    }
    container.register(TodoRepositoryToken, {
      useValue: mockRepository
    })

    const wrapper = mount(MockComponent)

    await wrapper.vm.mutateAsync(1)

    expect(mockRepository.delete).toHaveBeenCalledWith(1)
  })
})
