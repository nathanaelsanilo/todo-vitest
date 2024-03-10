<script lang="ts">
export default {
  name: 'TodoVue'
}
</script>
<script lang="ts" setup>
import { VButton } from '@/components/VButton'
import { reactive, ref } from 'vue'

const inputTodo = ref<string>('')
const todoList = reactive<string[]>([])

const addTodo = () => {
  todoList.push(inputTodo.value)
}

const deleteTodo = (todo: string) => {
  const filtered = [...todoList].filter((e) => e !== todo)
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
          <div>
            <form novalidate @submit.prevent="addTodo">
              <div class="field">
                <label for="inputTodo" class="label">New Todo</label>
                <div class="control">
                  <input
                    v-model="inputTodo"
                    type="text"
                    data-testid="input-todo"
                    name="inputTodo"
                    id="inputTodo"
                    class="input"
                  />
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <VButton type="submit" colors="primary" data-testid="btn-add"> Add Todo </VButton>
                </div>
              </div>
            </form>
          </div>
          <div class="">
            <ul>
              <li v-for="todo in todoList" :key="todo">
                <div class="columns">
                  <span data-testid="item-todo" class="column is-size-3">{{ todo }}</span>
                  <div class="column">
                    <button
                      class="button is-danger is-small level-item"
                      data-testid="btn-delete"
                      @click="deleteTodo(todo)"
                    >
                      <span class="icon">
                        <i class="bi bi-trash"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
