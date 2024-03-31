import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ProgressCounter from '../ProgressCounter.vue'
import { Todo } from '@/models/Todo'
import dayjs from 'dayjs'
import { i18n } from '@/modules/i18n'

describe('ProgressCounter Component', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    const todo = new Todo()
    todo.isComplete = true
    todo.label = 'lunch'
    todo.timestamp = dayjs()

    const dummy = [todo]

    wrapper = mount(ProgressCounter, {
      props: {
        completed: 1,
        progress: 1,
        todos: dummy
      },
      global: {
        plugins: [i18n],
        mocks: {
          t: (key: string) => key
        }
      }
    })
  })

  it('it should show total todo', () => {
    const todoLabel = '[data-testid="progress-todo-label"]'
    const display = '1/1'
    expect(wrapper.get(todoLabel).text()).toBe(display)
  })
})
