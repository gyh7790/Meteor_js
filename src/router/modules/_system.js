export default [
  {
    path: '/sys/menu',
    name: 'sysMenu',
    meta: {title: '菜单管理'},
    component: () => import('@/views/system/menu/index.vue')
  },
  {
    path: '/sys/url',
    name: 'sysUrl',
    meta: {title: '接口管理'},
    component: () => import('@/views/system/url/index.vue')
  },
  {
    path: '/sys/user',
    name: 'sysUser',
    meta: {title: '用户管理'},
    component: () => import('@/views/system/user.vue')
  },
  {
    path: '/sys/role',
    name: 'sysRole',
    meta: {title: '角色管理'},
    component: () => import('@/views/system/role.vue')
  },
  {
    path: '/sys/dict',
    name: 'sysDict',
    meta: {title: '字典管理'},
    component: () => import('@/views/system/dict/index.vue')
  },
  {
    path: '/sys/dict/type/:id',
    name: 'sysDictData',
    meta: {title: '字典数据'},
    component: () => import('@/views/system/dict/data.vue')
  },
  {
    path: '/sys/selfInfo',
    name: 'sysSelfInfo',
    meta: {title: '个人中心'},
    component: () => import('@/views/system/selfInfo.vue')
  }
]
