import { Todo } from '@/models/Todo'
import { get, set } from '@vueuse/core'
import { describe, expect, it } from 'vitest'
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
})
