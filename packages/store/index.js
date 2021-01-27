import Vue from 'vue'
import Vuex from 'vuex'
import contentTypes from './modules/content-types'
import contents from './modules/contents'
import contentReference from './modules/contents-reference'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        contentTypes,
        contents,
        contentReference
    },
    strict: debug,
})