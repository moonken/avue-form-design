import Vue from 'vue'
import Avue from '@smallwei/avue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@smallwei/avue/lib/index.css'
import App from './App'

import AvueFormDesign from '../packages/';
import AvueUeditor from 'avue-plugin-ueditor'

Vue.use(Avue)
Vue.use(AvueFormDesign)
Vue.use(AvueUeditor)
Vue.use(ElementUI)

Vue.config.devtools = true;
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
