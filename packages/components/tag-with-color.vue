<template>
  <div class="tag-editor">
    <el-tag
        :key="label"
        :style="{backgroundColor: color}">
      {{ label }}
    </el-tag>
    <el-color-picker v-on:active-change="colorChanged($event)" show-alpha :predefine="predefine" v-model="color"></el-color-picker>
  </div>
</template>

<script>


function invert(rgb) {
  if (!rgb) {
    return null;
  }

  const rgbValue = rgb.replace("rgb(", "").replace(")", "");

  const rgbValueArray = rgbValue.split(",");

  const grayLevel = rgbValueArray[0] * 0.299 + rgbValueArray[1] * 0.587 + rgbValueArray[2] * 0.114;

  if (grayLevel >= 192) {
    return "black"
  } else {
    return "white"
  }


}


export default {
  name: "tag-with-color",
  props: {label: String, type: String},
  methods: {
    colorChanged($event) {
      this.color = $event;
    },
  },
  data() {
    return {
      color: 'rgb(102, 204, 255)',
      predefine: [
        "#00C821",
        "#9CD326",
        "#CAB641",
        "#FFCB00",
        "#784BD1",
        "#A25DDC",
        "#0086C0",
        "#579BFC",
        "#66CCFF",
        "#BB3354",
        "#E2445C",
        "#FF158A",
        "#FF5AC4",
        "#FF642E",
        "#FDAB3D",
        "#7F5347",
        "#C4C4C4",
        "#808080",
        "#333333"
      ]
    }
  },
  computed: {
    reversalColor: function() {
      return invert(this.color);
    }
  }
}
</script>

<style scoped>
  .tag-editor {
    display: inline-flex;
    margin: 0 10px;
  }

  /deep/ .el-color-picker__trigger {
    border-left: 0;
    padding: 0;
    margin-left: -6px;
    border-color: rgba(0,0,0,0);
  }

  /deep/ .el-color-picker__color {
    border: none;
  }

  /deep/ .el-color-picker__color-inner {
    height: 32px;
    margin-top: -1px;
    border-radius: 4px;
  }

  /deep/ .el-tag {
    color: white;
    border-right: 0;
    border-color: rgba(0,0,0,0);
  }

</style>