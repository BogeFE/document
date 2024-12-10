import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { before } from 'node:test'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于'
    },
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
  }
]

router.beforeEach((to, from, next) => {
    console.log(`Router.beforeEach from ${from.path} to ${to.path}`)
    document.titile = to.meta.title || '默认标题'
    next()
})

router.afterEach((to, from) => {
    console.log(`Router.afterEach after from ${from.path} to ${to.path}`)
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
