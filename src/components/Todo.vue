<script lang="ts">
export default {
  name: 'TodoVue'
}
</script>
<script lang="ts" setup>
import { reactive, ref } from 'vue'

const inputTodo = ref<string>('')
const todoList = reactive<string[]>([])

const addTodo = () => {
  todoList.push(inputTodo.value)
}
</script>

<template>
  <section class="section">
    <div class="container">
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
                  <button class="button is-primary" type="submit" data-testid="btn-add">
                    Add Todo
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="content">
            <ul>
              <li v-for="todo in todoList" :key="todo" data-testid="item-todo">
                {{ todo }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
