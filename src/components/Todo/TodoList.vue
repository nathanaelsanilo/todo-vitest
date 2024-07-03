<script lang="ts" setup>
import TodoListItem from '@/components/todo/TodoListItem.vue'
import { VTextField } from '@/components/ui/VTextField'
import { useTodoListQuery } from '@/composables/todo/useTodoListQuery'
import { AppConstant } from '@/models/Constant'
import { TodoQueryParams } from '@/models/todo/TodoQueryParams'
import { useDebounceFn } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const params = reactive(new TodoQueryParams())
const { data, isLoading } = useTodoListQuery(params)
const sortable = ref<HTMLElement | null>(null)

useSortable(sortable, data.value ? data.value : [], {
  animation: 200,
  handle: '.handle-grip'
})

const onSearch = useDebounceFn((value) => {
  params.setName(value ?? undefined)
}, AppConstant.debounce)
</script>

<template>
  <div>
    <VTextField
      id="input-search"
      :model-value="params.name"
      name="input-search"
      :label="t('common.search')"
      type="search"
      data-testid="input-search"
      @update:model-value="onSearch"
    />
  </div>
  <p class="subtitle is-6 has-text-centered mt-2">
    {{ `${t('common.looking-for')} "${params.name}"` }}
  </p>
  <ul ref="sortable" class="mt-5">
    <li v-if="isLoading" class="block is-skeleton">
      <span aria-hidden="true">{{ t('common.loading') }}</span>
    </li>
    <li v-for="todo in data" v-else :key="todo.id" class="block handle-grip">
      <TodoListItem :todo="todo" />
    </li>
  </ul>
</template>
