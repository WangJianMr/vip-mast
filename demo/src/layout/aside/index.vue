<template>
  <div class="aside">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/member">
        <i class="el-icon-setting"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
       <el-menu-item index="/supplier">
        <i class="el-icon-menu"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
      <el-menu-item index="/commodity">
        <i class="el-icon-setting"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/staff">
        <i class="el-icon-setting"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.path);
  },
};
</script>

<style  scoped>
.menu{
  width: 100%;
}
</style>