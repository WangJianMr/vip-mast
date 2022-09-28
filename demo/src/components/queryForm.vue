<template>
  <div>
    <el-form :inline="true" :model="value" ref="form">
      <template v-for="(item,index) in quer">
        <el-form-item v-if="item.type==='input'" :prop="item.prop">
          <el-input v-model="value[item.prop]" :placeholder="item.placeholder"></el-input>
        </el-form-item>
        <el-form-item v-if="item.type==='select'" :prop="item.prop">
          <el-select v-model="value[item.prop]" :placeholder="item.placeholder">
            <el-option v-for="(ele,i) in item.children" :key="i" :label="ele.name" :value="ele.num" :placeholder="item.placeholder"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="item.type==='date'" :prop="item.prop">
          <el-date-picker value-format="yyyy-MM-dd" v-model="value[item.prop]" :type="item.type" :placeholder="item.placeholder"></el-date-picker>
        </el-form-item>
         <el-form-item v-if="item.type==='slot'" :prop="item.prop">
         <slot :name="item.slot_name"></slot>
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
      defaut: () => {},
    },
    quer: {
      type: Array,
      defaut: () => {},
    },
  },
  methods: {
    handelResetst(){
        this.$refs['form'].resetFields()
    },
  },
};
</script>

<style>
.el-select {
  width: 120px;
}
</style>