import { TodoRepositoryToken } from '@/models/Injection'
import { set } from '@vueuse/core'
import { container } from 'tsyringe'
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { toValue } from 'vue'
import { useTodo } from './useTodo'

describe('useTodo', () => {
  const spyFindAll = vi.fn()
  const spyDelete = vi.fn().mockResolvedValueOnce(true)

  beforeEach(() => {
    container.register(TodoRepositoryToken, {
      useValue: {
        create: vi.fn(),
        findAll: spyFindAll,
        delete: spyDelete
      }
    })
    vi.resetAllMocks()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.resetModules()
    container.reset()
  })

  afterAll(() => {
    container.clearInstances()
  })

  it('it should add new todo', async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'dinner',
        is_complete: true,
        id: 2,
        timestamp: ''
      }
    ])
    const { inputTodo, todoList, addTodo } = useTodo()

    await addTodo()

    expect(spyFindAll).toHaveBeenCalled()
    expect(todoList).toHaveLength(1)
    expect(todoList).toEqual([
      {
        description: 'dinner',
        is_complete: true,
        id: 2,
        timestamp: ''
      }
    ])
    expect(inputTodo.value).toBeFalsy()
  })

  it('should return todo list', async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'dinner',
        is_complete: true,
        id: 2,
        timestamp: ''
      }
    ])

    const { todoList, getAll } = useTodo()

    await getAll()

    expect(spyFindAll).toHaveBeenCalledTimes(1)
    expect(todoList).toHaveLength(1)
    expect(todoList).toEqual([
      {
        description: 'dinner',
        is_complete: true,
        id: 2,
        timestamp: ''
      }
    ])
  })

  it('should able to search todo', async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'dinner',
        is_complete: true,
        id: 2,
        timestamp: ''
      }
    ])

    const { inputSearch, filtered, getAll } = useTodo()

    await getAll()

    expect(spyFindAll).toHaveBeenCalledTimes(1)
    expect(toValue(filtered).length).toBe(1)

    set(inputSearch, 'din')

    expect(toValue(filtered)[0]).toEqual({
      description: 'dinner',
      is_complete: true,
      id: 2,
      timestamp: ''
    })
  })

  it('it should able to remove todo', async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'dinner',
        is_complete: true,
        id: 2,
        timestamp: ''
      }
    ])

    const { todoList, deleteTodo, getAll } = useTodo()

    await getAll()

    expect(spyFindAll).toHaveBeenCalledTimes(1)
    expect(todoList).toHaveLength(1)

    spyFindAll.mockResolvedValueOnce([])
    await deleteTodo({
      description: 'dinner',
      is_complete: true,
      id: 2,
      timestamp: ''
    })

    expect(spyDelete).toHaveBeenCalledTimes(1)
    expect(spyDelete).toHaveBeenCalledWith(2)

    expect(spyFindAll).toHaveBeenCalledTimes(2)

    expect(todoList).toHaveLength(0)
  })

  it('it should able to complete todo', async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'dinner',
        is_complete: false,
        id: 2,
        timestamp: ''
      }
    ])
    const { todoList, getAll, complete } = useTodo()

    await getAll()
    expect(spyFindAll).toHaveBeenCalledTimes(1)

    complete(todoList[0])

    expect(todoList[0].is_complete).toBe(true)
  })

  it('it should count completed todo', { skip: false }, async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'lunch',
        is_complete: false,
        id: 1,
        timestamp: ''
      },
      {
        description: 'dinner',
        is_complete: false,
        id: 2,
        timestamp: ''
      },
      {
        description: 'dinner',
        is_complete: false,
        id: 3,
        timestamp: ''
      }
    ])

    const { todoList, getAll, complete, countCompleted } = useTodo()

    await getAll()
    expect(spyFindAll).toHaveBeenCalledTimes(1)
    expect(todoList.length).toBe(3)

    complete(todoList[0])

    expect(toValue(countCompleted)).toBe(1)
  })

  it('it should increment todo order', async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'lunch',
        is_complete: false,
        id: 1,
        timestamp: ''
      },
      {
        description: 'dinner',
        is_complete: false,
        id: 2,
        timestamp: ''
      }
    ])
    const { todoList, increment, getAll } = useTodo()

    await getAll()
    expect(spyFindAll).toHaveBeenCalledTimes(1)
    expect(todoList).toHaveLength(2)

    increment(1)

    expect(todoList[0]).toEqual({
      description: 'dinner',
      is_complete: false,
      id: 2,
      timestamp: ''
    })
  })

  it('it should decrement todo order', async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'lunch',
        is_complete: false,
        id: 1,
        timestamp: ''
      },
      {
        description: 'dinner',
        is_complete: false,
        id: 2,
        timestamp: ''
      }
    ])

    const { todoList, decrement, getAll } = useTodo()

    await getAll()
    expect(spyFindAll).toHaveBeenCalledTimes(1)
    expect(todoList).toHaveLength(2)

    decrement(0)

    expect(todoList[0]).toEqual({
      description: 'dinner',
      is_complete: false,
      id: 2,
      timestamp: ''
    })
  })

  it('it should count progress', async () => {
    spyFindAll.mockResolvedValueOnce([
      {
        description: 'lunch',
        is_complete: false,
        id: 1,
        timestamp: ''
      },
      {
        description: 'dinner',
        is_complete: false,
        id: 2,
        timestamp: ''
      }
    ])

    const { todoList, getAll, progress, complete } = useTodo()

    await getAll()
    expect(spyFindAll).toHaveBeenCalledTimes(1)
    expect(todoList).toHaveLength(2)

    complete(todoList[0])

    expect(toValue(progress)).toBe(50)

    complete(todoList[1])

    expect(toValue(progress)).toBe(100)
  })
})
