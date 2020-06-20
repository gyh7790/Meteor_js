export default [
  {
    path: '/sys/menu',
    name: 'sysMenu',
    meta: {title: '菜单管理'},
    component: () => import('@/views/system/menu.vue')
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
    component: () => import('@/views/system/dict.vue')
  }
]
