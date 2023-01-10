<template>
  <div>
    <el-dialog
      :visible.sync="add"
      width="30%"
      :before-close="handleClose"
      style="font-weight: 700"
      title="意见反馈"
    >
      <div>
        <el-form ref="form" :model="form" :rules="rules" style="height: 100%">
          <el-form-item label="" prop="level">
            <div style="height: 30px">
              <span style="color: black">反馈类型</span>
              <span style="color: red">* </span>
            </div>

            <el-radio-group
              v-for="item in feedbackType"
              :key="item.id"
              v-model="form.level"
              style="margin-right: 30px"
            >
              <el-radio :label="item.id">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" prop="texts">
            <div>
              <el-input
                v-model="form.texts"
                type="textarea"
                placeholder="请输入6个子以上的问题描述"
                maxlength="500"
                show-word-limit
              ></el-input>
            </div>
          </el-form-item>
          <el-upload
            action="#"
            :before-upload="handleInfoPic"
            :on-success="handleSuccess"
            :http-request="testUpload"
            list-type="picture-card"
            :file-list="showPicList"
            :on-exceed="handleExceed"
            :limit="5"
            accept=".png,.jpeg,.jpg"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <!-- <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                  ><i class="el-icon-zoom-in"
                /></span> -->
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                  ><i class="el-icon-delete"
                /></span>
              </span>
            </div>
          </el-upload>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog> -->
          <el-form-item label="" prop="number">
            <div style="height: 30px; margin-bottom: 10px">
              <span style="color: black">联系方式</span>
              <span style="color: red">* </span>
            </div>

            <el-input
              v-model="form.number"
              placeholder="请输入手机号方便联系"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button class="submit" @click="submit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getFirm, getImageDelete, getForm } from '@/api/dia'
export default {
  props: {
    add: {
      type: Boolean
    }
  },

  data () {
    const checkPhone = (rule, value, callback) => {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入11位手机号'))
      } else {
        callback()
      }
    }
    return {

      list: {
        imgs: []
      },
      img: {
        imgs: []
      },
      images: [],
      showPicList: [],
      picName: '',
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      infopics: [], // 所需上传图片组 => 存储base64
      form: {
        // 类型
        level: 1,
        // text  反馈意见
        texts: '',
        // number  联系方式
        number: '',
        platform: 1,
        imgs: []
        // platform    反馈端
      },
      feedbackType: [
        {
          id: 1,
          name: '业务咨询'
        },
        {
          id: 2,
          name: '产品建议'
        },
        {
          id: 3,
          name: '功能故障'
        },
        {
          id: 4,
          name: '其他'
        }
      ],
      rules: {
        level: [{ required: true, message: '请选择反馈类型', trigger: 'change' }],
        texts: [{ required: true, message: '请填写活反馈意见', trigger: 'blur' }],
        number: [
          { type: 'number', validator: checkPhone, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }

    }
  },
  computed: {
    phoneNumberStyle () {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(this.form.number)) {
        return false
      }
      return true
    }
  },
  mounted () {

  },
  methods: {
    async handleClose () {
      this.list.imgs = this.form.imgs
      const res = await getImageDelete(this.list)
      console.log('移除', res, this.form.imgs)
      this.$refs.form.clearValidate()
      // this.$message.success('移除图片成功')
      this.$emit('handler', false)
      this.form.imgs = []
      this.form.level = 1
      this.form.texts = ''
      this.form.number = ''
      this.showPicList = []
    },
    // 提交
    submit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          console.log(this.form)
          const res = await getForm(this.form)
          console.log('res', res)
          if (res.code === 200) {
            this.$message.success('反馈成功')
            this.$emit('handler', false)
            this.form.imgs = []
            this.form.level = 1
            this.form.texts = ''
            this.form.number = ''
            this.showPicList = []
            // this.$refs.form.clearValidate('number')
          } else {
            this.$message.error(res.data.msg)
          }
        } else {
          // this.$refs.form.clearValidate()
        }
      })
    },
    // 0.3.2 提交请求
    handleInfoPic (file) {
      const isJPG = file.type === 'image/jpeg'
      const isJPG2 = file.type === 'image/jpg'
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isJPG2 && !isPNG) this.$message.error('请上传格式为 png, jpg, jpeg 的图片！')
      this.picName = file.name
      console.log('file', file)
      return isJPG || isJPG2 || isPNG
    },
    // 0.3.2 提交请求
    async testUpload (file) {
      var formData = new FormData()
      formData.append('image', file.file)
      console.log('formData', formData)
      const res = await getFirm(formData)
      console.log('res', res)
      if (res.code === 200) {
        this.$message.success('图片选择成功')
        const image = res.data.data.image
        this.form.imgs.push(image)

        // this.form.imags = Array.from(new Set(this.images))
        console.log(this.form.imags)
      } else {
        // this.$refs.form.clearValidate()

        this.message.error('选择失败')
      }
    },
    // 0.3.3 图片上传成功加入数据
    handleSuccess (response, file, fileList) {
      console.log(response, file, fileList)
      this.showPicList = fileList
      const reader = new FileReader()
      reader.readAsDataURL(file.raw) // 图片文件转 base64
      reader.onload = () => {
        this.infopics.push({
          name: this.picName,
          url: reader.result
        })
      }
    },
    // 0.3.4 图片移除操作
    async handleRemove (file) {
      console.log(file)
      const indexShow = this.showPicList.findIndex((el) => el.name === file.name)
      this.showPicList = this.showPicList
        .slice(0, indexShow)
        .concat(this.showPicList.slice(indexShow + 1, this.showPicList.length))
      const index = this.infopics.findIndex((el) => el.name === file.name)
      this.infopics = this.infopics
        .slice(0, index)
        .concat(this.infopics.slice(index + 1, this.infopics.length))
      console.log('12123', file)
      // const arr = this.fileList.findIndex(item => item === file.uid)
      console.log(this.form.imgs[indexShow])
      const img = this.form.imgs[indexShow]
      this.form.imgs.splice(indexShow, 1)
      console.log(this.form.imags)

      this.img.imgs[0] = img + ''
      console.log('123', this.img)
      const res = await getImageDelete(this.img)
      console.log('移除', res, this.form.imags)
      this.$message.success('移除图片成功')
    },

    handleExceed (file, fileList) {
      // console.log(file, fileList);
      this.$message.error('上传失败，限制上传数量5张图片！')
    }
  }
}
</script>
<style scoped lang="scss">
.submit {
  width: 100%;
  background-color: rgb(37, 110, 253);
  color: #fff;
}
// ::v-deep element.style {
//   margin-left: 0px !important;
//   margin-top: 20px;
// }
::v-deep .el-dialog__header {
  height: 60px;
  padding: 30px;
}
::v-deep .el-dialog__body {
  padding: 30px;
}
::v-deep .el-textarea__inner {
  border-color: #c0c4cc;
  height: 100px;
}
::v-deep .el-textarea {
  /*滚动条整体部分*/
  .el-textarea__inner::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  /*滚动条的轨道*/
  .el-textarea__inner::-webkit-scrollbar-track {
    background-color: #ffffff;
  }
  /*滚动条里面的小方块，能向上向下移动*/
  .el-textarea__inner::-webkit-scrollbar-thumb {
    background-color: rgba(144, 147, 153, 0.3);
    border-radius: 5px;
    border: 1px solid #f1f1f1;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }
  .el-textarea__inner::-webkit-scrollbar-thumb:hover {
    background-color: rgba(144, 147, 153, 0.3);
  }
  .el-textarea__inner::-webkit-scrollbar-thumb:active {
    background-color: rgba(144, 147, 153, 0.3);
  }
  /*边角，即两个滚动条的交汇处*/
  .el-textarea__inner::-webkit-scrollbar-corner {
    background-color: #ffffff;
  }
}
::v-deep textarea.el-textarea__inner {
  border: 0 solid transparent;
}
::v-deep .el-textarea {
  height: 130px;
  border: 1px solid #c0c4cc;
  border-radius: 10px;
  overflow: hidden;
}
::v-deep .el-textarea__inner {
  resize: none;
}
::v-deep .el-textarea .el-input__count {
  bottom: 0px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item {
  width: 90px;
  height: 90px;
}
::v-deep .el-upload--picture-card {
  width: 90px;
  height: 90px;
  line-height: 100px;
}
::v-deep .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 90px;
  height: 90px;
}
</style>
