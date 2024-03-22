import { Todo } from '@/models/Todo'
import { computed, reactive, ref, unref } from 'vue'

export function useTodo() {
  const inputTodo = ref('')
  const todoList = reactive<Todo[]>([])
  const inputSearch = ref('')

  function addTodo() {
    const todo = new Todo()
    todo.label = inputTodo.value
    todoList.push(todo)
    inputTodo.value = ''
  }

  const filtered = computed(() => {
    return todoList.filter((todo) => {
      if (unref(inputSearch)) {
        return todo.label.toUpperCase().includes(unref(inputSearch).toUpperCase())
      }

      return todo
    })
  })

  return {
    addTodo,
    filtered,
    inputSearch,
    inputTodo,
    todoList
  }
}
