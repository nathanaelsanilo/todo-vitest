<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VCard } from '@/components/VCard'
import { VColumn, VColumns } from '@/components/VColumns'
import { VIcon } from '@/components/VIcon'
import { VTextField } from '@/components/VTextField'
import { useTodo } from '@/composables/useTodo'
import { formatDate } from '@/utils/Date'
import { useSortable } from '@vueuse/integrations/useSortable'
import dayjs from 'dayjs'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import ProgressCounter from './ProgressCounter.vue'

defineOptions({
  name: 'TodoVue'
})

const { t } = useI18n()
const sortable = ref<HTMLElement | null>(null)

const {
  inputTodo,
  todoList,
  filtered,
  countCompleted,
  progress,
  inputSearch,
  addTodo,
  deleteTodo,
  complete,
  increment,
  decrement
} = useTodo()

useSortable(sortable, todoList, {
  animation: 200,
  handle: '.handle-grip'
})
</script>

<template>
  <section class="section">
    <div class="container is-max-desktop">
      <h1 class="title">{{ t('title.todo-app') }}</h1>
      <VColumns>
        <VColumn grid-size="5">
          <VCard :title="t('common.input-text', { text: t('common.todo') })">
            <template #content>
              <form novalidate @submit.prevent="addTodo">
                <VTextField
                  id="inputTodo"
                  v-model="inputTodo"
                  name="inputTodo"
                  :label="t('common.new-text', { text: t('common.todo') })"
                  data-testid="input-todo"
                />
                <div class="field">
                  <div class="control">
                    <VButton type="submit" colors="primary" data-testid="btn-add">
                      {{ t('common.save') }}
                    </VButton>
                  </div>
                </div>
              </form>
            </template>
          </VCard>

          <ProgressCounter :completed="countCompleted" :todos="todoList" :progress="progress" />
        </VColumn>
        <VColumn>
          <VCard :title="t('common.todo')">
            <template #content>
              <div>
                <VTextField
                  id="input-search"
                  v-model="inputSearch"
                  name="input-search"
                  :label="t('common.search')"
                  type="search"
                  data-testid="input-search"
                />
              </div>
              <p class="subtitle is-6 has-text-centered mt-2">
                {{ `${t('common.looking-for')} "${inputSearch}"` }}
              </p>
              <ul ref="sortable" class="mt-5">
                <li
                  v-for="(todo, idx) in filtered"
                  :key="todo.description"
                  class="block handle-grip"
                >
                  <VColumns align-items="center">
                    <VColumn grid-size="1">
                      <div class="is-flex is-flex-direction-column">
                        <VButton
                          colors="white"
                          size="sm"
                          data-testid="arrow-up"
                          @click="increment(idx)"
                        >
                          <VIcon>
                            <i class="bi bi-arrow-up"></i>
                          </VIcon>
                        </VButton>
                        <VButton
                          class="mt-2"
                          colors="white"
                          size="sm"
                          data-testid="arrow-down"
                          @click="decrement(idx)"
                        >
                          <VIcon>
                            <i class="bi bi-arrow-down"></i>
                          </VIcon>
                        </VButton>
                      </div>
                    </VColumn>
                    <VColumn>
                      <h3
                        data-testid="item-todo"
                        class="title is-5"
                        :class="{ 'is-complete': todo.is_complete }"
                      >
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
                          @click="complete(todo)"
                        >
                          <VIcon>
                            <i class="bi bi-clipboard-check"></i>
                          </VIcon>
                        </VButton>
                        <VButton
                          size="sm"
                          colors="danger"
                          data-testid="btn-delete"
                          @click="deleteTodo(todo.description)"
                        >
                          <VIcon>
                            <i class="bi bi-trash"></i>
                          </VIcon>
                        </VButton>
                      </div>
                    </VColumn>
                  </VColumns>
                </li>
              </ul>
            </template>
          </VCard>
        </VColumn>
      </VColumns>
    </div>
  </section>
</template>

<style scoped lang="scss">
.is-complete {
  text-decoration: line-through;
}

.handle-grip {
  cursor: move;
}
</style>
