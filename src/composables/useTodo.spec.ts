import { Todo } from '@/models/Todo'
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

  it('it should add new todo', () => {
    const { inputTodo, todoList, addTodo } = useTodo()

    const todo = new Todo()
    todo.label = 'lunch'

    addTodo()

    expect(todoList[0]).toEqual(todo)
    expect(inputTodo.value).toBeFalsy()
  })

  it('it should able to search todo', () => {
    const { inputSearch, filtered, addTodo } = useTodo()

    addTodo()

    addTodo()

    set(inputSearch, 'din')

    expect(toValue(filtered)[0].label).toEqual('dinner')
  })

  it('it should able to remove todo', () => {
    const { filtered, addTodo, deleteTodo } = useTodo()

    addTodo()

    deleteTodo('lunch')

    expect(toValue(filtered).length).toBe(0)
  })

  it('it should able to complete todo', () => {
    const { filtered, addTodo, complete } = useTodo()

    addTodo()

    complete(filtered.value[0])

    expect(filtered.value[0].isComplete).toBe(true)
  })

  it('it should count completed todo', { skip: false }, () => {
    const { todoList, addTodo, complete, countCompleted } = useTodo()

    addTodo()
    expect(todoList.length).toBe(1)

    complete(todoList[0])

    expect(toValue(countCompleted)).toBe(1)
  })

  it('it should increment todo order', () => {
    const { todoList, increment, addTodo } = useTodo()

    addTodo()

    addTodo()

    increment(1)

    expect(todoList[0].label).toBe('dinner')
  })

  it('it should decrement todo order', () => {
    const { todoList, decrement, addTodo } = useTodo()

    addTodo()

    addTodo()

    decrement(0)

    expect(todoList[0].label).toBe('dinner')
  })

  it('it should count progress', () => {
    const { todoList, addTodo, progress, complete } = useTodo()

    addTodo()

    addTodo()

    complete(todoList[0])

    expect(toValue(progress)).toBe(50)

    complete(todoList[1])

    expect(toValue(progress)).toBe(100)
  })
})
