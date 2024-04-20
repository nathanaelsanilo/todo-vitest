import { setup } from '@/test/setup'
import { set } from '@vueuse/core'
import { container } from 'tsyringe'
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { toValue } from 'vue'
import { useTodo } from './useTodo'

describe('useTodo', () => {
  beforeEach(() => {
    const { init } = setup()

    init()
  })

  afterEach(() => {
    vi.clearAllMocks()
    container.reset()
  })

  afterAll(() => {
    container.clearInstances()
  })

  it('it should add new todo', async () => {
    const { mockAllTodo } = setup()
    const { inputTodo, todoList, addTodo } = useTodo()

    await addTodo()

    expect(todoList).toEqual(mockAllTodo())
    expect(inputTodo.value).toBeFalsy()
  })

  it('should return todo list', async () => {
    const { mockAllTodo } = setup()
    const { getAll, todoList } = useTodo()

    await getAll()

    expect(todoList).toEqual(mockAllTodo())
  })

  it('should able to search todo', async () => {
    const { inputSearch, filtered, getAll } = useTodo()

    await getAll()

    expect(toValue(filtered).length).toBe(2)
    set(inputSearch, 'din')
    expect(toValue(filtered)[0].description).toEqual('dinner')
  })

  it('it should able to remove todo', async () => {
    const { filtered, deleteTodo, getAll } = useTodo()

    await getAll()
    deleteTodo('dinner')

    expect(toValue(filtered).length).toBe(1)
  })

  it('it should able to complete todo', async () => {
    const { filtered, getAll, complete } = useTodo()

    await getAll()

    complete(filtered.value[0])

    expect(filtered.value[0].is_complete).toBe(true)
  })

  it('it should count completed todo', { skip: false }, async () => {
    const { todoList, getAll, complete, countCompleted } = useTodo()

    await getAll()
    expect(todoList.length).toBe(2)

    complete(todoList[0])

    expect(toValue(countCompleted)).toBe(2)
  })

  it('it should increment todo order', async () => {
    const { todoList, increment, getAll } = useTodo()

    await getAll()
    increment(1)

    expect(todoList[0].description).toBe('dinner')
  })

  it('it should decrement todo order', async () => {
    const { todoList, decrement, getAll } = useTodo()

    await getAll()

    decrement(0)

    expect(todoList[0].description).toBe('dinner')
  })

  it('it should count progress', async () => {
    const { todoList, getAll, progress, complete } = useTodo()

    await getAll()

    complete(todoList[0])

    expect(toValue(progress)).toBe(100)
  })
})
