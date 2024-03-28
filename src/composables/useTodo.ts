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

  function increment(current: number) {
    if (current === 0) return
    const before = todoList[current - 1]
    const after = todoList[current]
    todoList[current] = before
    todoList[current - 1] = after
  }

  function decrement(current: number) {
    if (current === todoList.length) return

    const before = todoList[current + 1]
    const after = todoList[current]
    todoList[current] = before
    todoList[current + 1] = after
  }

  return {
    decrement,
    deleteTodo,
    addTodo,
    complete,
    increment,
    filtered,
    inputSearch,
    inputTodo,
    todoList,
    countCompleted
  }
}
