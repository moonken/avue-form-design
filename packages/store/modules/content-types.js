
const state = () => ({
    contentTypes: [{id: 1, name: '音频', structure: {
            column: [
                {
                    type: 'input',
                    label: '姓名',
                    span: 24,
                    display: true,
                    prop: '1611623597813_61524'
                },
                {
                    type: 'dynamic',
                    label: '子表单',
                    span: 24,
                    display: true,
                    children: {
                        align: 'center',
                        headerAlign: 'center',
                        index: false,
                        addBtn: true,
                        delBtn: true,
                        column: []
                    },
                    prop: '1611624465896_33633'
                },
                {
                    type: 'textarea',
                    label: '自我介绍',
                    span: 24,
                    display: true,
                    prop: '1611623599357_22395'
                },
                {
                    type: 'upload',
                    label: '上传',
                    span: 24,
                    display: true,
                    showFileList: true,
                    multiple: true,
                    limit: 10,
                    propsHttp: {},
                    canvasOption: {},
                    prop: '1611623727560_71662'
                },
                {
                    type: 'array',
                    label: '数组',
                    span: 24,
                    display: true,
                    prop: '1611627195223_91684'
                }
            ],
            labelPosition: 'left',
            labelSuffix: '：',
            labelWidth: 120,
            gutter: 0,
            menuBtn: true,
            submitBtn: true,
            submitText: '提交',
            emptyBtn: true,
            emptyText: '清空',
            menuPosition: 'center',
            tabs: false,
            detail: false,
            readonly: true,
            disabled: false
        }}, {id: 2, name: '视频'}],
})

// getters
const getters = {
    getAll: (state) => {
        return state.contentTypes;
    },

    getType: (state) => (id) => {
        return state.contentTypes.find(type => type.id == id);
    }
}

// actions
const actions = {
    create({ commit }, contentType) {
        commit('create', contentType)
    }
}

// mutations
const mutations = {
    create (state, contentType) {
        state.contentTypes.push(contentType);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}