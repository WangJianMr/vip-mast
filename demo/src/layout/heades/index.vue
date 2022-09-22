<template>
  <div class="heades">
    <router-link to="/" class="title-df">
      <img src="http://vue.mengxuegu.com/img/logo.7156be27.png" alt="">
      <span class="titleFs">积云学生管理系统</span>
    </router-link>
    <el-dropdown @command="changeAdmin">
      <span class="el-dropdown-link titleFs">
        {{title}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="modifiPass">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-fold" command="loginTou">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getRemoveTokenInfo } from "../../utils/auth";
import axios from "axios";
export default {
  data() {
    return {};
  },
  computed: {
    title() {
      console.log(this.$store.state.userInfo.name);
      return this.$store.state.userInfo.name;
    },
  },
  methods: {
    changeAdmin(val) {
      console.log(val);
      if (val == "loginTou") {
        this.loginOut();
      }
    },
    //退出
    async loginOut() {
      const logouts = await this.$store.dispatch("handleLogout");
      console.log(logouts);
      if (!logouts.flag) return;
      setTimeout(() => {
        this.$router.push("/login");
        this.$message.success("退出成功");
      }, 500);
    },
  },
};
</script>

<style  scoped>
.heades {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.title-df {
  display: flex;
  align-items: center;
}
img {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.titleFs {
  color: #fff;
}
</style>