<script lang="ts">
export default {
  name: 'TodoVue'
}
</script>
<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VTextField } from '@/components/VTextField'
import { computed, reactive, ref, toValue } from 'vue'
import { useI18n } from 'vue-i18n'

interface Todo {
  label: string
  isComplete: boolean
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

const addTodo = () => {
  todoList.push({
    label: inputTodo.value,
    isComplete: false
  })
  inputTodo.value = ''
}

const deleteTodo = (todo: string) => {
  const filtered = [...todoList].filter((e) => e.label !== todo)
  todoList.length = 0
  todoList.push(...filtered)
}
</script>

<template>
  <section class="section">
    <div class="container is-max-desktop">
      <h1 class="title">{{ t('title.todo-app') }}</h1>
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">{{ t('common.input-text', { text: t('common.todo') }) }}</p>
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
      <div class="card mt-5">
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
            <li v-for="todo in filteredTodos" :key="todo.label">
              <div class="columns">
                <div class="column is-9">
                  <h3
                    data-testid="item-todo"
                    class="is-size-3"
                    :class="{ 'is-complete': todo.isComplete }"
                  >
                    {{ todo.label }}
                  </h3>
                </div>
                <div class="column is-3">
                  <div class="is-flex is-justify-content-center is-align-items-center">
                    <label class="checkbox">
                      <input
                        id="cb-complete"
                        v-model="todo.isComplete"
                        type="checkbox"
                        name="cb-complete"
                        data-testid="cb-complete"
                      />
                      {{ t('common.complete') }}
                    </label>
                    <VButton
                      class="level-item ml-5"
                      colors="danger"
                      data-testid="btn-delete"
                      @click="deleteTodo(todo.label)"
                    >
                      <span class="icon">
                        <i class="bi bi-trash"></i>
                      </span>
                    </VButton>
                  </div>
                </div>
              </div>
            </li>
          </ul>
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
