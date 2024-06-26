import { createRouter, createWebHistory } from 'vue-router'
import ModelDefault from '../views/ModelDefault.vue'
import ModelMouseDrag from '@/views/ModelMouseDrag.vue'
import ModelPointer from '@/components/ModelPointer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/base',
      name: 'base',
      component: ModelDefault
    },
    {
      path: '/mouse',
      name: 'mouse',
      component: ModelMouseDrag
    },
    {
      path: '/pointer',
      name: 'pointer',
      component: ModelPointer
    }
  ]
})

export default router
