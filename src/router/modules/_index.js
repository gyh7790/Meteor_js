export default [
    {
        path: '/home',
        name: 'home',
        meta: {title: '首页', noCache: true, affix: true},
        component: () => import('@/views/home/index.vue')
    }
]