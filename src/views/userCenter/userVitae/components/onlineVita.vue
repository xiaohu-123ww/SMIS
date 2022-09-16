<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">个人主页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="#" style="color: #256efd">简历详情页</a>
      </el-breadcrumb-item>
      <p style="position: absolute; right: 200px" @click="Backto">
        <a>返回</a>
      </p>
      <!-- <el-button
        type="primary"
        round
        style="cursor: pointer"

      >返回</el-button> -->
    </el-breadcrumb>
    <div class="vita-box">
      <div class="vita-name">
        <div class="name-box">
          <!-- 手机号&qq号&名字信息 -->
          <div v-if="showName" class="name-up">
            <div class="name">{{ userVitaed.name }}</div>
            <div v-if="userVitaed.personal" class="phone">
              手机号 {{ userVitaed.personal.phone_number }}
            </div>
            <div v-if="userVitaed.personal" class="phone">
              QQ号 {{ userVitaed.personal.qq_number }}
            </div>
            <div v-if="userVitaed.personal" class="phone">
              email {{ userVitaed.email }}
            </div>
            <div class="compile_one" @click="toEdit(1)">编辑</div>
            <!-- <el-button class="editInfo1">编辑</el-button> -->
          </div>

          <div v-if="!showName" class="vita-name">
            <edit-info :vitaed="userVitaed" @editInfo="editSubmit" />
          </div>
          <!-- 性别&年龄 -->
          <div v-if="showContact" class="name-down">
            <div v-if="userVitaed.personal" class="info">
              性别 {{ userVitaed.sexs }} | 民族 {{ userVitaed.nation }} |
              出生日期 {{ userVitaed.birth }}
            </div>
            <div class="info">
              地址 {{ userVitaed.homeAddress }} | 籍贯
              {{ userVitaed.birth_address }} | 婚姻状况
              {{ userVitaed.martialStatus }}
            </div>
            <div v-if="userVitaed.personal" class="info">
              身高 {{ userVitaed.personal.height }}米 | 体重
              {{ userVitaed.personal.weight }}斤 | 邮编
              {{ userVitaed.personal.postcode }}
            </div>
            <div class="compile_Two" @click="toEdit(7)">编辑</div>
          </div>
          <div v-if="!showContact" class="vita-main" style="border: none">
            <edit-contact :vitaed="userVitaed" @editContact="contactSubmit" />
          </div>
          <!-- 最高学历 -->
          <div v-if="showEducation" class="vita-mains">
            <div v-if="userVitaed.personal" class="degree">
              最高学历 {{ userVitaed.personal.education }}
            </div>
            <!-- <div class="degree">学位类型：</div> -->
            <div class="compile_three" @click="toEdit(6)">编辑</div>
            <!-- <div class="degree2">
              <el-button class="editInfo3" ></el-button>
            </div> -->
          </div>
        </div>
        <!-- 上传照片 -->
        <div class="picture-box">
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
                width: 250px;
                height: 330px;
                position: absolute;
                bottom: 0px;
                right: 270px;
              "
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
      </div>

      <div v-if="!showEducation" class="vita-main" style="border: none">
        <edit-education :vitaed="userVitaed" @editEducation="educationSubmit" />
      </div>
      <el-dialog :visible.sync="dialogFormVisible" title="收货地址">
        <el-form :model="form">
          <el-form-item :label-width="formLabelWidth" label="活动名称">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item :label-width="formLabelWidth" label="活动区域">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button
            style="background: #256efd"
            @click="dialogFormVisible = false"
            >取 消</el-button
          >
          <el-button
            style="background: #256efd"
            type="primary"
            @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
      <!-- 学习经历 -->
      <div v-if="showDegree" class="vita-main">
        <div
          class="study"
          style="cursor: pointer; overflow: hidden; margin-bottom: 20px"
        >
          <div class="studA">
            <span
              style="
                width: 4px;
                height: 24px;
                background-color: #256efd;
                border-radius: 10px;
                display: inline-block;
              "
            />&nbsp;
            <span style="font-size: 30px; font-weight: 600">学习经历</span>
          </div>

          <div class="compile_four" @click="toEdit(2)">
            添加<i class="el-icon-plus" />
          </div>
          <!-- <button class="add" >
            添加
          </button> -->
          <!-- <span
            class="add"
            style="float: right; padding-right: 40px; color: #3c69be"

          >

          </span> -->
        </div>
        <div
          v-for="(school, index) in userVitaed.edu_info_set"
          :key="index"
          class="school"
          style="font-size: 20px; font-weight: 500"
        >
          <div class="schoolName">
            <span>{{ school.school }}</span>
            <span class="schoolName_one"
              >{{ school.major }}({{ school.edu }})</span
            >
            <span class="schoolName_time">{{
              school.start_date + ' - ' + school.end_date
            }}</span>
          </div>
          <div class="school_edit" @click="toEdit(2, school.id)">编辑</div>
          <div class="school_delete" @click="schoolDel(school)">删除</div>
          <!-- <div
            class="school"
            style="
              display: flex;
              justify-content: flex-end;
              padding-right: 40px;
            "
          > -->
          <!-- <el-button>编辑</el-button>
            <el-button
              style="background: red"
            >删除</el-button> -->
          <!-- </div> -->
        </div>
      </div>
      <!-- 工作实习经历 -->
      <div v-if="!showDegree" class="vita-main">
        <education-info
          :school-id="id"
          :vitaed="userVitaed"
          @educationInfo="degreeSubmit"
        />
      </div>
      <div v-if="showWork" class="vita-main">
        <div class="study" style="cursor: pointer; overflow: hidden">
          <div class="studA">
            <span
              style="
                width: 4px;
                height: 24px;
                background-color: #256efd;
                border-radius: 10px;
                display: inline-block;
              "
            />&nbsp;
            <span style="font-size: 30px; font-weight: 600">工作/实习经历</span>
          </div>
          <div class="job_add" @click="toEdit(3)">
            添加<i class="el-icon-plus" />
          </div>
        </div>
        <div
          v-for="(job, index) in userVitaed.job_info_set"
          :key="index"
          class="jbodiv"
        >
          <div class="schoolName" style="margin: 10px 20px; font-weight: 500">
            <span>{{ job.enterprise }}</span>
            <span class="schoolName_one">{{
              job.position == null ? ' ' : job.position.name
            }}</span>
            <span class="schoolName_time">{{
              job.start_date + ' - ' + job.end_date
            }}</span>
          </div>
          <div
            class="info"
            style="
              font-weight: 400;
              display: flex;
              font-size: 20px;
              color: #222222;
              align-items: center;
            "
          >
            <p style="font-weight: 500; color: #222222; font-size: 20px">
              负责内容：
            </p>
            <div
              v-for="(jobCon, index) in job.jobContent"
              :key="index"
              style="font-size: 18px; color: #666"
            >
              {{ index + 1 + ',' + jobCon }}
            </div>
          </div>
          <div class="edit_delete">
            <div class="jobCon_edit" @click="toEdit(3, job.id)">编辑</div>
            <div class="jobCon_delete" @click="workDel(job)">删除</div>
          </div>
          <!-- <div
            class="school"
            style="
              display: flex;
              justify-content: flex-end;
              padding-right: 40px;
            "
          >
            <el-button style="" ></el-button>
            <el-button
              style="background: red"

            ></el-button>
          </div> -->
        </div>
      </div>
      <div v-if="!showWork" class="vita-main">
        <edit-work :vitaed="userVitaed" :work-id="id" @editWork="workSubmit" />
      </div>
      <!-- 培训经历 -->
      <div v-if="showTrain" class="vita-main">
        <div class="study" style="cursor: pointer; overflow: hidden">
          <div class="studA">
            <span
              style="
                width: 4px;
                height: 24px;
                background-color: #256efd;
                border-radius: 10px;
                display: inline-block;
              "
            />&nbsp;
            <span style="font-size: 30px; font-weight: 600">培训经历</span>
          </div>
          <!-- <span
            style="float: right; padding-right: 40px; color: #3c69be"
            @click="toEdit(4)"
          >
            <i class="el-icon-circle-plus-outline" />添加
          </span> -->
          <div class="train_add" @click="toEdit(4)">
            添加<i class="el-icon-plus" />
          </div>
        </div>
        <div
          v-for="(train, index) in userVitaed.tra_info_set"
          :key="index"
          class="school"
        >
          <div class="schoolName" style="margin: 10px 20px; font-weight: 500">
            <span>{{ train.training_team }}</span>
            <span class="schoolName_one">{{ train.training_name }}</span>
            <span class="schoolName_time">{{
              train.start_date + ' - ' + train.end_date
            }}</span>
          </div>

          <!-- <div
            class="school"
            style="
              display: flex;
              justify-content: flex-end;
              padding-right: 40px;
            "
          > -->
          <div class="edit_delete">
            <div class="jobCon_edit" @click="toEdit(4, train.id)">编辑</div>
            <div class="jobCon_delete" @click="trainDel(train)">删除</div>
          </div>
        </div>
        <!--        <div-->
        <!--          class="school"-->
        <!--          style="display: flex; justify-content: flex-end; padding-right: 40px"-->
        <!--        >-->
        <!--          <el-button @click="toEdit(4)">编辑</el-button>-->
        <!--          <el-button style="background: #cecece">删除</el-button>-->
        <!--        </div>-->
      </div>
      <div v-if="!showTrain" class="vita-main">
        <edit-train
          :train-id="id"
          :vitaed="userVitaed"
          @editTrain="trainSubmit"
        />
      </div>
      <div v-if="showAssess" class="vita-main">
        <div class="study">
          <div class="studA">
            <span
              style="
                width: 4px;
                height: 24px;
                background-color: #256efd;
                border-radius: 10px;
                display: inline-block;
              "
            />&nbsp;
            <span style="font-size: 30px; font-weight: 600">自我介绍</span>
          </div>
        </div>
        <div v-if="userVitaed.eva" class="introduce">
          {{ userVitaed.eva.self_evaluation }}
        </div>
        <div
          class="school"
          style="
            display: flex;
            justify-content: flex-end;
            padding-right: 12px;
            padding-bottom: 20px;
          "
        >
          <div class="school_compile" @click="toEdit(5)">编辑</div>
        </div>
      </div>
      <div v-if="!showAssess" class="vita-main" style="border: none">
        <edit-assess
          :vitaed="userVitaed"
          :vitaedid="id"
          @editAssess="assessSubmit"
        />
      </div>
    </div>
    <div
      style="
        color: blue;
        font-size: 20px;

        width: 65%;
        margin: 20px auto;
      "
    />
  </div>
</template>
<script>
import editInfo from './editUserInfo/editInfo.vue'
import educationInfo from './editUserInfo/educationInfo.vue'
import editWork from './editUserInfo/editWork.vue'
import editTrain from './editUserInfo/editTrain.vue'
import editAssess from './editUserInfo/editAssess.vue'
import editEducation from './editUserInfo/editEducation'
import editContact from './editUserInfo/editContact'
import { editExperiences, getUservitae, editUserdetails } from '@/api/user'
import { getToken } from '@/utils/auth'
import EditContact from './editUserInfo/editContact.vue'
export default {
  components: {
    editInfo,
    educationInfo,
    editWork,
    editTrain,
    editAssess,
    editContact,
    editEducation,
    EditContact
  },
  data () {
    return {
      open: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: '修改头像',
      options: {
        img: '',
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      previews: {},
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 简历数据
      userVitaed: {
        name: '',
        email: '',
        personal: {
          phone_number: '',
          qq_number: '',
          sexs: '',
          nation: '',
          birth: '',
          homeAddress: '',
          birth_address: '',
          martialStatus: '',
          height: '',
          weight: '',
          postcode: '',
          education: ''
        },
        edu_info_set: [
          {
            department: '',
            major: '',
            edu: '',
            start_date: '',
            end_date: '',
            id: ''
          }
        ],
        tra_info_set: [
          {
            training_name: '',
            start_date: '',
            end_date: ''
          }
        ],
        eva: {
          self_evaluation: ''
        },
        job_info_set: [
          {
            id: '',
            enterprise: '',
            start_date: '',
            end_date: '',
            position: {
              name: ''
            },
            jobContent: []
          }
        ]
      },
      // 个人简介
      showName: true,
      // 编辑教育经历
      showDegree: true,
      // 编辑工作经历
      showWork: true,
      form: [],
      // 编辑培训经历
      showTrain: true,
      // 编辑自我评价
      showAssess: true,
      showEducation: true,
      showContact: true,
      imageUrl: '',
      id: '',
      headers: '',
      upimages: ''
    }
  },
  watch: {},
  created () {
    this.headers = {
      Authorization: getToken(),
      'Content-Type': 'multipart/form-data'
    }
    // console.log(this.headers)
    this.getlist()
  },
  methods: {
    Backto () {
      this.$router.go(-1)
    },
    getlist () {
      getUservitae().then((res) => {
        //  (res.data);
        // console.log(res.data);
        this.userVitaed = res.data
        this.userVitaed.phone = res.data.personal.phone_number
        this.userVitaed.email = res.data.personal.id.email
        this.userVitaed.birth = res.data.personal.date_of_birth
        this.userVitaed.homeAddress = res.data.personal.home_address
        this.imageUrl = this.disposeImg(res.data.personal.image)
        this.options.img = this.disposeImg(res.data.personal.image)
        if (res.data.personal.id.first_name == '') {
          this.userVitaed.name = res.data.personal.id.username
        } else {
          this.userVitaed.name =
            res.data.personal.id.last_name + res.data.personal.id.first_name
        }
        // 籍贯地址
        res.data.province_choices.forEach((choices) => {
          if (choices.idx == res.data.personal.birth_address) {
            this.userVitaed.birth_address = choices.label
            //  (this.userVitaed);
          }
        })
        // 性别
        res.data.sex_choices.forEach((sex) => {
          if (sex.idx == res.data.personal.sex) {
            this.userVitaed.sexs = sex.label
          }
        })
        // 婚姻
        res.data.martial_choices.forEach((martial) => {
          //  (martial.idx==res.data.personal.martial_status);
          if (martial.idx == res.data.personal.martial_status) {
            this.userVitaed.martialStatus = martial.label
          }
        })
        // 民族
        res.data.nations_choices.forEach((nations) => {
          if (nations.idx == res.data.personal.nation) {
            this.userVitaed.nation = nations.label
          }
        })
        // 学历
        res.data.education_choices.forEach((education) => {
          if (education.idx == res.data.personal.education) {
            this.userVitaed.personal.education = education.label
          }
          res.data.edu_info_set.forEach((edus) => {
            if (edus.education == education.idx) {
              edus.edu = education.label
            }
          })
        })
        res.data.job_info_set.forEach((job) => {
          if (job.job_content.indexOf('；') < 0) {
            job.jobContent = [job.job_content]
          } else {
            job.jobContent = job.job_content.split('；')
          }
        })
        // edu_info_set 学校
        // job_info_set 工作
        // tra_info_set 培训
        // eva 当前用户的评价对象
      })
    },
    schoolDel (item) {
      this.$confirm(`是否要删除`, {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true,
        roundButton: true
      }).then(() => {
        editExperiences({
          type: '1072',
          id: item.id
        }).then((rs) => {
          //  (rs);
          this.getlist()
        })
      })
    },
    workDel (item) {
      this.$confirm(`是否要删除`, {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true,
        roundButton: true
      }).then(() => {
        editExperiences({
          type: '1052',
          id: item.id
        }).then((rs) => {
          this.getlist()
        })
      })
      //  (item);
    },
    trainDel (item) {
      this.$confirm(`是否要删除`, {
        distinguishCancelAndClose: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        center: true,
        roundButton: true
      }).then(() => {
        editExperiences({
          type: '1062',
          id: item.id
        }).then((rs) => {
          this.getlist()
        })
      })
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
          this.getlist()
        })
      }

      return isJPG && isLt2M
    },
    // 编辑
    toEdit (num, id) {
      //  (id)
      switch (parseInt(num)) {
        case 1:
          this.showName = false
          break
        case 2:
          this.showDegree = false
          this.id = id
          break
        case 3:
          this.showWork = false
          this.id = id
          break
        case 4:
          this.showTrain = false
          this.id = id
          break
        case 5:
          this.showAssess = false
          break
        case 6:
          this.showEducation = false
          break
        case 7:
          this.showContact = false
          break
        default:
          break
      }
    },
    editSubmit (val) {
      this.showName = val
      this.getlist()
    },
    degreeSubmit (val) {
      this.showDegree = val
      this.getlist()
    },
    workSubmit (val) {
      this.showWork = val
      this.getlist()
    },
    trainSubmit (val) {
      this.showTrain = val
      this.getlist()
    },
    assessSubmit (val) {
      this.showAssess = val
      this.getlist()
    },
    educationSubmit (val) {
      this.showEducation = val
      this.getlist()
    },
    contactSubmit (val) {
      this.showContact = val
      this.getlist()
    }
  }
};
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  margin-top: 20px;
  margin-left: 220px;
}
.el-button {
  width: 100px;
  height: 40px;
  background: #3c69be;
  border-radius: 26px;
  color: #fff;
}

// .el-icon-circle-plus-outline {
//   color: #3c69be;
// }

.vita-box {
  width: 80%;
  min-width: 1555px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.07);
  // border: 1px solid #cecece;
  // border-radius: 10px;
  // margin-bottom: 100px;
  margin: 20px auto 150px auto;
  color: #2f2f2f;

  .vita-name {
    width: 100%;
    // border-bottom: 1px solid #cecece;
    height: auto;
    display: flex;
    padding-bottom: 30px;
    position: relative;

    .name-box {
      width: 85%;
      min-width: 600px;

      .name-up {
        width: 80%;
        height: 200px;
        border-bottom: 1px solid #cecece;
        padding-top: 21px;
        margin-left: 38px;
        // padding-left: 20px;
        position: relative;
        .editInfo1 {
          width: 100px;
          height: 40px;
          background: #256efd;
          border-radius: 26px;
          color: #fff;
          position: absolute;
          bottom: 30px;
          right: 45px;
        }
        .name {
          font-size: 45px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #141518;
          margin-bottom: 20px;
          // font-size: 30px;
        }

        .phone {
          margin-bottom: 15px;
          font-size: 14px;
          color: #666;
        }
      }

      .name-down {
        width: 80%;
        height: 122px;
        padding: 25px 0;
        // padding-left: 20px;
        margin-left: 38px;
        position: relative;
        .info {
          padding-bottom: 14px;
          color: #666;
        }
        position: relative;
        .editInfo2 {
          width: 100px;
          height: 40px;
          background: #256efd;
          border-radius: 26px;
          color: #fff;
          position: absolute;
          bottom: 30px;
          right: 160px;
        }
      }
    }
    .editInfo3 {
      width: 100px;
      height: 40px;
      background: #256efd;
      border-radius: 26px;
      color: #fff;
      position: absolute;
      // bottom: 30px;
      right: 430px;
    }
    .picture-box {
      width: 35%;
      min-width: 280px;
      text-align: center;
      padding-top: 20px;
      position: relative;
      .avatar {
        width: 160px;
        height: 178px;
        display: block;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
      }

      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
    }
  }

  .vita-main {
    width: 95%;
    // height: 110px;
    border-top: 1px solid #cecece;
    padding-top: 40px;
    margin-left: 38px;
    position: relative;

    .degree {
      display: inline-block;
      width: 100%;
      padding-left: 20px;
      margin-top: 10px;
      position: relative;
      top: 30px;
      font-size: 16px;
      color: #666;
    }
    .degree2 {
      display: inline-block;
      position: relative;
      left: 385px;
      top: -10px;
      width: 100%;
      padding-left: 20px;
      margin-top: 10px;
    }

    .study {
      width: 100%;
      // height: 316px;
      padding-left: 20px;
      padding-top: 15px;
      font-size: 20px;
      box-sizing: border-box;
    }
    .studA {
      margin-bottom: 20px;
    }
    .school {
      width: 100%;
      padding-left: 20px;
      padding-top: 15px;
      font-size: 25px;
      display: flex;
    }

    .info {
      width: 60%;
      min-width: 650px;
      padding-left: 20px;
      line-height: 30px;
    }

    .post {
      width: 100%;
      padding-left: 20px;
      padding-right: 10px;
      padding-top: 15px;
      color: #808080;
      margin-bottom: 20px;
    }

    .introduce {
      width: 100%;
      padding-left: 20px;
      padding-right: 10px;
      padding-top: 15px;
      line-height: 30px;
      font-size: 18px;
      font-weight: 400;
    }
  }
  .add {
    // margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
    float: right;
    width: 88px;
    height: 36px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    border: none;
    background: #256efd;
    border-radius: 18px;
  }
}
.compile_one {
  position: absolute;
  width: 88px;
  height: 36px;
  line-height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  bottom: 42px;
  right: 0;
}
.compile_Two {
  position: absolute;
  width: 88px;
  height: 36px;
  line-height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  bottom: 42px;
  right: 0;
}
.compile_three {
  position: absolute;
  width: 88px;
  height: 36px;
  line-height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  bottom: 30px;
  right: 0;
}
.compile_four {
  position: absolute;
  width: 88px;
  height: 36px;
  line-height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  top: 28px;
  right: 0;
}
.vita-mains {
  width: 80%;
  height: 121px;
  // height: 110px;
  border-top: 1px solid #cecece;
  padding-top: 10px;
  margin-left: 38px;
  position: relative;
  line-height: 121px;
  .degree {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }
}
.schoolName {
  display: flex;
  width: 85%;
  justify-content: space-between;
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #222222;
  line-height: 33px;
  letter-spacing: 2px;
  margin-bottom: 20px;
}
.schoolName_time {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.school_edit {
  width: 88px;
  height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
  // float: right;
  margin-left: 20px;
}
.school_delete {
  text-align: center;
  line-height: 36px;
  width: 88px;
  height: 36px;
  background: red;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  margin-left: 30px;
}
.jobCon_edit {
  width: 88px;
  height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
  // float: right;
  margin-left: 190px;
}
.jobCon_delete {
  text-align: center;
  line-height: 36px;
  width: 88px;
  height: 36px;
  background: red;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  margin-left: 30px;
}
.job_add {
  position: absolute;
  top: 27px;
  right: 0;
  width: 88px;
  height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
}
.edit_delete {
  display: flex;
  justify-content: right;
  margin-bottom: 20px;
  // align-items: center;
}
.train_add {
  position: absolute;
  top: 27px;
  right: 0;
  width: 88px;
  height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
}
.school_compile {
  // position: absolute;
  // top: 27px;
  // right: 0;
  width: 88px;
  height: 36px;
  background: #256efd;
  border-radius: 18px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  line-height: 36px;
}
.schoolName_one {
  font-size: 20px;
  font-weight: 400;
  color: #666;
}
</style>
