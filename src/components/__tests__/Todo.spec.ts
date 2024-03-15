import Todo from '@/components/Todo.vue'
import { i18n } from '@/modules/i18n'
import { VueWrapper, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Todo Component', () => {
  let wrapper: VueWrapper
  const txtInput = '[data-testid="input-todo"]'
  const btnAdd = '[data-testid="btn-add"]'
  const todoItem = '[data-testid="item-todo"]'
  const btnDelete = '[data-testid="btn-delete"]'
  const inputSearch = '[data-testid="input-search"]'
  const todo = 'lunch'

  const addItem = async (args = todo) => {
    await wrapper.get(txtInput).setValue(args)
    await wrapper.get(btnAdd).trigger('submit.prevent')
  }

  beforeEach(() => {
    wrapper = mount(Todo, {
      global: {
        plugins: [i18n],
        mocks: {
          t: (key: string) => key
        }
      }
    })

    return () => wrapper.unmount()
  })

  it('it should render component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('it should have input', () => {
    expect(wrapper.get(txtInput)).toBeTruthy()
  })

  it('it shouuld have add button', () => {
    expect(wrapper.get(btnAdd).text()).toBe('common.save')
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

    await addItem()
    await wrapper.get(checkbox).setValue()

    expect(wrapper.get(todoItem).classes('is-complete')).toBe(true)
  })

  it('it allow user to search', async () => {
    const searchValue = 'dinner'

    await addItem('lunch')
    await addItem('dinner')

    await wrapper.get(inputSearch).setValue(searchValue)

    const filtered = wrapper.findAll(todoItem).map((wr) => wr.text())
    expect(filtered).include(searchValue)
  })

  it('it allow user to search include character', async () => {
    const searchValue = 'din'

    await addItem('lunch')
    await addItem('dinner')

    await wrapper.get(inputSearch).setValue(searchValue)
    const filtered = wrapper.findAll(todoItem).map((wr) => wr.text())
    const includeSearch = filtered.some((e) => e.includes(searchValue))
    expect(includeSearch, 'expect contain character in data').toBe(true)
  })
})
