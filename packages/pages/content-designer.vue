<template>
  <div>
    <avue-form-design :options="options"
                      @submit="handleSubmit"
                      storage
                      :custom-fields="customFields"></avue-form-design></div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'ContentDesigner',
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
      contents: 'contents/getAll'
    }),

  },
  beforeMount() {
    let that = this;
    setTimeout(() => {
      that.options = that.getType(that.$route.params.id).structure;
    }, 1000)
  },
  methods: {
    ...mapActions({
      updateStructure: 'contentTypes/updateStructure'
    }),
    handleSubmit(structure) {
      this.updateStructure({id: this.$route.params.id, structure});
    },
  }
}
</script>
