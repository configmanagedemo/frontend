<template>
  <el-container>
    <el-header>
      <el-menu mode="horizontal">
        <el-menu-item index="1">配置管理平台</el-menu-item>
        <el-menu-item index="4" style="float: right">
          <span @click.stop="onLoginClick" v-if="!isLogin">登录</span>
          <el-dropdown v-if="isLogin">
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                ><span @click.stop="onLogoutClick">登出</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu :router="true">
          <el-menu-item index="1" :route="{ name: 'Config' }">
            <i class="el-icon-document"></i>
            <span slot="title">配置管理</span>
          </el-menu-item>
          <el-menu-item
            index="2"
            :route="{ name: 'UserList' }"
            v-if="canShowUserList"
          >
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item
            index="3"
            :route="{ name: 'RoleList' }"
            v-if="canShowRoleList"
          >
            <i class="el-icon-user"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
        </el-menu></el-aside
      >
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    canShowUserList() {
      return this.$store.state.roleID == 1;
    },
    canShowRoleList() {
      return this.$store.state.roleID == 1;
    },
  },
  mounted() {
    this.$axios.get("/api/v1/my").then((res) => {
      console.info(res);
      this.$store.commit("setUserInfo", {
        username: res.data.data.username,
        roleID: res.data.data.role_id,
      });
      this.$store.commit("setLogin");
    });
  },
  methods: {
    onLoginClick: function () {
      this.$router.push("/login");
    },
    onLogoutClick: function () {
      this.$axios.get("/api/v1/logout").then((res) => {
        if (res.data.errcode == 200) {
          this.$store.commit("setLogout");
          this.$router.push("/login");
        }
      });
    },
  },
};
</script>

<style></style>
