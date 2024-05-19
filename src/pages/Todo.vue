<script lang="ts" setup>
import ProgressCounter from '@/components/Todo/ProgressCounter.vue'
import TodoInput from '@/components/Todo/TodoInput.vue'
import TodoList from '@/components/Todo/TodoList.vue'
import { VCard } from '@/components/VCard'
import { VColumn, VColumns } from '@/components/VColumns'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'TodoPage'
})

const { t } = useI18n()
</script>

<template>
  <section class="section">
    <div class="container is-max-desktop">
      <h1 class="title">{{ t('title.todo-app') }}</h1>
      <VColumns>
        <VColumn grid-size="5">
          <TodoInput />
          <ProgressCounter />
        </VColumn>
        <VColumn>
          <VCard :title="t('common.todo')">
            <template #content>
              <TodoList />
            </template>
          </VCard>
        </VColumn>
      </VColumns>
    </div>
  </section>
</template>
