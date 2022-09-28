<template>
  <div>
    <el-form :model="value" label-width="80px" :rules="rules" ref="form">
      <template v-for="item in dinForm">
        <el-form-item :label="item.label" :prop="item.prop">
          <el-input v-model="value[item.prop]"></el-input>
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
    dinForm: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    refdd() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
            this.$emit('vals',valid)
        }else{
            this.$emit('vals',valid)
        }
      });
    },
    delsd(){
        this.$refs['form'].resetFields()
    },
  },
};
</script>

<style>
</style>