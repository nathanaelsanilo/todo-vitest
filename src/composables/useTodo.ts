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

  function complete(todo: Todo) {
    todo.isComplete = !todo.isComplete
  }

  function deleteTodo(todo: string) {
    const filtered = [...todoList].filter((e) => e.label !== todo)
    todoList.length = 0
    todoList.push(...filtered)
  }

  const filtered = computed(() => {
    return todoList.filter((todo) => {
      if (unref(inputSearch)) {
        return todo.label.toUpperCase().includes(unref(inputSearch).toUpperCase())
      }

      return todo
    })
  })

  const countCompleted = computed<number>(() => {
    return todoList.filter((todo) => todo.isComplete).length
  })

  return {
    deleteTodo,
    addTodo,
    complete,
    filtered,
    inputSearch,
    inputTodo,
    todoList,
    countCompleted
  }
}
