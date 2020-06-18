import Vue from 'vue'
import VueRouter from 'vue-router'
import coreRouter from './core'
import mainRouter from './mainRouter'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        ...coreRouter,
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



export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]


export default router