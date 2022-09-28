<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialog" width="30%">
      <template v-if="flagNum===0">
        <slot name="inp"></slot>
        <slot name="table"></slot>
      </template>
      <template v-if="flagNum===1">
        <slot name="forms" ref="ss"></slot>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    di: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "添加商品",
    },
    flagNum: {
      type: Number,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.di;
      },
      set(val) {
        console.log(val);
        this.$emit("update:di", val);
      },
    },
  },
  methods: {
    handleOk() {
      this.$emit("handleOk");
    },
    resetForm() {
      this.$emit("resetForm");
    },
  },
};
</script>

<style>
</style>