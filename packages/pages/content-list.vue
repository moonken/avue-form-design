<template>
  <div>
    <avue-form-design v-if="isTypeStructureEmpty($route.params.id)" :options="options"
                      @submit="handleSubmit"
                      storage
                      :custom-fields="customFields"></avue-form-design>
    <avue-crud :data="[]" v-else :option="{
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
        column: [
          {
            type: 'input',
            label: '单行文本',
            span: 24,
            display: true,
            prop: '1611632739825_73129'
          }
        ]
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
}"></avue-crud>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'ContentList',
  data() {
    return {
      customFields: [
        // {
        //   title: '引用',
        //   component: 'reference',//ele分割线
        //   span: 24,
        //   icon: 'el-icon-eleme',
        //   tips: '引用或创建其他内容',
        //   label: '引用',
        //   labelWidth: '120px',
        //   params: {
        //   }
        // },
      ],
      options: { column: [] }
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters({
      getType: 'contentTypes/getType',
      isTypeStructureEmpty: 'contentTypes/isTypeStructureEmpty'
    }),

    currentType() {
      return this.getType(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions({
          updateContentType: 'contentTypes/update'
    }),
    handleSubmit(val) {
      debugger
      this.currentType.structure = val;
      this.updateContentType(this.currentType);
    },
  }
}
</script>
