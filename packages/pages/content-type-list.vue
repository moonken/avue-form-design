<template>
  <avue-crud :data="allTypes" v-model="obj" :option="option" @row-del="rowDel" @row-click="handleRowClick" @row-save="rowSave" @row-update="rowUpdate" @error="error"></avue-crud>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ContentTypeList",
  data() {
    return {
      obj:{},
      option:{
        page:false,
        align:'center',
        menuAlign:'center',
        column:[
          {
            label:'ID',
            prop:'id',
            addDisplay: false,
            editDisplay: false,
            showColumn:false,
          },
          {
            label:'名称',
            prop:'name',
            rules: [{
              required: true,
              message: "请输入名称",
              trigger: "blur"
            }]
          }
        ]
      },
    };
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters({
      allTypes: 'contentTypes/getAll'
    })
  },
  methods: {
    error(err){
      this.$message.success('请查看控制台');
      console.log(err)
    },
    rowSave(form,done){
      this.$store.dispatch('contentTypes/create', form).then(done)
    },
    rowUpdate(form,index,done){
      this.$store.dispatch('contentTypes/update', form).then(done)
    },
    rowDel(form,index,done){
      this.$store.dispatch('contentTypes/delete', form.id).then(done)
    },
    handleRowClick(row) {
      this.$router.push({
        path: `/content-types/${row.id}/designer`,
      })
    },
  }
}
</script>

<style scoped>

</style>