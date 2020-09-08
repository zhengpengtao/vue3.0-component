import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/nextTick',
    name: 'NextTick',
    component: () => import(/* webpackChunkName: "about" */ '../views/NextTick.vue')
  },
  {
    path: '/comuse',
    name: 'Comuse',
    component: () => import(/* webpackChunkName: "about" */ '../views/Comuse.vue')
  },
  {
    path: '/diff',
    name: 'Diff',
    component: () => import(/* webpackChunkName: "about" */ '../views/Diff.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
