<template>
  <div class="login">
    <div class="box">
      <h2>积云会员管理系统</h2>
      <el-form ref="form" :rules="rules" :model="form" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model.trim="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginGo('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },

  methods: {
    loginGo() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        this.handleLogin();
      });
    },
    //登录
    async handleLogin() {
      let token = await this.$store.dispatch("handleLOgin", this.form);
      if (!token) return;
      let info = await this.$store.dispatch("handleInfo");
      if (!info) return;

      this.$router.push("/");
    },

    // loginGo() {
    //   this.$refs["form"].validate((valid) => {
    //     if (!valid) return;
    //     this.hanlendLogin();
    //   });
    // },
    // async hanlendLogin() {
    //   try {
    //     await login(this.form).then((res) => {
    //       this.$store.dispatch("handleUseToken", res.data.token);
    //      this.hanlenUserInfo()
    //     });
    //   } catch (error) {
    //   }
    // },

    // async hanlenUserInfo(){
    //     try {
    //         await userInfoGo().then(res=>{
    //             console.log(res);
    //             this.$store.dispatch('handleUseInfo',res.data.name)
    //         })
    //     } catch (error) {

    //     }
    // },
  },
  created() {},
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-image: url("http://vue.mengxuegu.com/img/login.b665435f.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.box {
  width: 406px;
  border-radius: 25px;
  background-color: hsla(0, 0%, 100%, 0.8);
  margin: 160px auto;
  padding: 25px;
}
h2 {
  text-align: center;
}
</style>