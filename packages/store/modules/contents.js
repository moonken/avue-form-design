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
    getById: (state, {spaceId, typeId, id}) => {
        return httpClient.get(`/spaces/${spaceId}/content-types/${typeId}/contents/${id}`);
    },

    create({ commit }, {spaceId, typeId, content}) {
        const id = uuid.v4();
        content.id = id;
        content.typeId = typeId
        return httpClient.post(`/spaces/${spaceId}/content-types/${content.typeId}/contents`, {id, typeId, content}).then(res => {
            commit('created', res.data)
        })
    },

    update({ commit }, {spaceId, typeId, content}) {
        const id = content.id;
        return httpClient.post(`/spaces/${spaceId}/content-types/${typeId}/contents/${id}`, {id, typeId, content}).then((res) => {
            commit('updated', res.data)
        })
    },

    load({ commit }, {spaceId, typeId}) {
        return httpClient.get(`/spaces/${spaceId}/content-types/${typeId}/contents`).then(res => {
            commit('loaded', res.data);
        })
    },

    delete( { commit } , {spaceId, content}) {
        return httpClient.post(`/spaces/${spaceId}/content-types/${content.typeId}/contents/${content.id}/delete`).then(() => {
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