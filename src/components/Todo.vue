<script lang="ts" setup>
import { VCard } from '@/components/VCard'
import { VColumn, VColumns } from '@/components/VColumns'
import { useI18n } from 'vue-i18n'
import ProgressCounter from './ProgressCounter.vue'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'

defineOptions({
  name: 'TodoVue'
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
