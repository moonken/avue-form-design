<template>
  <div id="app">
    <avue-form-design style="height: 100vh;"
                      :options="options"
                      @submit="handleSubmit"
                      storage
                      :custom-fields="customFields"></avue-form-design>
  </div>
</template>

<script>
export default {
  name: 'app',
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
  methods: {
    handleSubmit(val) {
      this.$message.success("查看控制台")
      console.log(val);
    },
  }
}
</script>
