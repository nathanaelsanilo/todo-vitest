<script lang="ts" setup>
import { VProgress } from '@/components/VProgress'
import type { TodoListDto } from '@/dtos/TodoListDto'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    completed: number
    todos: TodoListDto[]
    progress: number
  }>(),
  {
    todos: (): TodoListDto[] => []
  }
)

const { t } = useI18n()
const todoTotal = computed(() => props.todos.length)
</script>

<template>
  <div class="box mt-2">
    <div class="level">
      <div class="level-left">
        <label for="progress-todo">{{ t('common.progress') }}</label>
      </div>
      <div class="level-right">
        <label for="" data-testid="progress-todo-label">
          {{ `${props.completed}/${todoTotal}` }}
        </label>
      </div>
    </div>
    <VProgress id="progress-todo" :value="progress" data-testid="progress-todo" />
  </div>
</template>
