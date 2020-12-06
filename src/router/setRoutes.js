import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * 初始化 路由
 * @param {*} routes 
 */
export function initRoutes (routes = []) {
    return {
        path: '/main',
        name: 'main',
        redirect: { name: 'index' },
        children: [
            { path: 'main', name: 'main', meta: { title: '首页', auth: true }, component: resolve => { require(['@/layout/index.vue'], resolve) } },
        ]
    }
}

// 在 layout 之外显示的路由
export const routesOutLayout = [
    { path: '/login', name: 'login', component: utils.import('main/login'), hidden: true },
    { path: '*', name: '404', component: utils.import('main/error/404'), hidden: true }
  ]

/**
 * 创建 VueRouter
 * @param {array} routes 
 */
const createRouter = (routes = []) => new VueRouter({
    routes
})


/**
 * @description 重新设置路由
 * @param {Array} routes 额外追加的路由
 */
export function resetRouter (routes = []) {
    router.matcher = createRouter(routes).matcher
  }