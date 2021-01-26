import Vue from 'vue'
import VueRouter from 'vue-router'
import Avue from '@smallwei/avue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@smallwei/avue/lib/index.css'
import App from './App'

import AvueFormDesign from '../packages/';
import AvueUeditor from 'avue-plugin-ueditor'
import ContentTypeList from "@/pages/content-type-list";
import ContentList from "@/pages/content-list";
import store from '@/store/index'

Vue.use(VueRouter)
Vue.use(Avue)
Vue.use(AvueFormDesign)
Vue.use(AvueUeditor)
Vue.use(ElementUI)

Vue.config.devtools = true;
Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/',
      redirect: '/content-types'
    },
    {
      path: '/content-types', component: ContentTypeList ,
    },
    {
      path: '/content-types/:id', component: ContentList ,
    }
  ]
});

new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
