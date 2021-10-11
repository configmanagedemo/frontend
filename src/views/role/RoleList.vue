<template>
  <div>
    <el-card>
      <el-table
        :data="tableData"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '5px' }"
      >
        <el-table-column label="ID" prop="role_id"> </el-table-column>
        <el-table-column label="角色名" prop="role_name"> </el-table-column>
        <el-table-column label="角色描述" prop="role_desc"> </el-table-column>
        <el-table-column label="创建时间" prop="created_at"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="onViewClick(scope.row.role_id)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RoleList",
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      this.$axios.get(`/api/v1/roles`).then((res) => {
        this.tableData = res.data.data.roles;
        this.total = res.data.data.total;
      });
    },
    onViewClick(role_id) {
      this.$router.push(`/role/${role_id}`);
    },
  },
};
</script>

<style></style>