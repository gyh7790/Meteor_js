import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import mainRouter from './mainRouter'

export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: resolve => { require(['@/views/login/index.vue'], resolve) }
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...constantRoutes,
    mainRouter
  ]
})





router.beforeEach((to, from, next) => {
    // ...
    if (to.path === '/') {
      next({
        path: 'login'
      })
    } else {
      next()
    }
})

export default router