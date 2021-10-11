<template>
  <div>
    <el-card>
      <el-form ref="form" v-model="form" style="width: 400px">
        <el-form-item label="更新内容">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            ref="upload"
            action="/api/v1/bfile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            accept=".b"
            :multiple="true"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取上传文件</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传.b文件
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="success" @click="submitUpload"
            >上传到服务器</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ConfigUpload",
  data() {
    return {
      form: {
        desc: ""
      },
      fileList: []
    };
  },
  computed: {
    uploadFiles() {
      return this.$refs.upload.uploadFiles;
    }
  },
  methods: {
    upload: function(file) {
      let formData = new FormData();
      formData.append("desc", this.form.desc);
      formData.append("file", file.raw);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      this.$axios.post("/api/v1/bfile", formData, config).then(res => {
        if (res.data.errcode == 200) {
          file.status = "success";
          if (
            this.$refs.upload.uploadFiles.every(file => {
              return file.status == "success";
            })
          ) {
            this.$message.success("上传成功");
          }
        }
      });
    },
    submitUpload: function() {
      if (this.form.desc == "") {
        this.$message.error("请填写更新内容");
        return;
      }
      const upload = this.$refs.upload;
      console.info(upload);
      upload.uploadFiles
        .filter(file => {
          return file.status == "ready";
        })
        .forEach(file => {
          this.upload(file);
        });
    }
  }
};
</script>

<style></style>
