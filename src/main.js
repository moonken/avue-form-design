import Vue from 'vue'
import VueRouter from 'vue-router'
import UUID from "vue-uuid";
import Avue from '@smallwei/avue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@smallwei/avue/lib/index.css'
import App from './App'

import { router } from '@/router'
import AvueFormDesign from '../packages/';
import AvueUeditor from 'avue-plugin-ueditor'
import store from '@/store/index'

Vue.prototype.baseURL = process.env.VUE_APP_BASE_URL

Vue.use(UUID);
Vue.use(VueRouter)
Vue.use(Avue)
Vue.use(AvueFormDesign)
Vue.use(AvueUeditor)
Vue.use(ElementUI)


Vue.config.devtools = true;
Vue.config.productionTip = false

store.dispatch('contentTypes/load')
new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
