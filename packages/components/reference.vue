<template>

  <div>
    <avue-input-table :props="props" :column="column" :formatter="formatter" :on-load="onLoad" v-model="form"
                      placeholder="请选择数据"></avue-input-table>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "reference",
  props: {label: String, value: {type: String, default: ''}, contentType: Number},
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
    value: function (newVal) { // watch it
      console.log(2)
      this.form = newVal;
    }
  },
  beforeMount() {
    this.column = {
      children: {
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
    currentType() {
      return this.getType(this.contentType)
    },
  },
  methods: {
    ...mapActions({
      loadReference: 'contentReference/load',
    }),
    formatter(row) {
      if (row.name) {
        return this.currentType.name + '-' + row.name
      } else {
        return this.currentType.name + '-' + row.id
      }
    },
    onLoad({page, value, data}, callback) {
      console.log(page, value, data)
      let that = this;
      this.loadReference(this.contentType).then(() => {
        if (value) {
          callback(that.getById(value).content)
        } else {
          callback({
            total: that.contents.length,
            data: that.contents.map(c => c.content)
          })
        }
      });

    }
  }
}
</script>

<style scoped>

</style>