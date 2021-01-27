import {httpClient} from "@/httpClient";
import { uuid } from 'vue-uuid';

const state = () => ({
    contents: [],
})

function getCurrentContent(state, id) {
    return state.contents.find(type => type.id == id);
}

// getters
const getters = {
    getAll: (state) => {
        return state.contents;
    },

    getById: (state) => (id) => {
        return getCurrentContent(state, id);
    },
}

// actions
const actions = {
    create({ commit }, content) {
        content.id = uuid.v4()
        content.content.id = content.id
        content.content.typeId = content.typeId
        httpClient.post(`/content-types/${content.typeId}/contents`, content).then(res => {
            commit('created', res.data)
        })
    },

    update({ commit }, content) {
        httpClient.post(`/content-types/${content.content.typeId}/contents/${content.content.id}`, content).then((res) => {
            commit('updated', res.data)
        })
    },

    load({ commit }, typeId) {
        httpClient.get(`/content-types/${typeId}/contents`).then(res => {
            commit('loaded', res.data);
        })
    },
}

// mutations
const mutations = {
    created (state, content) {
        state.contents.push(content);
    },
    loaded (state, contents) {

        state.contents = contents;
    },
    updated (state, content) {
        let currentContent = getCurrentContent(state, content.id);
        currentContent.content = content.content;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}