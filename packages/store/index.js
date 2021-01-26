import Vue from 'vue'
import Vuex from 'vuex'
import contentTypes from './modules/content-types'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        contentTypes,
    },
    strict: debug,
})