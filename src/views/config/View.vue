<template>
  <div>
    <el-card>
      <el-table :data="tableData">
        <el-table-column label="文件ID" prop="file_id"> </el-table-column>
        <el-table-column label="文件名" prop="filename"></el-table-column>
        <el-table-column label="文件大小" prop="filesize"></el-table-column>
        <el-table-column label="文件描述" prop="desc"></el-table-column>
        <el-table-column label="上传者" prop="uploader"></el-table-column>
        <el-table-column label="上传时间" prop="created_at"></el-table-column>
        <el-table-column label="使用情况">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.is_use" type="success">使用中</el-tag>
            <el-tag v-if="!scope.row.is_use" type="info">未使用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-if="!scope.row.is_use"
              type="primary"
              @click="onUseClick(scope.row.file_id)"
              >使用</el-button
            >
            <el-button
              size="mini"
              v-if="scope.row.is_use"
              type="primary"
              disabled
              >使用中</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="configPaginate.total"
        :page-size="configPaginate.per_page"
        :current-page.sync="configPaginate.current_page"
        @current-change="getConfigData"
      >
      </el-pagination>
    </el-card>
    <el-card header="操作记录">
      <el-table :data="taskData">
        <el-table-column label="任务ID" prop="id"></el-table-column>
        <el-table-column label="操作者" prop="operator"></el-table-column>
        <el-table-column label="创建时间" prop="created_at"></el-table-column>
        <el-table-column label="更新时间" prop="updated_at"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" type="primary">已触发</el-tag>
            <el-tag v-if="scope.row.status == 1" type="success">成功</el-tag>
            <el-tag v-if="scope.row.status == 2" type="danger">失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="版本" prop="type"></el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="taskPaginate.total"
        :page-size="taskPaginate.per_page"
        :current-page.sync="taskPaginate.current_page"
        @current-change="getTaskData"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ConfigView",
  data() {
    return {
      filename: "",
      tableData: [],
      taskData: [],
      configPaginate: {
        total: 0,
        per_page: 10,
        current_page: 1,
      },
      taskPaginate: {
        total: 0,
        per_page: 10,
        current_page: 1,
      },
    };
  },
  mounted() {
    this.filename = this.$route.params.filename;
    this.getConfigData();
    this.getTaskData();
  },
  methods: {
    getConfigData: function () {
      this.$axios
        .get(
          `/api/v1/bfiles/${this.filename}?offset=${
            (this.configPaginate.current_page - 1) *
            this.configPaginate.per_page
          }&limit=10`
        )
        .then((res) => {
          if (res.data.errcode == 200) {
            console.info(res.data);
            this.tableData = res.data.data.data;
            this.configPaginate.total = res.data.data.total;
          }
        });
    },
    getTaskData: function () {
      this.$axios
        .get(
          `/api/v1/tasks?key=${this.filename}&offset=${
            (this.taskPaginate.current_page - 1) * this.taskPaginate.per_page
          }&limit=10`
        )
        .then((res) => {
          if (res.data.errcode == 200) {
            this.taskData = res.data.data.data;
            this.taskPaginate.total = res.data.data.total;
          }
        });
    },
    onUseClick: function (id) {
      this.$axios.post(`/api/v1/rollback/${id}`).then(() => {
        this.getConfigData();
        this.getTaskData();
      });
    },
  },
};
</script>

<style></style>
