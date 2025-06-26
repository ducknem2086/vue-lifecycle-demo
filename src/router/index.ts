import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // component: () => import('@/views/config/config.vue'),
      component: () => import('@/views/proposal/index.vue'),
      // component: () => import('../views/todolist/TodoList.vue'),
    },
    {
      path: '/config',
      name: 'table',
      component: () => import('@/views/config/config.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/config',
      name: 'todoList',
      component: () => import('../views/todolist/TodoList.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DashboardView.vue'),
      beforeEnter: () => {
        console.log('router init !!!')
      },
    },
  ],
})

export default router
