<template>
  <avue-crud v-if="data.length > 0" :data="data" :option="option">
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
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "reference-view",
  props: {contentId: String, contentType: Number},
  data() {
    return {
      data: [],
      option: {},
      subTables: [],
      references: []
    }
  },
  created() {
    this.loadData(this.contentType, this.contentId);
  },
  computed: {
    ...mapGetters({
      getType: 'contentTypes/getType',
    }),
  },
  methods: {
    ...mapActions({
      getContent: 'contents/getById',
    }),

    loadData() {
      if (!this.contentId) {
        return;
      }

      this.getContent({typeId: this.contentType, id: this.contentId}).then(res => {
        this.data = [res.data.content]
      })

      let structure = this.getType(this.contentType).structure;
      this.subTables = structure.column.filter(c => c.type === 'dynamic').map(column => {
        return {
          original: column,
          structure: { ...structure.column.find(c => c.prop === column.prop).children,  refreshBtn: false, addBtn:false, menu:false, columnBtn: false},
          references: column.children.column.filter(c => c.type === 'reference')
        }
      })
      structure.expand = this.subTables.length > 0;
      this.option = { ...structure, refreshBtn: false, addBtn:false, menu:false, columnBtn: false};
      this.references = structure.column.filter(c => c.type === 'reference')
    },
  }
}
</script>

<style scoped>
  /deep/ .avue-crud__menu {
    display: none;
  }

  /deep/ .avue-crud__pagination {
    display: none;
  }
</style>