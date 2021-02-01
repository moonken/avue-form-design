<template>
  <div>
    <avue-form-design :options="options"
                      @submit="handleSubmit"
                      storage
                      :custom-fields="customFields"></avue-form-design>
  </div>
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
      options: {column: []}
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
    this.loadTypes(this.$route.params.spaceId).then(() => {
      let structure = {...that.getType(this.$route.params.id).structure};
      if (!structure.column) {
        structure.column = [{
          type: 'input',
          label: '名称',
          span: 24,
          display: true,
          prop: 'name',
          required: true,
          rules: [
            {
              required: true,
              message: '名称必须填写'
            }
          ]
        },]
      }
      that.options = structure;
    })
  },
  methods: {
    ...mapActions({
      updateStructure: 'contentTypes/updateStructure',
      loadTypes: 'contentTypes/load',
    }),
    handleSubmit(structure) {
      this.updateStructure({spaceId: this.$route.params.spaceId, contentType: {id: this.$route.params.id, structure}}).then(() => {
        this.$router.push({path: `/spaces/${this.$route.params.spaceId}/content-types/${this.$route.params.id}`})
      });
    },
  }
}
</script>
