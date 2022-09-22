<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Heades />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main>
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Heades from "./heades/";
import Aside from "./aside";
import Main from "./main";
import {getUserInfo} from '../utils/auth'
export default {
  name: "layout",
  components: {
    Heades,
    Aside,
    Main,
  },
  watch: {
    $route: {
      handler() {
        // let info =this.$store.getters.SET_INFO
        let info = localStorage.getItem('userInfo')
        // let info = getUserInfo()
        // info = typeof info === "object" ? JSON.stringify(info) : info;
        console.log(info);
        if (info === null) {
          this.$store.dispatch("handleInfo");
        }
      },
    },
  },
};
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
.el-header {
  height: 50px !important;
  background-color: #2d3a4b;
  padding: 0;
}

.el-aside {
  background-color: #545c64;
  color: #fff;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
}

.el-container {
  height: 100%;
}
</style>