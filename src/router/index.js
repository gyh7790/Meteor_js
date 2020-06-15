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
  

export default router