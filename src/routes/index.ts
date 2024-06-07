import type { RouteRecordRaw } from 'vue-router'
import SortsPage from '@/pages/Sorts.vue'
import TodoPage from '@/pages/Todo.vue'
import PageNotFound from '@/pages/PageNotFound.vue'
import LinkedList from '@/components/DataStructure/LinkedList.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    component: SortsPage
  },
  {
    path: '/data-structure',
    name: 'data-structure',
    children: [
      {
        path: '/linked-list',
        name: 'data-structure.linked-list',
        component: LinkedList
      }
    ]
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: PageNotFound
  }
]

export { routes }
