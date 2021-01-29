import {httpClient} from "@/httpClient";

const state = () => ({
    spaces: []
})

// getters
const getters = {
    getAll: (state) => {
        return [...state.spaces];
    },
}

const actions = {
    getById: (op, {id}) => {
        return httpClient.get(`/spaces/${id}`);
    },

    create({ commit }, space) {
        return httpClient.post(`/spaces`, space).then(res => {
            commit('created', res.data)
        })
    },

    update({ commit }, space) {
        return httpClient.post(`/spaces/${space.id}`, space).then(() => {
            debugger
            commit('updated', space)
        })
    },

    load({ commit }) {
        return httpClient.get(`/spaces`).then(res => {
            commit('loaded', res.data);
        })
    },

    delete( { commit } , id) {
        return httpClient.post(`/spaces/${id}/delete`).then(() => {
            commit('deleted', id);
        })
    },
}

// mutations
const mutations = {
    created (state, space) {
        state.spaces.push(space);
    },
    loaded (state, spaces) {
        state.spaces = spaces;
    },
    updated (state, space) {
        let index = state.spaces.findIndex(s => s.id == space.id);
        if (index > -1) {
            state.spaces.splice(index, 1, space)
        }
    },
    deleted(state, id) {
        state.spaces = state.spaces.filter(c => c.id !== id);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}