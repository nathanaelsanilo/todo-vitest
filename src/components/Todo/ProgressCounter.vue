<script lang="ts" setup>
import { VProgress } from '@/components/VProgress'
import { useTodoProgressQuery } from '@/composables/useTodoProgressQuery'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { data, isLoading } = useTodoProgressQuery()
</script>

<template>
  <div class="box mt-2">
    <div class="level">
      <div class="level-left">
        <label for="progress-todo">{{ t('common.progress') }}</label>
      </div>
      <div class="level-right" :class="{ 'is-skeleton': isLoading }">
        <label for="" data-testid="progress-todo-label">
          {{ `${data?.completed}/${data?.total}` }}
        </label>
      </div>
    </div>
    <VProgress
      id="progress-todo"
      :loading="isLoading"
      :value="data?.progress"
      data-testid="progress-todo"
    />
  </div>
</template>
