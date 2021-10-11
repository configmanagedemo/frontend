<template>
  <div>
    <el-card>
      <el-button @click="onUserAddClick">新增用户</el-button>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '5px' }"
      >
        <el-table-column label="ID" prop="id"> </el-table-column>
        <el-table-column label="用户名" prop="username"> </el-table-column>
        <el-table-column label="角色" prop="role"> </el-table-column>
        <el-table-column label="创建时间" prop="created_at"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="onEditClick(scope.row.uid)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="onDeleteClick(scope.row.uid)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :page-size="per_page"
        :current-page.sync="current_page"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      tableData: [],
      total: 0,
      per_page: 10,
      current_page: 1,
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$axios
        .get(
          `/api/v1/users?offset=${
            this.per_page * (this.current_page - 1)
          }&limit=${this.per_page}`
        )
        .then((res) => {
          console.info(res);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        });
    },
    onEditClick(uid) {
      this.$router.push(`/user/${uid}?type=edit`);
    },
    onDeleteClick(uid) {
      this.$axios.delete(`/api/v1/user/${uid}`).then(() => {
        this.$message.success("删除成功！");
        this.getUserList();
      });
    },
    onUserAddClick() {
      this.$router.push("/user/0?type=add");
    },
  },
};
</script>

<style>
</style>