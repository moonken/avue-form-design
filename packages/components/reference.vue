<template>

<div>
  <avue-input-table :props="props" :column="column" :formatter="formatter" :on-load="onLoad" v-model="form" placeholder="请选择数据"></avue-input-table>
</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "reference",
  props: {label: String, value: {type: String, default:''}, contentType: Number},
  data() {
    return {
      column: {},
      props: {
        label: 'id',
        value: 'id'
      },
      form: this.value
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
  beforeMount() {
    this.column = {
      children:{
        border: true,
        column: this.currentType.structure.column,
      },
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters({
      getType: 'contentTypes/getType',
      contents: 'contentReference/getAll',
      getById: 'contentReference/getById'
    }),
    currentType () {
      return this.getType(this.contentType)
    },
  },
  methods:{
    formatter(row){
      if (row.id) {
        return this.currentType.name + '-' + row.id
      }
    },
    onLoad({ page, value,data }, callback){

      this.$store.dispatch('contentReference/load', this.contentType);
      console.log(page, value,data)
      let that = this;

      if (value) {
        debugger
        setTimeout(() => {
          callback(that.getById(value))
        }, 1000)
      } else {
        setTimeout(() => {
          callback({
            total: that.contents.length,
            data: that.contents.map(c => c.content)
          })
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>

</style>