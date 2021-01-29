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
      props: {
        label: 'id',
        value: 'id'
      },
      form: this.value,
      loaded: false,
    }
  },
  watch: {
    form: function (newVal) {
      this.$emit('input', newVal);
    },
    value: function (newVal) { // watch it
      this.form = newVal;
    }
  },
  computed: {
    ...mapGetters({
      getType: 'contentTypes/getType',
      contents: 'contentReference/getAll',
      getById: 'contentReference/getById'
    }),
    currentType() {
      return this.getType(this.contentType)
    },
    column() {
      return {
        children: {
          border: true,
              column: this.currentType && this.currentType.structure.column,
        },
      }
    }
  },
  methods: {
    ...mapActions({
      loadReference: 'contentReference/load',
    }),
    formatter(row) {
      if (!this.currentType) {
        return null;
      }
      if (row.name) {
        return this.currentType.name + '-' + row.name
      } else if (row.id) {
        return this.currentType.name + '-' + row.id
      } else {
        return null;
      }
    },
    onLoad({page, value, data}, callback) {
      console.log(page, value, data)
      let that = this;
      this.loadReference(this.contentType).then(() => {
        this.loaded = true;
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
/deep/ .avue-crud__menu {
  display: none;
}
</style>