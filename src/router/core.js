export default [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: resolve => { require(['@/views/system/login/login.vue'], resolve) }
    }
]