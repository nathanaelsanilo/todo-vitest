import { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoListDto } from '@/dtos/TodoListDto'
import { NotificationDataViewBuilder } from '@/models/NotificationDataView'
import { TodoService } from '@/services/TodoService'
import { useNotificationStore } from '@/stores/notification'
import { formatTimestamp } from '@/utils/Date'
import { resolver } from '@/utils/Resolver'
import dayjs from 'dayjs'
import { computed, reactive, ref, unref } from 'vue'

export function useTodo() {
  const todoService = resolver(TodoService)
  const inputTodo = ref('')
  const todoList = reactive<TodoListDto[]>([])
  const inputSearch = ref('')
  const notificationStore = useNotificationStore()

  async function addTodo() {
    const dto = new TodoCreateDto()
    dto.setIsComplete(false)
    dto.setTimestamp(formatTimestamp(dayjs()))
    dto.setDescription(inputTodo.value)

    try {
      await todoService.addTodo(dto)

      await getAll()

      inputTodo.value = ''

      const dataView = NotificationDataViewBuilder.builder()
        .content(`${dto.description} is added successfully`)
        .title('Success')
        .type('success')
        .build()
      notificationStore.render(dataView)
    } catch (error) {
      console.error(error)
    }
  }

  async function getAll(): Promise<void> {
    const data = await todoService.findAll()
    todoList.length = 0
    todoList.push(...data)
  }

  function complete(todo: TodoListDto) {
    todo.is_complete = !todo.is_complete
  }

  function deleteTodo(todo: string) {
    const filtered = [...todoList].filter((e) => e.description !== todo)
    todoList.length = 0
    todoList.push(...filtered)
  }

  const filtered = computed(() => {
    return todoList.filter((todo) => {
      if (unref(inputSearch)) {
        return todo.description.toUpperCase().includes(unref(inputSearch).toUpperCase())
      }

      return todo
    })
  })

  const countCompleted = computed<number>(() => {
    return todoList.filter((todo) => todo.is_complete).length
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

  const progress = computed(() => {
    const total = todoList.length
    if (total === 0) return 0
    const completeTask = todoList.filter((record) => record.is_complete).length
    return Math.ceil((completeTask / total) * 100)
  })

  getAll()

  return {
    decrement,
    deleteTodo,
    addTodo,
    complete,
    increment,
    getAll,
    filtered,
    inputSearch,
    inputTodo,
    todoList,
    progress,
    countCompleted
  }
}
