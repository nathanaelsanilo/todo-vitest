import Todo from '@/components/Todo.vue'
import { TodoRepositoryToken } from '@/models/Injection'
import type { TodoRepository } from '@/repository/TodoRepository'
import { setup } from '@/test/setup'
import { VueWrapper, flushPromises, mount } from '@vue/test-utils'
import { container } from 'tsyringe'
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

describe('Todo Component', () => {
  let wrapper: VueWrapper<InstanceType<typeof Todo>>
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
    const { init } = setup()

    init()

    wrapper = mount(Todo)

    return () => wrapper.unmount()
  })

  afterEach(() => {
    vi.clearAllMocks()
    container.reset()
  })

  afterAll(() => {
    container.clearInstances()
  })

  it('it should render component', () => {
    expect(wrapper).toBeDefined()
  })

  it('it should have input', () => {
    expect(wrapper.get(txtInput)).toBeTruthy()
  })

  it('it shouuld have add button', () => {
    expect(wrapper.get(btnAdd).text()).toBe('common.save')
  })

  it('it should add new todo', async () => {
    const repo = container.resolve<TodoRepository>(TodoRepositoryToken)
    vi.spyOn(repo, 'create')
    vi.spyOn(repo, 'findAll')

    await wrapper.get(txtInput).setValue(todo)
    await wrapper.get(btnAdd).trigger('submit.prevent')

    expect(repo.create).toHaveBeenCalledOnce()

    await flushPromises()

    expect(repo.findAll).toHaveBeenCalledOnce()

    const item = wrapper.findAll(todoItem)
    expect(item.length).toBe(2)
    expect(wrapper.find<HTMLInputElement>(txtInput).element.value).toBe('')
  })

  it('it should delete todo', async () => {
    await wrapper.get(txtInput).setValue(todo)
    await wrapper.get(btnAdd).trigger('submit.prevent')

    await flushPromises()

    await wrapper.get(btnDelete).trigger('click')

    expect(wrapper.findAll(todoItem)).toHaveLength(1)
  })

  it('it should complete todo', async () => {
    const btn = '[data-testid="btn-complete"]'

    await addItem()

    await flushPromises()

    await wrapper.get(btn).trigger('click')

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

  it('it should display timestamp', async () => {
    const timestamp = '[data-testid="timestamp-todo"]'

    await addItem('dinner')

    await flushPromises()

    expect(wrapper.get(timestamp).text()).toBe('common.published-date-text')
  })

  it('it allow user to reorder item', async () => {
    const arrowUp = '[data-testid="arrow-up"]'
    const arrowDown = '[data-testid="arrow-down"]'
    const DINNER_IDX = 1

    await addItem('lunch')
    await addItem('dinner')

    await flushPromises()

    const dinner = wrapper.findAll(todoItem)[DINNER_IDX]

    expect(dinner.text()).toBe('dinner')

    // start up item
    await wrapper.findAll(arrowUp)[DINNER_IDX].trigger('click')

    expect(wrapper.findAll(todoItem)[0].text()).toBe('dinner')
    expect(wrapper.findAll(todoItem)[1].text()).toBe('lunch')
    // end

    // start down item
    await wrapper.findAll(arrowDown)[0].trigger('click')

    expect(wrapper.findAll(todoItem)[0].text()).toBe('lunch')
    expect(wrapper.findAll(todoItem)[1].text()).toBe('dinner')
    // end
  })

  it(
    'it allow drag item',
    {
      todo: true
    },
    async () => {
      const dragable = '[data-testid="drag-todo"]'

      await addItem('lunch')
      await addItem('dinner')

      await wrapper.get(dragable).trigger('dragstart')
      await wrapper.get(dragable).trigger('drag')
      await wrapper.get(dragable).trigger('dragenter')
      await wrapper.get(dragable).trigger('drop')
    }
  )
})
