import { createRouter, createWebHistory, createMemoryHistory } from 'vue-router'

const Router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes: [
    {
      name: 'index',
      path: '/index',
      component: () => import('../pages/index.vue')
    }
  ]
})

export default Router
