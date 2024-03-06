import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Todo from '@/components/Todo.vue'

describe('Todo Component', () => {
  it('it should render component', () => {
    const wrapper = mount(Todo)
    expect(wrapper).toBeDefined()
  })

  it('it should have input', () => {
    const wrapper = mount(Todo)
    const txtInput = '[data-testid="input-todo"]'
    expect(wrapper.get(txtInput)).toBeTruthy()
  })

  it('it shouuld have add button', () => {
    const wrapper = mount(Todo)
    const btnAdd = '[data-testid="btn-add"]'
    expect(wrapper.get(btnAdd)).toBeTruthy()
  })

  it('it should add new todo', async () => {
    const wrapper = mount(Todo)
    const btnAdd = '[data-testid="btn-add"]'
    const txtInput = '[data-testid="input-todo"]'
    const todoItem = '[data-testid="item-todo"]'

    await wrapper.get(txtInput).setValue('lunch')
    await wrapper.get(btnAdd).trigger('submit')
    const items = wrapper.findAll(todoItem)

    expect(items.length).toBeGreaterThan(0)
  })
})
