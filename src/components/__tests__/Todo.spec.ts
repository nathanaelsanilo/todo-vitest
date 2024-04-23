import Todo from '@/components/Todo.vue'
import { TodoRepositoryToken } from '@/models/Injection'
import type { TodoRepository } from '@/repository/TodoRepository'
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
    container.register(TodoRepositoryToken, {
      useValue: {
        create: vi.fn(),
        findAll: vi.fn().mockResolvedValue([
          {
            id: 1,
            description: 'lunch',
            timestamp: '2024-04-01 13:00:00',
            is_complete: false
          }
        ]),
        delete: vi.fn()
      }
    })

    wrapper = mount(Todo)
  })

  afterEach(() => {
    vi.clearAllMocks()
    container.reset()
    wrapper.unmount()
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
    vi.spyOn(repo, 'findAll').mockResolvedValueOnce([
      {
        description: 'lunch',
        is_complete: false,
        id: 1,
        timestamp: ''
      }
    ])

    await wrapper.get(txtInput).setValue(todo)
    await wrapper.get(btnAdd).trigger('submit.prevent')

    expect(repo.create).toHaveBeenCalledTimes(1)
    expect(repo.findAll).toHaveBeenCalledTimes(1)

    await flushPromises()

    const item = wrapper.findAll(todoItem)

    expect(item).toHaveLength(1)
    expect(item[0].text()).toBe('lunch')
    expect(item[0].classes('is-complete')).toBe(false)
    expect(wrapper.find<HTMLInputElement>(txtInput).element.value).toBe('')
  })

  it('it should delete todo', async () => {
    const repo = container.resolve<TodoRepository>(TodoRepositoryToken)
    vi.spyOn(repo, 'findAll').mockResolvedValueOnce([])

    expect(wrapper.findAll(todoItem)).toHaveLength(1)

    await wrapper.get(btnDelete).trigger('click')

    await flushPromises()

    expect(wrapper.findAll(todoItem)).toHaveLength(0)
  })

  it('it should complete todo', async () => {
    const btn = '[data-testid="btn-complete"]'

    await flushPromises()

    expect(wrapper.findAll(todoItem)).toHaveLength(1)

    await wrapper.get(btn).trigger('click')

    expect(wrapper.get(todoItem).classes('is-complete')).toBe(true)
  })

  it('it allow user to search', async () => {
    const repo = container.resolve<TodoRepository>(TodoRepositoryToken)
    vi.spyOn(repo, 'findAll').mockResolvedValueOnce([
      {
        description: 'lunch',
        is_complete: false,
        id: 2,
        timestamp: ''
      },
      {
        description: 'dinner',
        is_complete: false,
        id: 1,
        timestamp: ''
      }
    ])

    wrapper.unmount()
    wrapper = mount(Todo)

    await flushPromises()

    expect(wrapper.findAll(todoItem)).toHaveLength(2)

    const searchValue = 'd'

    await wrapper.get(inputSearch).setValue(searchValue)

    const filtered = wrapper.findAll(todoItem).map((wr) => wr.text())
    expect(filtered).toEqual(['dinner'])
  })

  it('it should display timestamp', async () => {
    const timestamp = '[data-testid="timestamp-todo"]'
    expect(wrapper.get(timestamp).text()).toBe('common.published-date-text')
  })

  it('it allow user to reorder item', async () => {
    const repo = container.resolve<TodoRepository>(TodoRepositoryToken)
    vi.spyOn(repo, 'findAll').mockResolvedValueOnce([
      {
        description: 'breakfast',
        is_complete: false,
        id: 2,
        timestamp: ''
      },
      {
        description: 'workout',
        is_complete: false,
        id: 1,
        timestamp: ''
      }
    ])

    const arrowUp = '[data-testid="arrow-up"]'
    const arrowDown = '[data-testid="arrow-down"]'
    const workoutIdx = 1

    wrapper.unmount()
    wrapper = mount(Todo)

    await flushPromises()

    expect(wrapper.findAll(todoItem)).toHaveLength(2)

    const dinner = wrapper.findAll(todoItem)[workoutIdx]

    expect(dinner.text()).toBe('workout')

    // start up item
    await wrapper.findAll(arrowUp)[workoutIdx].trigger('click')

    expect(wrapper.findAll(todoItem)[0].text()).toBe('workout')
    expect(wrapper.findAll(todoItem)[1].text()).toBe('breakfast')
    // end

    // start down item
    await wrapper.findAll(arrowDown)[0].trigger('click')

    expect(wrapper.findAll(todoItem)[0].text()).toBe('breakfast')
    expect(wrapper.findAll(todoItem)[1].text()).toBe('workout')
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
