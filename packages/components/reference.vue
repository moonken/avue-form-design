<template>

<div>
  <avue-input-table :props="props" :column="column" :formatter="formatter" :on-load="onLoad" v-model="form" placeholder="请选择数据"></avue-input-table>
</div>
</template>

<script>
export default {
  name: "reference",
  props: {label: String, value: {type: String, default:''}},
  data() {
    return {
      column:{
        children:{
          border: true,
          column: [{
            label: '姓名',
            width: 120,
            search:true,
            prop: 'name'
          }, {
            label: '性别',
            search:true,
            prop: 'sex'
          }],
        },
      },
      props: {
        label: 'name',
        value: 'id'
      },
      form:'0'
    }
  },
  watch: {
    form: function (newVal) {
      console.log(1)
      this.$emit('input', newVal);
    },
    value: function(newVal) { // watch it
      console.log(2)
      this.form = newVal;
    }
  },
  methods:{
    formatter(row){
      if(!row.name) return ''
      return row.name + '-' + row.sex
    },
    onLoad({ page, value,data }, callback){
      //首次加载去查询对应的值
      if (value) {
        this.$message.success('首次查询'+value)
        callback({
          id: '0',
          name: '张三',
          sex: '男'
        })
        return
      }
      if(data){
        this.$message.success('搜索查询参数'+JSON.stringify(data))
      }
      if(page){
        this.$message.success('分页参数'+JSON.stringify(page))
      }
      //分页查询信息
      callback({
        total: 2,
        data: [{
          id: '0',
          name: '张三',
          sex: '男'
        }, {
          id: '1',
          name: '李四',
          sex: '女'
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>