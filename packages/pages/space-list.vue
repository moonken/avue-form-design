<template>
  <el-row class="space-list">
      <el-card class="space-card" v-for="space in allSpaces" :key="space.id" :body-style="{ padding: '0px' }">
        <div>
          <div @click="goto(space.id)" class="image" :style="{ backgroundImage: getBackgroundImage(space.backgroundImage)}"/>
          <div style="padding: 14px;">
            <span>{{ space.name }}</span>
            <div class="bottom clearfix">
              <user-avatar-list
                  :members="space.members"></user-avatar-list>

              <el-popconfirm
                  title="这是一段内容确定删除吗？" @confirm="handleDelete(space.id)"
              >
              <div slot="reference" class="icon-button">
                <i class="el-icon-delete"></i>
              </div>
              </el-popconfirm>
              <div @click="handleEdit(space)" class="icon-button">
                <i class="el-icon-edit"></i>
              </div>
              <el-button @click="showMembers(space.id)" type="text" class="button">成员管理</el-button>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="space-card" :body-style="{ padding: '0px' }">
        <div @click="addNew()">
          <el-row type="flex" class="add-container">
            <el-col class="add-icon" :span="24"><i class="el-icon-circle-plus-outline"></i></el-col>
          </el-row>
        </div>
      </el-card>

    <el-dialog
        title="编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <avue-form ref="form" v-model="newSpace" @submit="handleSubmit" :option="option">
      </avue-form>
    </el-dialog>
    <el-dialog
        title="成员管理"
        :visible.sync="membersDialogVisible"
        width="40%"
        :before-close="handleMembersClose">
      <member-list :space-id="currentSpaceId"></member-list>
    </el-dialog>
  </el-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UserAvatarList from "@components/user-avatar-list";
import MemberList from "@components/member-list";

export default {
  name: "SpaceList",
  components: {MemberList, UserAvatarList},
  data() {
    return {
      allSpaces: [],
      newSpace: {},
      currentSpaceId: null,
      dialogVisible: false,
      membersDialogVisible: false,
      option: {
        column: [
          {
            type: 'input',
            label: '空间名称',
            span: 24,
            display: true,
            prop: 'name',
            required: true,
            rules: [
              {
                required: true,
                message: '空间名称必须填写'
              }
            ]
          },
          {
            type: 'upload',
            label: '背景图片',
            span: 24,
            display: true,
            showFileList: true,
            action: '/files/upload',
            listType: 'picture-img',
            multiple: false,
            limit: 10,
            propsHttp: {
              res: 'data.data',
              url: 'url',
              name: 'name'
            },
            canvasOption: {},
            prop: 'backgroundImage',
            drag: true
          }
        ],
        labelPosition: 'left',
        labelSuffix: '：',
        labelWidth: 120,
        gutter: 0,
        menuBtn: true,
        submitBtn: true,
        submitText: '提交',
        emptyBtn: true,
        emptyText: '清空',
        menuPosition: 'center'
      }
    };
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters({
      getSpaces: 'spaces/getAll'
    })
  },
  beforeMount() {
    let that = this;
    this.loadSpaces().then(function (){
      that.allSpaces = that.getSpaces;
    });
  },
  methods: {
    ...mapActions({
      loadSpaces: 'spaces/load',
      create: 'spaces/create',
      delete: 'spaces/delete',
      update: 'spaces/update'
    }),

    getBackgroundImage(backgroundImage) {
      if (backgroundImage) {
        return `url(${backgroundImage})`;
      } else {
        return 'linear-gradient(141deg,#9fb8ad 0%,#1fc8db 51%,#2cb5e8 75%)';
      }
    },

    goto(id) {
      this.$router.push({path: `/spaces/${id}`});
    },

    handleClose() {
      this.dialogVisible = false;
    },

    handleMembersClose() {
      this.membersDialogVisible = false;
    },

    showMembers(spaceId) {
      this.currentSpaceId = spaceId;
      this.membersDialogVisible = true;
    },

    addNew() {
      this.$refs.form && this.$refs.form.resetForm();
      this.dialogVisible = true;
    },

    handleDelete(id) {
      this.delete(id)
    },

    handleEdit(space) {
      this.newSpace = {...space}
      this.dialogVisible = true;
    },

    handleSubmit() {
      this.$refs.form.validate((valid,done)=>{
        if(valid){
          let that = this;
          if (this.newSpace.id) {
            this.update(this.newSpace).then(() => {
              debugger
              that.$message.success("更新成功");
              that.dialogVisible = false;
              done();
            }).catch(done)
          } else {
            this.create(this.newSpace).then(() => {
              that.$message.success("创建成功");
              that.dialogVisible = false;
              done();
            }).catch(done)
          }

        }
      })
    },
  }
}
</script>

<style scoped>
.space-list {
  margin-top: 20px;
}

.space-card {
  display: inline-block;
  width: 20%;
  height: 310px;
  margin: 20px 2%;
}

.add-container {
  margin-top: 90px;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  text-align: center;
  display: flex;
}
.icon-button {
  margin: 0 10px;
  float: right;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.add-icon {
  font-size: 80px;
}

.image {
  width: 20vw;
  height: 200px;
  display: block;
  background-repeat: no-repeat;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>