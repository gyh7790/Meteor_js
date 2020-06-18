import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { ajax, cookie } from '@/utils/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'

import './icons'  // 引入 icon

Vue.use(ElementUI,{locale});

Vue.config.productionTip = false
Vue.prototype.$ajax = ajax
Vue.prototype.$cookie = cookie

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
