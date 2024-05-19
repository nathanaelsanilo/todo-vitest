import SortsPage from '@/pages/Sorts.vue'
import TodoPage from '@/pages/Todo.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: SortsPage
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoPage
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export { router }
