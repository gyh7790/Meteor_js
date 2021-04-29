/**
 * 组件 模块的Router
 * **/
export default [
    {
        path: '/modules/json',
        name: 'modulesJson',
        meta: {title: 'Json'},
        component: () => import('@/views/modules/json.vue')
    },
    {
        path: '/modules/icon',
        name: 'modulesIcon',
        meta: {title: '图标'},
        component: () => import('@/views/modules/icons/index.vue')
    },
    {
        path: '/modules/dnd',
        name: 'modulesJson',
        meta: {title: 'DND'},
        component: () => import('@/views/modules/dndList.vue')
    },
    {
        path: '/AAA/BBB',
        name: 'modulesJson',
        meta: {title: 'DND'},
        component: () => import('@/views/modules/dndList.vue')
    },
]