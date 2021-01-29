<template>
  <div>
    <avue-crud :data="contents.map(c => c.content)" @row-del="rowDel" @row-save="rowSave" @row-update="rowUpdate"
               @error="error" :option="structure">
      <template slot="expand" slot-scope="{row}">
        <div class="expanded" v-for="subTable in subTables" :key="subTable.original.prop" >
          <div class="title">{{subTable.original.label}}</div>
          <avue-crud  :data="row[subTable.original.prop]" :option="subTable.structure">
              <template v-for="ref in subTable.references" :slot="ref.prop" slot-scope="scope">
                <div :key="ref.prop">
                  <reference-view :content-id="scope.row[ref.prop]" :content-type="ref.contentType"></reference-view>
                </div>
              </template>
          </avue-crud>
        </div>
      </template>

      <template v-for="ref in references" :slot="ref.prop" slot-scope="scope">
        <div :key="ref.prop">
          <reference-view :content-id="scope.row[ref.prop]" :content-type="ref.contentType"></reference-view>
        </div>
      </template>

    </avue-crud>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import ReferenceView from "@components/reference-view";

export default {
  name: 'ContentList',
  components: {ReferenceView},
  data() {
    return {
      structure: {},
      subTables: [],
      references: [],
    }
  },
  computed: {
    ...mapGetters({
      getType: 'contentTypes/getType',
      contents: 'contents/getAll',
    }),
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
      loadTypes: 'contentTypes/load',
      loadContents: 'contents/load',
      create: 'contents/create',
      update: 'contents/update',
      delete: 'contents/delete',
    }),

    loadData() {
      const that = this;
      this.loadContents({spaceId: this.$route.params.spaceId, typeId: this.$route.params.id})
      this.loadTypes(this.$route.params.spaceId).then(function () {
        let structure = {...that.getType(that.$route.params.id).structure,
          expandRowKeys:['id'],
          rowKey:'id',};
        let columns = structure.column || []
        that.subTables = columns.filter(c => c.type === 'dynamic').map(column => {
          return {
            original: column,
            structure: { ...structure.column.find(c => c.prop === column.prop).children,  refreshBtn: false, addBtn:false, menu:false, columnBtn: false},
            references: column.children.column.filter(c => c.type === 'reference')
          }
        })
        structure.expand = that.subTables.length > 0;
        that.structure = structure;
        that.references = columns.filter(c => c.type === 'reference')
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
      this.create({content: form, typeId: this.$route.params.id, spaceId: this.$route.params.spaceId}).then(done)
    },
    rowUpdate(form, index, done, loading) {
      loading()
      this.update({content: form, typeId: this.$route.params.id, spaceId: this.$route.params.spaceId}).then(done)
    },
    rowDel(form) {
      this.delete({spaceId: this.$route.params.spaceId, content: form})
    },
  }
}
</script>

<style scoped>
.title {
  margin: 0 20px;
}

/deep/ .expanded .avue-crud__menu {
      display: none;
}

/deep/ .expanded .avue-crud__pagination {
      display: none;
}
</style>
