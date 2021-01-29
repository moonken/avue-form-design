<template>
  <div>
    <div class="nav-bar">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item @click="$router.push({path: `/spaces`})" index="1">我的空间</el-menu-item>
        <el-menu-item @click="handleSelect(null)" index="2">内容类型</el-menu-item>
        <el-submenu index="3">
          <template slot="title">内容</template>
          <el-menu-item v-for="type in allTypes" :key="type.id" index="type.id" @click="handleSelect(type)">{{ type.name }}</el-menu-item>
        </el-submenu>
      </el-menu>

    </div>
    <router-view class="main-container"></router-view>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "space-layout",
  data() {
    return {
    };
  },
  watch: {
    '$route.params.spaceId': {
      handler: function () {
        this.cleatTypes();
        this.loadTypes(this.$route.params.spaceId);
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      loadTypes: 'contentTypes/load',
      cleatTypes: 'contentTypes/clear'
    }),
    handleSelect(type) {
      let gotoPath = `/spaces/${this.$route.params.spaceId}/content-types`
      if (type) {
        gotoPath = `${gotoPath}/${type.id}`
      }

      this.$router.push({
        path: gotoPath,
      })

    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters({
      allTypes: 'contentTypes/getAll'
    })
  },
}
</script>

<style scoped>
.nav-bar {
  /*height: 8vh;*/
}

.main-container {
  height:calc(100% - 60px);
}
</style>