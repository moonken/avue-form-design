<template>
  <div style="display: inline-block;">
    <el-tag
        :key="label"
        :type="type"
        :style="{backgroundColor: color, 'color': reversalColor}">
      {{ label }}
    </el-tag>
    <el-color-picker  show-alpha :predefine="predefine" v-model="color"></el-color-picker>
  </div>
</template>

<script>

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function invert(rgb) {
  if (!rgb) {
    return null;
  }

  rgb = [].slice.call(arguments).join(",").replace(/rgb\(|\)|rgba\(|\)|\s/gi, '').split(',');
  for (var i = 0; i < rgb.length; i++) rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
}


export default {
  name: "tag-with-color",
  props: {label: String, type: String, color: String},
  data() {
    return {
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

</style>