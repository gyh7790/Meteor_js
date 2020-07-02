import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ajax from '@/utils/axios'
import Cookies from 'js-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

import './assets/icons'  // 引入 icon

import './styles/element-variables.scss'
import '@/styles/index.scss'

Vue.use(ElementUI,{
  size: Cookies.get('size') || 'medium',
  locale: zhLocale
});

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
