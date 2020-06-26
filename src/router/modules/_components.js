/**
 * 组件 模块的Router
 * **/
export default [
    {
        path: '/modular/json',
        name: 'modularJson',
        meta: {title: 'Json'},
        component: () => import('@/views/modular/json.vue')
    },
    {
        path: '/modular/icon',
        name: 'modularIcon',
        meta: {title: '图标'},
        component: () => import('@/views/modular/icons/index.vue')
    },
    {
        path: '/modular/dnd',
        name: 'modularJson',
        meta: {title: 'DND'},
        component: () => import('@/views/modular/dndList.vue')
    },
    {
        path: '/AAA/BBB',
        name: 'modularJson',
        meta: {title: 'DND'},
        component: () => import('@/views/modular/dndList.vue')
    },
]