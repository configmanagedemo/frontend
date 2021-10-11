<template>
  <div>
    <el-card>
      <el-button @click="onUploadBFileClick">上传.b文件</el-button>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '5px' }"
      >
        <el-table-column label="ID">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="表名">
          <template slot-scope="scope">{{ scope.row }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="onViewClick(scope)"
              >查看</el-button
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
  name: "Config",
  data() {
    return {
      data: [],
      total: 0,
      per_page: 10,
      current_page: 1,
    };
  },
  computed: {
    tableData() {
      return this.data.slice(
        (this.current_page - 1) * this.per_page,
        this.current_page * this.per_page
      );
    },
  },
  mounted() {
    this.$axios.get("/api/v1/bfiles").then((res) => {
      if (res.data.errcode == 200) {
        this.data = res.data.data.bfilename_list;
        this.total = res.data.data.bfilename_list.length;
      }
    });
  },
  methods: {
    onViewClick: function (scope) {
      this.$router.push("/config/" + scope.row);
    },
    onUploadBFileClick: function () {
      this.$router.push("/config/upload");
    },
  },
};
</script>

<style lang="less" scoped>
</style>
