export default [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login'
      },
      component: resolve => { require(['@/views/login/index.vue'], resolve) }
    }
]