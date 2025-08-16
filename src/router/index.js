import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/second',
      name: 'second',
      component: () => import('../views/SecondView.vue'),
    },
    {
      path: '/third',
      name: 'third',
      component: () => import('../views/ThirdView.vue'),
    },
  ],
})

export default router
