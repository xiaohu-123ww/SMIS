<template>
  <div>
    <el-upload
      slot="append"
      ref="upload"
      class="uploadbox"
      name="file"
      :show-file-list="true"
      :multiple="false"
      action="upload"
      accept=".pdf,.doc,.docx"
      :on-change="onChange"
      :auto-upload="false"
      :file-list="fileList1"
      :on-remove="handleFileRemove"
      :on-preview="downItem"
    >
      <!-- class="uploadbtn" -->
      <el-button
        type="primary"
        icon="el-icon-sell"
        style="
          width: 200px;
          font-size: 18px;
          height: 40px;
          background-color: #dadbdf;
          margin: 0;
        "
        >上传简历</el-button
      >
    </el-upload>
  </div>
</template>
<script>
import { planInsert, getResumeCv, getCv, getCvDelete } from '@/api/my/resume'
import { constTime } from '@/utils/ruoyi'
import { getToken } from '@/utils/auth'
export default {
  data () {
    return {
      productVO: {
        instruction: ''
      },
      elForm: '',
      fileList1: [],
      cvfile: ''
    }
  },
  computed: {
  },
  mounted () {
    this.getFiles()
  },
  created () {
    this.getFiles()
  },
  methods: {
    async onChange (file, fileList) {
      // 校验格式
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'doc'
      const extension2 = testmsg === 'pdf'
      const extension3 = testmsg === 'docx'
      if (!extension && !extension2 && !extension3) {
        this.$message({
          message: '上传文件只能是 word、pdf格式!',
          type: 'warning'
        })
        this.dialogVisibleFile = false
        this.fileList = []
      } else {
        if (fileList.length > 1) {
          fileList.splice(0, 1)
        }
        this.fileList1 = fileList
        // console.log('文', this.fileList1)

        this.productVO.instruction = file.name
        this.productVO.instructionFile = file.raw
        // 上传文件时需要用到二进制，所以这里文件取值为file.raw
        console.log(this.productVO.instruction)
        console.log(file)
        const formData = new FormData()
        formData.append('files', file.raw)
        const res = await planInsert(formData)
        console.log('res', res)
        if (res.code === 200) {
          this.$message.success('上传成功')
          const res = await getResumeCv()
          console.log('res2', res)
          this.$message.success('解析成功')
          const res1 = await getCv(formData)
          console.log('文件地址', res1)
          this.cvfile = res1.data.path
        }
      }
    },
    // 删除
    async handleFileRemove () {
      const res = await getCvDelete()
      console.log('删除', res)
      this.$message.success('删除简历成功')
    },
    downItem () {
      if (this.cvfile !== '') {
        var downloadPath = `http://1.13.8.165/loc/${this.cvfile}`
        var downloadLink = document.createElement('a')
        downloadLink.style.display = 'none' // 使其隐藏
        downloadLink.href = downloadPath
        downloadLink.download = ''
        downloadLink.click()
        // document.body.removeChild(downloadLink)
      } else {
        this.$message.success('暂无简历可下载')
      }
    },
    async getFiles () {
      const res1 = await getCv()
      console.log('文件地址', res1, this.fileList1)
      this.cvfile = res1.data.path
      this.fileList1 = [{ name: res1.data.name, url: `http://1.13.8.165/loc/${res1.data.path}` }]
    }

  }
}
</script>
<style scoped lang="scss">
.uploadMain {
  margin-top: 50px;
}
::v-deep .el-input-group__append,
.el-input-group__prepend {
  background-color: #fff !important;
  // color: #909399;
  // vertical-align: middle;
  // display: table-cell;
  // position: relative;
  // border: 1px solid #DCDFE6;
  // border-radius: 4px;
  // padding: 0 20px;
  // width: 1px;
  // white-space: nowrap;
}
.inputDeep >>> .el-input__inner {
  border: 0;
}
/* 如果你的 el-input type 设置成textarea ，就要用这个了 */
.inputDeep >>> .el-textarea__inner {
  border: 0;
  resize: none; /* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
}
::v-deep .el-input-group__append {
  border-top: 1px solid #dadbdf;
  border-bottom: 0;
  border-right: 0;
}
::v-deep a.el-upload-list__item-name {
  width: 200px;
  height: 40px;
  // background-color: pink;
}

::v-deep el-button--primary:hover,
.el-button--primary:focus {
  background: #fff;
}

::v-deep .el-button--primary {
  color: #ffffff;
  background-color: #fff;
  border-color: #fff;
}

::v-deep .el-upload.el-upload--text {
  margin: 60px 0 20px 60px;
}
::v-deep li.el-upload-list__item.is-ready {
  height: 40px;
  margin-left: 60px;
  line-height: 40px;
}
::v-deep li.el-upload-list__item.is-success {
  margin-left: 60px;
}
</style>
