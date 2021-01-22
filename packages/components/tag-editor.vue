<template>
  <div>
    <tag-with-color
        v-for="item in dynamicTags"
        :key="item.label"
        :label="item.label"
        :type="item.type"
        :color="item.color">
    </tag-with-color>
    <el-color-picker v-model="color1"></el-color-picker>
    <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
import TagWithColor from "@components/tag-with-color";
export default {
  name: 'tag-editor',
  components: {TagWithColor},
  data() {
    return {
      dynamicTags: [
      { type: '', label: '标签一' },
      { type: 'success', label: '标签二' },
      { type: 'info', label: '标签三' },
      { type: 'danger', label: '标签四' },
      { type: 'warning', label: '标签五' }
    ],
      inputVisible: false,
      inputValue: '',
      color1: '#409EFF'
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push({ type: 'warning', label: inputValue });
      }
      this.inputVisible = false;
      this.inputValue = '';
      this.$emit("input", this.dynamicTags)
    }
  }
}
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

