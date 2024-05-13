import { TodoRepositoryToken } from '@/models/Injection'
import { flushPromises, mount } from '@vue/test-utils'
import { container } from 'tsyringe'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent } from 'vue'
import { useTodoCompleteMutation } from '../useTodoCompleteMutation'

describe('useTodoCompleteMutation', () => {
  const MockComponent = defineComponent({
    setup() {
      return {
        ...useTodoCompleteMutation()
      }
    },
    template: '<div></div>'
  })

  it('should call service', async () => {
    const mockRepository = {
      complete: vi.fn()
    }

    container.register(TodoRepositoryToken, {
      useValue: mockRepository
    })

    const wrapper = mount(MockComponent)

    wrapper.vm.mutate(1)

    await flushPromises()

    expect(mockRepository.complete).toHaveBeenCalledWith(1)
  })
})
