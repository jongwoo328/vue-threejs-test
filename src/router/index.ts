import { createRouter, createWebHistory } from 'vue-router'
import ModelDefault from '../views/ModelDefault.vue'
import ModelMouse from '@/views/ModelMouse.vue'

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
      component: ModelMouse
    }
  ]
})

export default router
