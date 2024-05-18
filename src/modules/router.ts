import BubbleSort from '@/components/BubbleSort.vue'
import Todo from '@/components/Todo.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'bubble-sort',
    component: BubbleSort
  },
  {
    path: '/todo',
    name: 'todo',
    component: Todo
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export { router }
