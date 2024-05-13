import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login/index.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../pages/upload/index.vue')
    },
  ]
})

export default router
