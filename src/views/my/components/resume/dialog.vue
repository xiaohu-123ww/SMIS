<!-- eslint-disable no-undef -->
<template>
  <div v-if="show">
    <div class="box">
      <el-form
        ref="rf"
        :model="num"
        :rules="rules"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="num.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="求职状态" prop="status">
          <el-select v-model="num.status" placeholder="请选择求职状态">
            <el-option label="离职随时到岗" value="0"></el-option>
            <el-option label="在职-暂不考虑机会" value="1"></el-option>
            <el-option label="在职-考虑机会" value="2"></el-option>
            <el-option label="在职-月内到岗" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="num.sex" size="medium">
            <el-radio border label="男" value="1"></el-radio>
            <el-radio border label="女" value="0"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前身份" prop="identity">
          <el-radio-group v-model="num.identity" size="medium">
            <el-radio border label="职场人" value="0"></el-radio>
            <el-radio border label="在校生" value="1"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" required>
          <el-col :span="11">
            <el-form-item prop="date_of_birth">
              <el-date-picker
                v-model="num.date_of_birth"
                type="date"
                placeholder="出生日期"
                style="width: 100%"
                :picker-options="{
                  disabledDate: (time) => {
                    return time.getTime() > Date.now() - 3600 * 1000 * 24
                  }
                }"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="参加工作时间" required>
          <el-col :span="11">
            <el-form-item prop="job_start">
              <el-date-picker
                v-model="num.job_start"
                type="date"
                placeholder="参加工作时间"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form
          ref="ff"
          :model="provinceList"
          label-width="80px"
          style="margin-left: 30px"
          :rules="polist"
        >
          <div v-if="living">
            <el-form-item label="现居地" prop="province">
              <el-col :span="8">
                <el-form-item prop="province">
                  <el-select
                    v-model="provinceList.province"
                    placeholder="请选择省"
                  >
                    <el-option
                      v-for="item in city"
                      :key="item.key"
                      :label="item.name"
                      :value="item.name"
                      @click.native="provinceChange(item)"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="8">
                <el-form-item prop="city">
                  <el-select v-model="provinceList.city" placeholder="请选择市">
                    <el-option
                      v-for="item in cityList"
                      :key="item.key"
                      :label="item.name"
                      :value="item.name"
                      @click.native="cityChange(item)"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="region">
                  <el-select
                    v-model="provinceList.region"
                    placeholder="请选择区"
                  >
                    <el-option
                      v-for="item in regionList"
                      :key="item.key"
                      :label="item.name"
                      :value="item.name"
                      @click.native="regionChange(item.adcode)"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
        </el-form>
        <div v-if="!living">
          <el-form-item label="现居地" prop="living_city">
            <el-input
              v-model="num.living_city"
              style="width: 300px"
              @click.native="adressChange"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label="联系方式" prop="phone_number">
          <div style="display: flex; padding-right: 10px">
            <el-input v-model="num.phone_number" disabled></el-input>
            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="addition"
              >绑定</el-button
            >
          </div>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <div style="display: flex; padding-right: 10px">
            <el-input v-model="num.email" disabled></el-input>
            <el-button
              type="primary"
              style="margin-left: 20px"
              @click="emailClick"
              >绑定</el-button
            >
          </div>
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
            accept=".png,.jpeg,.jpg"
            action="http://1.13.8.165/user/edit_selfinfo/"
            class="avatar-uploader"
          >
            <img
              v-if="imageUrl"
              :src="imageUrl"
              style="
                width: 150px;
                height: 150px;
                position: absolute;
                border-radius: 100px;
                right: 50px;
              "
              class="avatar"
            />
            <img
              v-if="!imageUrl"
              :src="disposeImg(num.image)"
              style="
                width: 150px;
                height: 150px;
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
    <PhotoDialog
      :is-show="isShow"
      :photo="num.phone_number"
      @reset="reset"
      @reset1="reset1"
    />
    <EmailDialog
      :email-show="emailShow"
      :email="num.email"
      @submit="submit"
      @submit1="submit1"
    />
  </div>
</template>
<script>
import { editUserdetails, getUservitae } from '@/api/user'
import disposeImg from '@/utils/disposeImg'
import PhotoDialog from './photoDialog.vue'
import EmailDialog from './emailDialog.vue'
import { getchangeInformation, getcity } from '@/api/my/resume'
import { formatTime } from '@/api/formatTime'
export default {
  components: { PhotoDialog, EmailDialog },
  props: {
    show: {
      type: Boolean
    },
    list: {
      type: Object
    },
    num: {
      type: Object
    }

  },
  data () {
    return {
      formatTime,
      form: {

      },
      isShow: false,
      photoShow: false,
      emailShow: false,
      imageUrl: '',
      polist: {
        province: [
          { required: true, message: '请选择省', trigger: 'change' }

        ],
        city: [
          { required: true, message: '请选择市', trigger: 'change' }

        ],
        region: [
          { required: true, message: '请选择区', trigger: 'change' }

        ]

      },
      rules: {

        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2到 10 个字符', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择求职状态', trigger: ['blur,change'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur,change'] }
        ],
        identity: [
          { required: true, message: '请选择身份', trigger: ['blur,change'] }
        ],
        date_of_birth: [
          { required: true, message: '请选择出生日期', trigger: 'blur' }
        ],
        job_start: [
          { required: true, message: '请选择参加工作时间', trigger: 'change' }
        ],

        phone_number: [
          { required: true, message: '请输入手机号', trigger: 'blur' }

        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        living_city: [
          { required: true, message: '请输入省市', trigger: 'blur' }
        ]

      },
      city: [],
      provinceList: {
        province: '',
        city: '',
        region: ''

      },
      cityList: [],
      regionList: [],
      living: false,
      liviCity: 0
    }
  },
  watch: {
    num (newVal, oldVal) {
      console.log('newVal', newVal)
    }
  },
  created () {
    this.getcityList()
  },
  methods: {
    async getcityList () {
      const { data } = await getcity()
      console.log('城市', data)
      this.city = data.data
    },
    async submitForm () {
      this.$refs.ff.validate((valid) => {
        if (valid) {
          this.$refs.rf.validate(async (valid) => {
            if (valid) {
              console.log(this.num)
              if (this.num.status === '离职-随时到岗') {
                this.num.status = 0
              } else if (this.num.status === '在职-暂不考虑') {
                this.num.status = 1
              } else if (this.num.status === '在职-考虑机会') {
                this.num.status = 2
              } else {
                this.num.status = 3
              }
              if (this.num.sex === '女') {
                this.num.sex = 0
              } else {
                this.num.sex = 1
              }
              if (this.num.identity === '职场人') {
                this.num.identity = 0
              } else {
                this.num.identity = 1
              }
              const city = this.num.living_city

              if (this.living === false) {
                delete this.num.living_city
              } else {
                // this.num.living_city = this.num.living_city.adcode
              }
              const time = this.num.date_of_birth
              this.num.date_of_birth = new Date(time).toLocaleDateString().slice().replace(/\//g, '-')
              this.num.birth_day = this.num.date_of_birth
              const timeList = this.num.job_start
              this.num.job_start = new Date(timeList).toLocaleDateString().slice().replace(/\//g, '-')
              console.log(new Date(time).toLocaleDateString().slice().replace(/\//g, '-'))

              console.log('this.num', this.num, this.liviCity)
              const res = await getchangeInformation(this.num)
              console.log('num', res)
              this.$emit('reset', false)
              this.$message.success('修改成功')
            }
          })
        }
      })
    },
    resetForm () {
      this.$confirm('确定取消修改信息吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'

      }).then(() => {
        this.$emit('reset', false)
      })
      // this.$emit('reset', false)
    },
    // 头像上传
    handleAvatarSuccess (res, file) {
      // console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log('123', this.imageUrl)
      this.num.image = this.imageUrl
    },
    beforeAvatarUpload (file) {
      this.upimages = window.URL.createObjectURL(file)
      // console.log();
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      const isPNG = file.type === 'image/png'
      if (!isJPG && !isPNG) this.$message.error('请上传格式为 png, jpg 的图片！')

      if (isJPG && isLt2M || isPNG && isLt2M == true) {
        console.log('图片', file)

        // 将文件转化为formdata数据上传
        const fd = new FormData()
        fd.append('type', '102')
        fd.append('name_avatar', file)
        console.log('fd', fd)
        editUserdetails(fd).then((rs) => {
          console.log(rs)
        })
      }
      return isJPG || isLt2M || isPNG
    },
    // 手机号绑定
    addition () {
      this.isShow = true
    },
    reset (i, photo) {
      this.isShow = i
      this.emailShow = i
      console.log('photo', photo)
      if (photo !== '' || photo !== undefined) {
        this.num.phone_number = photo
      }
    },
    reset1 () {
      this.isShow = false
      this.emailShow = false
    },
    // 邮箱绑定
    emailClick () {
      this.emailShow = true
    },
    submit (i, email) {
      this.isShow = i
      this.emailShow = i
      this.num.email = email
    },
    submit1 (i, email) {
      this.isShow = false
      this.emailShow = false
    },
    // 省市区
    provinceChange (item) {
      console.log('省', item)
      this.cityList = item.children
    },
    cityChange (item) {
      console.log('市', item)
      // this.provinceList.city = ''
      // this.provinceList.region = ''
      this.regionList = item.children
    },
    regionChange (item) {
      console.log(item)
      this.liviCity = item
      this.num.living_city = item
      // this.provinceList.region = ''
    },
    adressChange () {
      this.living = true
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
