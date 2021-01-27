<template>
  <div>
    <avue-crud :data="contents.map(c => c.content)" @row-delete="rowDelete" @row-save="rowSave" @row-update="rowUpdate" @error="error" :option="structure" ></avue-crud>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: 'ContentList',
  data() {
    return {
      structure: {}
    }
  },
  computed: {
    ...mapGetters({
      getType: 'contentTypes/getType',
      contents: 'contents/getAll'
    }),
  },
  beforeMount() {
    const that = this;
    this.$store.dispatch('contents/load', this.$route.params.id);
    setTimeout( function () {
      let structure = {...that.getType(that.$route.params.id).structure}
      structure.column.forEach(c => {
        if (c.type === 'upload') {
          c.action = '/files/upload'
          c.listType = 'picture-card'
          c.propsHttp = {
            res: 'data.data',
            url: 'url',
            name: 'name'
          }
        }
      })

      that.structure = structure;
    }, 2000)
  },
  methods: {
    ...mapActions({
          updateContentType: 'contentTypes/update'
    }),
    handleSubmit(val) {
      console.log(val);
    },
    error(err){
      this.$message.success('请查看控制台');
      console.log(err)
    },
    rowSave(form,done){
      this.$store.dispatch('contents/create', {content: form, typeId: this.$route.params.id})
      done();
    },
    rowUpdate(form,index,done){
      this.$store.dispatch('contents/update', {content: form, typeId: this.$route.params.id})
      done();
    },
  }
}
</script>
