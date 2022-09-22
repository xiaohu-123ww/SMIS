<!-- eslint-disable no-undef -->
<template>
  <div v-if="show">
    123
    <div class="box">
      <el-form
        ref="rf"
        :model="list"
        :rules="rules"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="list.username" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="求职状态" prop="region">
          <el-select v-model="list.state" placeholder="请选择求职状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="list.sex" size="medium">
            <el-radio border label="男"></el-radio>
            <el-radio border label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前身份" prop="status">
          <el-radio-group v-model="list.school" size="medium">
            <el-radio border label="职场人"></el-radio>
            <el-radio border label="在校生"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleForm.date1"
                type="date"
                placeholder="出生日期"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="参加工作时间" required>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker
                v-model="ruleForm.date2"
                type="date"
                placeholder="参加工作时间"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="现居地" prop="address">
          <el-input v-model="ruleForm.address" style="width: 600px"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        ref="ruleForm"
        :model="list"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="联系方式" prop="photo">
          <el-input v-model="list.photo" style="width: 600px"></el-input>
          <el-button type="primary" style="margin-left: 20px" @click="addition"
            >绑定</el-button
          >
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="list.email" style="width: 600px"></el-input>
          <el-button
            type="primary"
            style="margin-left: 20px"
            @click="emailClick"
            >绑定</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
        <div class="upload">
          <el-upload
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            action="https://znzz.tech/user/edit_selfinfo/"
            class="avatar-uploader"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              style="
                width: 200px;
                height: 200px;
                position: absolute;
                border-radius: 100px;
                right: 50px;
              "
              class="avatar"
            />
            <img
              v-if="!imageUrl"
              :src="list.circleUrl"
              style="
                width: 200px;
                height: 200px;
                position: absolute;
                border-radius: 100px;
                right: 50px;
              "
              class="avatar"
            />
            <i class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
      </el-form>
    </div>
    <el-dialog title="修改信息" :visible.sync="isShow" width="30%">
      <div v-if="photoShow">
        <el-form ref="rf" :model="ruleForm" label-width="80px">
          <el-form-item label="手机号码">
            <el-input
              v-model="ruleForm.photo"
              placeholder="请输入手机号码"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input
              v-model="ruleForm.photoEm"
              placeholder="请输入验证码"
              style="width: 260px"
            ></el-input>
            <el-button type="primary" style="margin-left: 8px"
              >验证码</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div v-if="emialShow">
        <el-form ref="rf" :model="ruleForm" label-width="80px">
          <el-form-item label="邮箱">
            <el-input
              v-model="ruleForm.photo"
              placeholder="请输入邮箱"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input
              v-model="ruleForm.photoEm"
              placeholder="请输入验证码"
              style="width: 260px"
            ></el-input>
            <el-button type="primary" style="margin-left: 8px"
              >验证码</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { editUserdetails, getUservitae } from '@/api/user'
import disposeImg from '@/utils/disposeImg'
export default {
  props: {
    show: {
      type: Boolean
    },
    list: {
      type: Object
    }
  },
  data () {
    return {
      form: {

      },
      isShow: false,
      photoShow: false,
      emialShow: false,
      imageUrl: '',
      circleUrl: '',
      ruleForm: {
        date1: '',
        date2: '',
        address: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2到 10 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活求职状态', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ],
        date1: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写地址', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    submitForm () {
      this.$refs.rf.validate()
    },
    resetForm () {
      this.$emit('reset', false)
    },
    handleAvatarSuccess (res, file) {
      // console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw)
      // console.log(this.imageUrl);
    },
    beforeAvatarUpload (file) {
      this.upimages = window.URL.createObjectURL(file)
      // console.log();
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M == true) {
        // console.log(file);
        // 将文件转化为formdata数据上传
        const fd = new FormData()
        fd.append('type', '102')
        fd.append('name_avatar', file)
        // console.log(fd);
        editUserdetails(fd).then((rs) => {
          // console.log(rs);
        })
      }

      return isJPG && isLt2M
    },
    addition () {
      this.isShow = true
      this.photoShow = true
      this.emialShow = false
    },
    emailClick () {
      this.isShow = true
      this.emialShow = true
      this.photoShow = false
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  position: relative;
  // height: 270px;
  // background-color: goldenrod;
  border-bottom: 1px solid #e6e3e3;
}
.el-form {
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px solid black;
  border-radius: 25px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload {
  position: absolute;
  top: 20px;
  right: 50px;
  // background-color: red;
  border-radius: 100px;
  .el-upload {
    width: 300px;
    height: 300px;
    background-color: red;
  }
}
</style>
