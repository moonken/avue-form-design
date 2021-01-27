import Vue from 'vue'
import Vuex from 'vuex'
import contentTypes from './modules/content-types'
import contents from './modules/contents'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        contentTypes,
        contents
    },
    strict: debug,
})