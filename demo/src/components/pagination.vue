<template>
  <div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" 
    :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: Number,
    pageSizes: Array,
    pageSize: Number,
    total: Number,
  },
  methods: {
    handleSizeChange(val) {
      console.log(val, "val");
      this.$emit('handleSizeChange',val)
    },
    handleCurrentChange(val) {
      console.log(val, "val");
      this.$emit('handleCurrentChange',val)
    },
  },
};
</script>

<style>
</style>