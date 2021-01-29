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
        return [...state.contentTypes];
    },

    getType: (state) => (id) => {
        return findType(state, id);
    },
}

// actions
const actions = {
    create({commit}, contentType) {
        return httpClient.post('/content-types', contentType).then(res => {
            commit('created', res.data)
        })
    },

    update({commit}, contentType) {
        return httpClient.post(`/content-types/${contentType.id}`, contentType).then((res) => {
            commit('updated', res.data)
        })
    },

    load({commit}) {
        return httpClient.get('/content-types').then(res => {
            commit('loaded', res.data);
        })
    },

    getById({commit}, id) {
        return httpClient.get(`/content-types/${id}`).then(res => {
            commit('updated', res.data);
        })
    },

    delete(op, id) {
        return httpClient.post(`/content-types/${id}/delete`)
    },

    updateStructure({commit}, contentType) {
        if (!contentType.structure.column.find(c => c.prop === 'id')) {
            contentType.structure.column.splice(0, 0, {
                label: 'ID',
                prop: 'id',
                addDisplay: false,
                editDisplay: false,
                showColumn: false,
                display: false,
                readonly: true,
                span: 24,
                type: "input"
            })
        }

        if (!contentType.structure.column.find(c => c.prop === 'typeId')) {
            contentType.structure.column.splice(0, 0, {
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

        return httpClient.post(`/content-types/${contentType.id}/structure`, contentType).then((res) => {
            commit('updated', res.data)
        })
    },
}

function initColumn(c) {
    return c.column.forEach(c => {
        if (c.type === 'upload') {
            c.action = '/files/upload'
            c.listType = 'picture-card'
            c.propsHttp = {
                res: 'data.data',
                url: 'url',
                name: 'name'
            }
        }

        if (c.type === 'reference') {
            c.slot =true;
        }

        if (c.type === 'dynamic') {
            initColumn(c.children)
        }
    });
}

function initContentStructure(structure) {
    structure && structure.group && structure.group.forEach(g => {
        initColumn(g)
    })

    structure && structure.column && initColumn(structure)
}

// mutations
const mutations = {
    created(state, contentType) {
        state.contentTypes.push(contentType);
    },
    loaded(state, contentTypes) {
        contentTypes.map(c => c.structure).forEach(structure => initContentStructure(structure))
        state.contentTypes = contentTypes;
    },
    updated(state, contentType) {
        let currentType = findType(state, contentType.id);
        currentType.name = contentType.name;
        currentType.structure = contentType.structure;
        initContentStructure(currentType.structure)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}