import { Todo } from '@/models/Todo'
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
})
