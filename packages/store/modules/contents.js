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
        return [...state.contents];
    },
}

// actions
const actions = {
    getById: (op, {typeId, id}) => {
        return httpClient.get(`/content-types/${typeId}/contents/${id}`);
    },

    create({ commit }, content) {
        content.id = uuid.v4()
        content.content.id = content.id
        content.content.typeId = content.typeId
        return httpClient.post(`/content-types/${content.typeId}/contents`, content).then(res => {
            commit('created', res.data)
        })
    },

    update({ commit }, content) {
        return httpClient.post(`/content-types/${content.content.typeId}/contents/${content.content.id}`, content).then((res) => {
            commit('updated', res.data)
        })
    },

    load({ commit }, typeId) {
        return httpClient.get(`/content-types/${typeId}/contents`).then(res => {
            commit('loaded', res.data);
        })
    },

    delete( { commit } , content) {
        return httpClient.post(`/content-types/${content.typeId}/contents/${content.id}/delete`).then(() => {
            commit('deleted', content.id);
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
    deleted(state, id) {
        state.contents = state.contents.filter(c => c.id !== id);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}