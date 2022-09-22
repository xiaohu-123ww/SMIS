<template>
  <div>
    <el-form ref="rf" :model="productVO" label-width="80px">
      <el-form-item class="uploadMain" prop="instruction">
        <el-input
          v-model="productVO.instruction"
          class="uploadInput"
          style="width: 10px"
          :disabled="false"
        >
          <el-upload
            slot="append"
            ref="upload"
            class="uploadbox"
            name="file"
            accept=".pdf"
            :show-file-list="false"
            :multiple="false"
            mulitiple为true
            action="upload"
            :on-change="onChange"
            :auto-upload="false"
          >
            <!-- class="uploadbtn" -->
            <el-button
              type="primary"
              icon="el-icon-sell"
              style="width: 200px; font-size: 18px"
              >上传简历</el-button
            >
          </el-upload>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      productVO: {
        instruction: ''
      },
      elForm: ''
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    onChange (file) {
      // 校验格式
      if (['application/pdf'].indexOf(file.raw.type) == -1) {
        this.$message.error('请上传正确的pdf格式')
        return false
      }
      this.productVO.instruction = file.name
      this.productVO.instructionFile = file.raw
      // 上传文件时需要用到二进制，所以这里文件取值为file.raw
      console.log(this.productVO.instruction)
      console.log(file)
      const formData = new FormData()
      //  formData.append('instruction', this.productVO.instruction);
      //  formData.append('instructionFile',this.productVO.instructionFile);

      //  //调用接口
      //  this.$post('/product/create',formData,{
      //      baseURL:'/',
      //      header:{isloading: true,'Content-Type': 'multipart/form-data'}).then()
    }
  }
}
</script>
<style scoped lang="scss">
.uploadMain {
  margin-top: 50px;
}
</style>
