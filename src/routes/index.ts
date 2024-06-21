import LinkedList from '@/components/DataStructure/LinkedList.vue'
import PageNotFound from '@/pages/PageNotFound.vue'
import SortsPage from '@/pages/Sorts.vue'
import TodoPage from '@/pages/Todo.vue'
import TwoPointer from '@/pages/TwoPointer.vue'
import type { RouteRecordRaw } from 'vue-router'

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
    path: '/technique',
    name: 'technique',
    children: [
      {
        path: '/two-pointer',
        name: 'technique.two-pointer',
        component: TwoPointer
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
