import { TodoCreateDto } from '@/dtos/TodoCreateDto'
import type { TodoListDto } from '@/dtos/TodoListDto'
import { NotificationDataViewBuilder } from '@/models/NotificationDataView'
import { TodoService } from '@/services/TodoService'
import { useNotificationStore } from '@/stores/notification'
import { formatTimestamp } from '@/utils/Date'
import { resolver } from '@/utils/Resolver'
import { useQueryClient } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import { computed, reactive, ref } from 'vue'
import { useTodoListQuery } from './useTodoListQuery'

export function useTodo() {
  const todoService = resolver(TodoService)
  const inputTodo = ref('')
  const todoList = reactive<TodoListDto[]>([])
  const inputSearch = ref('')
  const notificationStore = useNotificationStore()
  const queryClient = useQueryClient()

  const todoQuery = useTodoListQuery()

  async function addTodo() {
    const dto = new TodoCreateDto()
    dto.setIsComplete(false)
    dto.setTimestamp(formatTimestamp(dayjs()))
    dto.setDescription(inputTodo.value)

    try {
      await todoService.addTodo(dto)

      queryClient.invalidateQueries({ queryKey: ['todo'] })

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

  function complete(todo: TodoListDto) {
    todo.is_complete = !todo.is_complete
  }

  async function deleteTodo(todo: TodoListDto) {
    await todoService.delete(todo.id)

    const dataView = NotificationDataViewBuilder.builder()
      .content(`${todo.description} is removed successfully`)
      .title('Success')
      .type('success')
      .build()
    notificationStore.render(dataView)

    queryClient.invalidateQueries({ queryKey: ['todo'] })
  }

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

  return {
    decrement,
    deleteTodo,
    addTodo,
    complete,
    increment,
    todoQuery,
    inputSearch,
    inputTodo,
    todoList,
    progress,
    countCompleted
  }
}
