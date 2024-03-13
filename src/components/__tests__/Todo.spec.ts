import Todo from '@/components/Todo.vue'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Todo Component', () => {
  let wrapper: VueWrapper
  const txtInput = '[data-testid="input-todo"]'
  const btnAdd = '[data-testid="btn-add"]'
  const todoItem = '[data-testid="item-todo"]'
  const btnDelete = '[data-testid="btn-delete"]'
  const todo = 'lunch'

  beforeEach(() => {
    wrapper = mount(Todo)

    return () => wrapper.unmount()
  })

  it('it should render component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('it should have input', () => {
    expect(wrapper.get(txtInput)).toBeTruthy()
  })

  it('it shouuld have add button', () => {
    expect(wrapper.get(btnAdd).text()).toBe('Add Todo')
  })

  it('it should add new todo', async () => {
    await wrapper.get(txtInput).setValue(todo)
    await wrapper.get(btnAdd).trigger('submit.prevent')
    const item = wrapper.find(todoItem)

    expect(item.text()).toBe(todo)
    expect(wrapper.find<HTMLInputElement>(txtInput).element.value).toBe('')
  })

  it('it should delete todo', async () => {
    await wrapper.get(txtInput).setValue(todo)
    await wrapper.get(btnAdd).trigger('submit.prevent')
    await wrapper.get(btnDelete).trigger('click')

    expect(wrapper.findAll(todoItem)).toHaveLength(0)
  })

  it('it should complete todo', async () => {
    const checkbox = '[data-testid="cb-complete"]'

    await wrapper.get(txtInput).setValue(todo)
    await wrapper.get(btnAdd).trigger('submit.prevent')
    await wrapper.get(checkbox).setValue()

    expect(wrapper.get(todoItem).classes('is-complete')).toBe(true)
  })
})
