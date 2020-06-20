const sidebars = [
    {
      path: '/',
      redirect: '/dashboard',
      meta: { title: '首页', icon: 'dashboard', affix: true }
    },
    {
      path: '/documentation',
      meta: { title: '文档', icon: 'documentation', affix: true }
    },
    {
      path: '/permission',
      redirect: '/permission/page',
      alwaysShow: true, // will always show the root menu
      name: 'Permission',
      meta: {
        title: 'Permission',
        icon: 'lock'
      },
      children: [
        {
          path: 'page',
          name: 'PagePermission',
          meta: {
            title: 'Page Permission',
            roles: ['admin'] // or you can only set roles in sub nav
          }
        },
        {
          path: 'directive',
          name: 'DirectivePermission',
          meta: {
            title: 'Directive Permission'
            // if do not set roles, means: this page does not require permission
          }
        },
        {
          path: 'role',
          name: 'RolePermission',
          meta: {
            title: 'Role Permission',
            roles: ['admin']
          }
        }
      ]
    }
  ]

  export default sidebars;