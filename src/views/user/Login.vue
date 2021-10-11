<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-header>
        <el-menu mode="horizontal">
          <el-menu-item index="1">配置管理平台</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="login">
        <el-card shadow="always" class="login-card">
          <div slot="header">
            <span>登录</span>
          </div>
          <el-form
            :model="form"
            ref="form"
            label-width="80px"
            :inline="false"
            size="normal"
          >
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="form.password"
                type="password"
                @keyup.enter.native="onLogin"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <span>&copy; 2020 Tencent</span>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onLogin: function () {
      console.info(this.form);
      this.$axios
        .post("/api/v1/login", {
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          if (res.data.errcode == 200) {
            this.$store.commit("setUserInfo", { username: this.form.username });
            this.$store.commit("setLogin");
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-card {
    width: 600px;
  }
}
</style>
