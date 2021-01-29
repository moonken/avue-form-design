<template>
  <el-avatar :size="size" :src="avatar">
    {{shortName}}
  </el-avatar>
</template>

<script>
export default {
  name: "user-avatar",
  props: {userName: String, avatar: String, size: {type: Number, default: 32}},
  data() {
    return {
      shortName: null
    }
  },
  beforeMount() {
    this.shortName = this.userName.slice(0, 2).toUpperCase();
  },
}
</script>

<style scoped>
</style>