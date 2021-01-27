import {httpClient} from "@/httpClient";

const state = () => ({
    contentTypes: [],
    loading: false
})

function findType(state, id) {
    return state.contentTypes.find(type => type.id == id);
}

// getters
const getters = {
    getAll: (state) => {
        return state.contentTypes;
    },

    getType: (state) => (id) => {
        return findType(state, id);
    },
}

// actions
const actions = {
    create({ commit }, contentType) {

        httpClient.post('/content-types', contentType).then(res => {
            commit('created', res.data)
        })
    },

    update({ commit }, contentType) {
        httpClient.post(`/content-types/${contentType.id}`, contentType).then((res) => {
            commit('updated', res.data)
        })
    },

    load({ commit }) {
        httpClient.get('/content-types').then(res => {
            commit('loaded', res.data);
        })
    },

    delete({ commit }, id) {
        httpClient.post(`/content-types/${id}/delete`).then(() => {
            commit('deleted', id);
        })
    },

    updateStructure({ commit }, contentType) {
        if (!contentType.structure.column.find(c => c.prop === 'id')) {
            contentType.structure.column.push({
                label:'ID',
                prop:'id',
                addDisplay: false,
                editDisplay: false,
                showColumn:false,
                display: false,
                readonly: true,
                span: 24,
                type: "input"
            })
        }

        if (!contentType.structure.column.find(c => c.prop === 'typeId')) {
            contentType.structure.column.push({
                label: '类型',
                prop: 'typeId',
                addDisplay: false,
                editDisplay: false,
                showColumn: false,
                display: false,
                readonly: true,
                span: 24,
                type: "input"
            })
        }
        httpClient.post(`/content-types/${contentType.id}/structure`, contentType).then((res) => {
            commit('updated', res.data)
        })
    },
}

// mutations
const mutations = {
    created (state, contentType) {
        state.contentTypes.push(contentType);
    },
    loaded (state, contentTypes) {

        state.contentTypes = contentTypes;
    },
    updated (state, contentType) {
        let currentType = findType(state, contentType.id);
        currentType.name = contentType.name;
        currentType.structure = contentType.structure;
    },
    deleted (state, id) {
        state.contentTypes = state.contentTypes.filter(c => c.id !== id)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}