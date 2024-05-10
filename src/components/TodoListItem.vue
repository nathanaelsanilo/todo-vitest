<script lang="ts" setup>
import { useTodoCompleteMutation } from '@/composables/useTodoCompleteMutation'
import { useTodoDeleteMutation } from '@/composables/useTodoDeleteMutation'
import { useTodoReorderMutation } from '@/composables/useTodoReorderMutation'
import type { TodoListDto } from '@/dtos/TodoListDto'
import { TodoReorderDto } from '@/dtos/TodoReorderDto'
import { NotificationDataViewBuilder } from '@/models/NotificationDataView'
import { todoKeys } from '@/models/QueryKey'
import { useNotificationStore } from '@/stores/notification'
import { formatDate } from '@/utils/Date'
import { useQueryClient } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'
import { VButton } from './VButton'
import { VColumn, VColumns } from './VColumns'
import { VIcon } from './VIcon'

defineProps<{
  todo: TodoListDto
}>()

const { t } = useI18n()
const queryClient = useQueryClient()
const notificationStore = useNotificationStore()
const { mutateAsync: mutateDelete } = useTodoDeleteMutation()
const { mutate: mutateComplete } = useTodoCompleteMutation({
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: todoKeys.all })
  }
})
const { mutateAsync: mutateReorder } = useTodoReorderMutation()

const handleDelete = async (todo: TodoListDto) => {
  await mutateDelete(todo.id)
  const dataView = NotificationDataViewBuilder.builder()
    .content(`${todo.description} is removed successfully`)
    .title('Success')
    .type('success')
    .build()
  notificationStore.render(dataView)
}

const handleComplete = (todo: TodoListDto) => {
  mutateComplete(todo.id)
}

const increment = async (orderKey: number) => {
  const dto = new TodoReorderDto()
  dto.order = 'inc'
  dto.order_key = orderKey

  await mutateReorder(dto)
  queryClient.invalidateQueries({ queryKey: todoKeys.all })
}

const decrement = async (orderKey: number) => {
  const dto = new TodoReorderDto()
  dto.order = 'dec'
  dto.order_key = orderKey

  await mutateReorder(dto)
  queryClient.invalidateQueries({ queryKey: todoKeys.all })
}
</script>

<template>
  <VColumns align-items="center">
    <VColumn grid-size="1">
      <div class="is-flex is-flex-direction-column">
        <VButton colors="white" size="sm" data-testid="arrow-up" @click="increment(todo.order_key)">
          <VIcon>
            <i class="bi bi-arrow-up"></i>
          </VIcon>
        </VButton>
        <VButton
          class="mt-2"
          colors="white"
          size="sm"
          data-testid="arrow-down"
          @click="decrement(todo.order_key)"
        >
          <VIcon>
            <i class="bi bi-arrow-down"></i>
          </VIcon>
        </VButton>
      </div>
    </VColumn>
    <VColumn>
      <h3 data-testid="item-todo" class="title is-5" :class="{ 'is-complete': todo.is_complete }">
        {{ todo.description }}
      </h3>
      <h5 class="subtitle is-7" data-testid="timestamp-todo">
        {{
          t('common.published-date-text', {
            text: formatDate(dayjs(todo.timestamp))
          })
        }}
      </h5>
    </VColumn>
    <VColumn grid-size="2">
      <div class="is-flex is-justify-content-right is-align-items-center">
        <VButton
          class="mr-2"
          colors="success"
          size="sm"
          data-testid="btn-complete"
          @click="handleComplete(todo)"
        >
          <VIcon>
            <i class="bi bi-clipboard-check"></i>
          </VIcon>
        </VButton>
        <VButton size="sm" colors="danger" data-testid="btn-delete" @click="handleDelete(todo)">
          <VIcon>
            <i class="bi bi-trash"></i>
          </VIcon>
        </VButton>
      </div>
    </VColumn>
  </VColumns>
</template>

<style lang="scss" scoped>
.is-complete {
  text-decoration: line-through;
}

.handle-grip {
  cursor: move;
}
</style>
