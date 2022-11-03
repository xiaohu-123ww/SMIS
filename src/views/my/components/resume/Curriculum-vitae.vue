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
            :http-request="handleUploadForm"
            :show-file-list="false"
            :multiple="false"
            action="upload"
            :on-change="onChange"
            :auto-upload="true"
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
import { planInsert } from '@/api/my/resume'
import { constTime } from '@/utils/ruoyi'
import { getToken } from '@/utils/auth'
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
    async onChange (file) {
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
      // const formData = new FormData()
      // formData.append('files', file)
      // const res = await planInsert(formData)
      // console.log('res', res)
      console.log(getToken)
    },
    async handleUploadForm (param) {
      var formData = new FormData()
      // 在formData中加入我们需要的参数
      formData.append('files', param.file)
      await axios.post(
        'http://1.13.8.165/cv/upload_cv/v1.0.0/',
        formData,
        {
          'headers': {
            'Authorization': localStorage.getItem(Admin - Token),
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          console.log(res)
        })
    }
  }
}
</script>
<style scoped lang="scss">
.uploadMain {
  margin-top: 50px;
}
</style>
