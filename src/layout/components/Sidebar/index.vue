<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical">

        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRouter } from '@/api/navList'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import router from '@/router'
import mainRouter from '@/router/mainRouter'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
    }
  },
  mounted () {
    if (Array.from(this.permission_routes).length <= 0 ) {
      this.$ajax.get('sys/menu/getNav').then((res) => {

      mainRouter.children.push(...[{
                path: '/sys-dev/url',
                name: 'sysDevUrl-AAAAAAAAAAA',
                // meta: {title: '接口调试'},
                component: () => import('@/views/sys-dev/url/index.vue')
            }])
        router.addRoutes([{
          path: '/sys-dev/gen-code',
          name: 'sysDevGenCode',
          // meta: {title: '代码生成'},
          component: () => import('@/views/sys-dev/url/index.vue')
      }])
        this.router = router
        console.log("router.addRoutes", this.router)
        this.$store.dispatch('permission/setRoutes',getRouter(res.list));
      })
    }
  },

}
</script>
