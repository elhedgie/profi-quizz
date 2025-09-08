import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('../views/Start.vue'),
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/Quiz.vue'),
    },
  ],
})

export default router
