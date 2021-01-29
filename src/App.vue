<template>
    <div class="main">
      <div class="nav-bar" v-if="this.$route.name != 'login'">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item @click="$router.push({path: `/content-types`})" index="1">内容类型</el-menu-item>
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
import {mapActions, mapGetters} from "vuex";

export default {
  name: "app",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    ...mapActions({
      loadTypes: 'contentTypes/load'
    }),

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