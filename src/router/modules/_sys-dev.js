/**
 * 开发 工具模块 Router
 * **/
export default [
    {
        path: '/sys-dev/url',
        name: 'sysDevUrl-AAAAAAAAAAA',
        meta: {title: '接口调试'},
        component: () => import('@/views/sys-dev/url/index.vue')
    },
    {
        path: '/sys-dev/gen-code',
        name: 'sysDevGenCode',
        meta: {title: '代码生成'},
        component: () => import('@/views/sys-dev/url/index.vue')
    },
]