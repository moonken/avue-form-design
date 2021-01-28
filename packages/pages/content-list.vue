<template>
  <div>
    <avue-crud :data="contents.map(c => c.content)" @row-del="rowDel" @row-save="rowSave" @row-update="rowUpdate"
               @error="error" :option="structure">
      <template slot="expand" slot-scope="{row}">
        <avue-crud v-for="tableField in subTables" :data="row[tableField]" :option="{ ...structure.column.find(c => c.prop == tableField).children, refreshBtn: false, addBtn:false, menu:false, columnBtn: false} "></avue-crud>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'ContentList',
  data() {
    return {
      structure: {},
      subTables: []
    }
  },
  computed: {
    ...mapGetters({
      getType: 'contentTypes/getType',
      contents: 'contents/getAll'
    }),
  },
  beforeMount() {
    this.loadData();
  },
  watch: {
    '$route.params.id': {
      handler: function () {
        this.loadData();
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      updateContentType: 'contentTypes/update',
      loadTypes: 'contentTypes/load',
      loadContents: 'contents/load',
      create: 'contents/create',
      update: 'contents/update',
      delete: 'contents/delete'
    }),

    loadData() {
      const that = this;
      this.loadContents(this.$route.params.id)
      this.loadTypes().then(function () {
        let structure = {...that.getType(that.$route.params.id).structure,
          excelBtn:true,
          expandRowKeys:[1],
          rowKey:'id',};
        that.subTables = structure.column.filter(c => c.type == 'dynamic').map(c => c.prop)
        structure.expand = that.subTables.length > 0;
        that.structure = structure;
      })
    },

    handleSubmit(val) {
      console.log(val);
    },
    error(err) {
      this.$message.success('请查看控制台');
      console.log(err)
    },
    rowSave(form, done, loading) {
      loading()
      this.create({content: form, typeId: this.$route.params.id}).then(done).catch(done)
    },
    rowUpdate(form, index, done, loading) {
      loading()
      this.update({content: form, typeId: this.$route.params.id}).then(done).catch(done)
    },
    rowDel(form, index, done) {
      this.delete(form).then(done)
    },
  }
}
</script>
