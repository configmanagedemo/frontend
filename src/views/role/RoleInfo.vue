<template>
  <div>
    <el-card>
      <el-table
        :data="tableData"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '5px' }"
      >
        <el-table-column label="ID" prop="role_id"> </el-table-column>
        <el-table-column label="权限标记" prop="flag"> </el-table-column>
        <el-table-column label="权限描述" prop="desc"> </el-table-column>
        <el-table-column label="资源" prop="resource"> </el-table-column>
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
    let role_id = this.$route.params.role_id;
    this.getRoleDetail(role_id);
  },
  methods: {
    getRoleDetail(id) {
      this.$axios.get(`/api/v1/role/${id}`).then((res) => {
        console.info(res);
        this.tableData = res.data.data.auth;
        this.tableData.forEach((dt) => {
          dt.role_id = id;
          dt.resource = JSON.stringify(dt.resource);
        });
      });
    },
  },
};
</script>

<style>
</style>