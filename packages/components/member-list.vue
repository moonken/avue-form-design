<template>
  <avue-crud :data="data" :option="option" @row-del="rowDel" @row-save="rowSave" @row-update="rowUpdate"></avue-crud>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "member-list",
  props: {spaceId: Number},
  watch: {
    spaceId: function (newVal) {
      this.loadData(newVal);
    }
  },
  beforeMount() {
    this.loadData(this.spaceId)
  },
  methods: {
    ...mapActions({
      loadMembers: 'spaces/loadMembers',
      create: 'spaces/createMember',
      update: 'spaces/updateMember',
      delete: 'spaces/deleteMember',
    }),

    loadData() {
      this.loadMembers(this.spaceId).then(res => {
        this.data = res.data;
      })
    },

    rowSave(member,done,loading){
      loading();
      this.create({spaceId: this.spaceId, member}).then((res) => {
        this.data.push(res.data)
        done()
      })
    },
    rowUpdate(member,index,done, loading){
      loading();
      this.update({spaceId: this.spaceId, member}).then((res) => {
        const index = this.data.findIndex(m => m.id == member.id);
        if (index > -1) {
          this.data.splice(index, 1, res.data)
        }
        done()
      })
    },
    rowDel(member) {
      this.delete({spaceId: this.spaceId, memberId: member.id}).then(() => {
        const index = this.data.findIndex(m => m.id == member.id);
        if (index > -1) {
          this.data.splice(index, 1)
        }
      })
    }
  },
  data() {
    return {
      data: [
      ],
      option:{
        title:'成员',
        page:false,
        align:'center',
        menuAlign:'center',
        column:[
          {
            label:'id',
            prop:'id',
            display: false,
            showColumn:false,
          },
          {
            label:'用户ID',
            prop:'userId',
            editDisplay: false,
            showColumn:false,
            type: 'select',
            display: true,
            props: {
              label: 'fullName',
              value: 'id',
            },
            filterable: false,
            dicUrl:  process.env.VUE_APP_API_URL + '/users',
            dicMethod: 'get',
          },
          {
            label:'用户名',
            prop:'name',
            display: false,
            readonly: true
          },
          {
            label:'姓名',
            prop:'fullName',
            display: false,
            readonly: true
          },
          {
            type: 'select',
            label: '角色',
            prop:'role',
            value: 'EDITOR',
            dicData: [
              {
                label: '所有者',
                value: 'OWNER'
              },
              {
                label: '编辑者',
                value: 'EDITOR'
              },
              {
                label: '查看者',
                value: 'VIEWER'
              }
            ],
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>