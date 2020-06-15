export default {
    path: '/main',
    name: 'mainRouter',
    component: resolve => { require(['@/views/system/home/main.vue'], resolve) }
}
  