<script lang="ts">
export default {
  name: 'TodoVue'
}
</script>
<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { VTextField } from '@/components/VTextField'
import { reactive, ref } from 'vue'

interface Todo {
  label: string
  isComplete: boolean
}

const inputTodo = ref<string>('')
const todoList = reactive<Todo[]>([])

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
      <h1 class="title">Todo App</h1>
      <div class="card">
        <div class="card-header">
          <p class="card-header-title">Input Todo</p>
        </div>
        <div class="card-content">
          <form novalidate @submit.prevent="addTodo">
            <VTextField
              id="inputTodo"
              v-model="inputTodo"
              name="inputTodo"
              label="New Todo"
              data-testid="input-todo"
            />
            <div class="field">
              <div class="control">
                <VButton type="submit" colors="primary" data-testid="btn-add"> Add Todo </VButton>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="card mt-5">
        <div class="card-header">
          <p class="card-header-title">Todos</p>
        </div>
        <div class="card-content">
          <ul>
            <li v-for="todo in todoList" :key="todo.label">
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
                      Complete
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
