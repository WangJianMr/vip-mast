<template>
  <div>
    <el-card  v-if="noHome" :class="noHome?'mb':''">
      <el-breadcrumb>
        <el-breadcrumb-item :to="handlemeta.path">{{handlemeta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    handlemeta() {
      return {
        title: this.$route.meta.title,
        path: this.$route.path,
      };
    },
    noHome(){
      return !(this.$route.path==='/home')
    },
  },
  created() {},
};
</script>

<style  scoped>
.el-card {
  padding: 20px;
  font-size: 16px;
}
::v-deep .el-card__body {
  padding: 0 !important;
}
.mb{
  margin-bottom: 20px;
}
::v-deep .el-breadcrumb__inner{
  padding: 0 10px;
  border-left: 3px solid red;
}
</style>