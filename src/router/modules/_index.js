export default [
    {
        path: '/home',
        name: 'home',
        meta: {title: '首页', affix: true},
        component: () => import('@/views/home/index.vue')
    }
]