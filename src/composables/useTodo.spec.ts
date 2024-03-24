import { Todo } from '@/models/Todo'
import { get, set } from '@vueuse/core'
import { describe, expect, it } from 'vitest'
import { toValue } from 'vue'
import { useTodo } from './useTodo'

describe('useTodo', () => {
  it('it should add new todo', () => {
    const { inputTodo, todoList, addTodo } = useTodo()

    inputTodo.value = 'lunch'

    const todo = new Todo()
    todo.label = 'lunch'

    addTodo()

    expect(todoList[0]).toEqual(todo)
    expect(inputTodo.value).toBeFalsy()
  })

  it('it should able to search todo', () => {
    const { inputSearch, inputTodo, filtered, addTodo } = useTodo()

    inputTodo.value = 'lunch'
    addTodo()

    inputTodo.value = 'dinner'
    addTodo()

    set(inputSearch, 'din')

    expect(get(filtered)[0].label).toEqual('dinner')
  })

  it('it should able to remove todo', () => {
    const { inputTodo, filtered, addTodo, deleteTodo } = useTodo()

    inputTodo.value = 'lunch'
    addTodo()

    deleteTodo('lunch')

    expect(toValue(filtered).length).toBe(0)
  })

  it('it should able to complete todo', () => {
    const { inputTodo, filtered, addTodo, complete } = useTodo()

    inputTodo.value = 'lunch'
    addTodo()

    complete(filtered.value[0])

    expect(filtered.value[0].isComplete).toBe(true)
  })
})
