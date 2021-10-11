<template>
  <div>
    <el-card>
      <el-form ref="form" v-model="user" style="width: 600px" v-if="pageType">
        <el-form-item label="用户名">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="['add', 'change'].includes(pageType)">
          <el-input show-password v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" v-if="['change'].includes(pageType)">
          <el-input show-password v-model="user.newPassword"></el-input>
        </el-form-item>
        <el-form-item
          label="重新输入密码"
          v-if="['add', 'change'].includes(pageType)"
        >
          <el-input show-password v-model="user.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item label="角色" v-if="['add', 'edit'].includes(pageType)">
          <el-select v-model="user.roleID" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.role_name"
              :label="item.role_name"
              :value="item.role_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmitBtnClick" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      pageType: "add",
      uid: 0,
      user: {
        username: "",
        password: "",
        roleID: "",
        newPassword: "",
        confirmPassword: "",
      },
      roles: [],
    };
  },
  mounted() {
    this.pageType = this.$route.query.type;
    this.uid = this.$route.params.uid;
    this.getRoles();
    if (this.uid != "0" && this.uid != "") this.getUser();
  },
  methods: {
    onSubmitBtnClick() {
      if (this.pageType === "add") {
        this.addUser();
      } else if (this.pageType === "edit") {
        this.updateUser();
      }
    },
    getRoles() {
      this.$axios.get("/api/v1/roles").then((res) => {
        this.roles = res.data.data.roles;
      });
    },
    getUser() {
      this.$axios.get(`/api/v1/user/${this.uid}`).then((res) => {
        this.user.username = res.data.data.username;
        this.user.roleID = res.data.data.role_id;
      });
    },
    addUser() {
      if (
        this.user.username == "" ||
        this.user.password == "" ||
        this.user.confirmPassword == ""
      ) {
        this.$message.error("请检查输入！");
        return;
      }
      if (this.user.password !== this.user.confirmPassword) {
        this.$message.error("两次输入的密码不一致！");
        return;
      }
      this.$axios
        .post("/api/v1/user", {
          username: this.user.username,
          password: this.user.password,
          role_id: this.user.roleID,
        })
        .then(() => {
          this.$message.success("创建成功！");
          this.$router.push("/users");
        });
    },
    updateUser() {
      if (this.user.username == "" || this.user.roleID == "") {
        this.$message.error("请检查输入！");
        return;
      }

      this.$axios
        .put(`/api/v1/user/${this.uid}`, {
          username: this.user.username,
          role_id: this.user.roleID,
        })
        .then(() => {
          this.$message.success("修改成功！");
          this.$router.push("/users");
        });
    },
  },
};
</script>

<style>
</style>