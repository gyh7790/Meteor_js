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
    component: () => import('@/views/system/user/index.vue')
  },
  {
    path: '/sys/role',
    name: 'sysRole',
    meta: {title: '角色管理'},
    component: () => import('@/views/system/role/index')
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
    path: '/sys/log/oper_log',
    name: 'sysOperLog',
    meta: {title: '操作日志'},
    component: () => import('@/views/system/log/operLog.vue')
  },
  {
    path: '/sys/log/login_log',
    name: 'sysLoginLog',
    meta: {title: '登入日志'},
    component: () => import('@/views/system/log/loginLog.vue')
  },
  {
    path: '/sys/selfInfo',
    name: 'sysSelfInfo',
    meta: {title: '个人中心'},
    component: () => import('@/views/system/selfInfo.vue')
  }
]
