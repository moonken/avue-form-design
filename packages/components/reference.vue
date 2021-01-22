<template>

<div>
  <el-button @click="click()">打开</el-button>
</div>
</template>

<script>
export default {
  name: "Reference",
  props: {label: String},
  beforeMount() {
    console.log(this);
    console.log(this.label);
  },
  methods: {
    click() {
      this.$emit('input', "ss")
      console.log(this.$attrs);
    }
  }
}
</script>

<style scoped>

</style>