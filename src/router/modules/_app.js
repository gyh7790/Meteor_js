export default [
    {
      path: '/app/banner',
      name: 'appBanner',
      meta: {title: '轮播图管理'},
      component: () => import('@/views/modules/app/banner/index.vue')
    },
    {
      path: '/app/tag',
      name: 'appTag',
      meta: {title: 'Tag管理'},
      component: () => import('@/views/modules/app/banner/index.vue')
    },

    // 视频
    {
      path: '/app/video',
      name: 'appVideo',
      meta: {title: '视频管理'},
      component: () => import('@/views/modules/app/video/index.vue')
    },
    {
      path: '/app/videoItem/:id',
      name: 'appVideoItemData',
      meta: {title: '视频详情管理'},
      component: () => import('@/views/modules/app/video/data.vue')
    },
  ]