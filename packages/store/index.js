import Vue from 'vue'
import Vuex from 'vuex'
import contentTypes from './modules/content-types'
import contents from './modules/contents'
import contentReference from './modules/contents-reference'
import vuexActionDebounce from '@xunlei/vuex-action-debounce'

const timeout = 500 // 请求完成后的缓存时间
const vuexActionDebouncePlugin = vuexActionDebounce(timeout)

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        contentTypes,
        contents,
        contentReference
    },
    plugins: [ vuexActionDebouncePlugin ],
    strict: debug,
})