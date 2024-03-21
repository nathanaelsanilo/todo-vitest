import { Todo } from '@/models/Todo'
import { reactive, ref } from 'vue'

export function useTodo() {
  const inputTodo = ref('')
  const todoList = reactive<Todo[]>([])

  function addTodo() {
    const todo = new Todo()
    todo.label = inputTodo.value
    todoList.push(todo)
    inputTodo.value = ''
  }

  return { inputTodo, todoList, addTodo }
}
