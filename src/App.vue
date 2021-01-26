<template>
    <div class="main">
      <div class="nav-bar">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="1"><a href="/content-types">内容类型</a></el-menu-item>
          <el-submenu index="2">
            <template slot="title">内容</template>
            <el-menu-item v-for="type in allTypes" :key="type.id" index="type.id" @click="handleSelect(type)">{{ type.name }}</el-menu-item>
          </el-submenu>
        </el-menu>

      </div>
      <router-view class="main-container"></router-view>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "app",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    handleSelect(type) {
      this.$router.push({
        path: `/content-types/${type.id}`,
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
  .main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .nav-bar {
    /*height: 8vh;*/
  }

  .main-container {
    height:calc(100% - 60px);
  }

</style>