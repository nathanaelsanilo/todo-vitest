<script lang="ts">
export default {
  name: 'TodoVue'
}
</script>
<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VIcon } from '@/components/VIcon'
import { VProgress } from '@/components/VProgress'
import { VTextField } from '@/components/VTextField'
import dayjs from 'dayjs'
import { computed, reactive, ref, toValue } from 'vue'
import { useI18n } from 'vue-i18n'

interface Todo {
  label: string
  isComplete: boolean
  timestamp: string
}
const { t } = useI18n()
const inputTodo = ref<string>('')
const inputSearch = ref<string>('')
const todoList = reactive<Todo[]>([])

const filteredTodos = computed<Todo[]>(() => {
  return todoList.filter((todo) => {
    if (toValue(inputSearch)) {
      return todo.label.toUpperCase().includes(toValue(inputSearch).toUpperCase())
    }

    return todo
  })
})

const countCompleted = computed(() => todoList.filter((record) => record.isComplete))

const progress = computed<number>(() => {
  const total = todoList.length
  if (total === 0) return 0
  const completeTask = todoList.filter((record) => record.isComplete).length
  return Math.ceil((completeTask / total) * 100)
})

const addTodo = () => {
  todoList.push({
    label: inputTodo.value,
    isComplete: false,
    timestamp: dayjs().format('D MMM, H:m')
  })
  inputTodo.value = ''
}

const deleteTodo = (todo: string) => {
  const filtered = [...todoList].filter((e) => e.label !== todo)
  todoList.length = 0
  todoList.push(...filtered)
}

const upItem = (current: number) => {
  if (current === 0) return
  const before = todoList[current - 1]
  const after = todoList[current]
  todoList[current] = before
  todoList[current - 1] = after
}

const downItem = (current: number) => {
  if (current === todoList.length) return

  const before = todoList[current + 1]
  const after = todoList[current]
  todoList[current] = before
  todoList[current + 1] = after
}

const complete = (todo: Todo) => {
  todo.isComplete = !todo.isComplete
}
</script>

<template>
  <section class="section">
    <div class="container is-max-desktop">
      <h1 class="title">{{ t('title.todo-app') }}</h1>
      <div class="columns">
        <div class="column is-5">
          <div class="card">
            <div class="card-header">
              <p class="card-header-title">
                {{ t('common.input-text', { text: t('common.todo') }) }}
              </p>
            </div>
            <div class="card-content">
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
            </div>
          </div>
          <div class="box mt-2">
            <div class="level">
              <div class="level-left">
                <label for="progress-todo">{{ t('common.progress') }}</label>
              </div>
              <div class="level-right">
                <label for="" data-testid="progress-todo-label">
                  {{ `${countCompleted.length}/${todoList.length}` }}
                </label>
              </div>
            </div>
            <VProgress id="progress-todo" :value="progress" data-testid="progress-todo" />
          </div>
        </div>
        <div class="column">
          <div class="card">
            <div class="card-header">
              <p class="card-header-title">
                {{ t('common.todo') }}
              </p>
            </div>
            <div class="card-content">
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
              <ul class="mt-5">
                <li v-for="(todo, idx) in filteredTodos" :key="todo.label" class="block">
                  <div class="columns is-align-items-center">
                    <div class="column is-1">
                      <VButton
                        class=""
                        colors="white"
                        size="sm"
                        data-testid="arrow-up"
                        @click="upItem(idx)"
                      >
                        <VIcon>
                          <i class="bi bi-arrow-up"></i>
                        </VIcon>
                      </VButton>
                      <VButton
                        class=""
                        colors="white"
                        size="sm"
                        data-testid="arrow-down"
                        @click="downItem(idx)"
                      >
                        <VIcon>
                          <i class="bi bi-arrow-down"></i>
                        </VIcon>
                      </VButton>
                    </div>
                    <div class="column">
                      <h3
                        data-testid="item-todo"
                        class="title is-5"
                        :class="{ 'is-complete': todo.isComplete }"
                      >
                        {{ todo.label }}
                      </h3>
                      <h5 class="subtitle is-7" data-testid="timestamp-todo">
                        {{ t('common.published-date-text', { text: todo.timestamp }) }}
                      </h5>
                    </div>
                    <div class="column is-2">
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
                          class="level-item"
                          size="sm"
                          colors="danger"
                          data-testid="btn-delete"
                          @click="deleteTodo(todo.label)"
                        >
                          <VIcon>
                            <i class="bi bi-trash"></i>
                          </VIcon>
                        </VButton>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.is-complete {
  text-decoration: line-through;
}
</style>
