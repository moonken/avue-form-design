<template>
  <div class="main">
    <router-view class="main-container"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
}
</script>

<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>