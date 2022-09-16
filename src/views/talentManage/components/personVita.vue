<template>
  <div>
    <!-- <div class="goBack">返回</div> -->
    <div class="vita-box">
      <div class="vita-name">
        <div class="name-box">
          <div v-if="formdata.cv" class="name-up">
            <div class="name">
              {{
                formdata.cv.user_id.last_name + formdata.cv.user_id.first_name
              }}
            </div>
            <div class="phone">
              <i class="el-icon-mobile" />{{ formdata.personal.phone_number }}
            </div>
            <div class="email">
              <i class="el-icon-message" />{{ formdata.cv.user_id.email }}
            </div>
          </div>
          <div v-if="formdata.personal" class="name-down">
            <div class="info">
              性别：{{ formdata.personal.sex }} | 民族：{{
                formdata.personal.nation
              }}
              | 出生日期：{{ formdata.personal.date_of_birth }}
            </div>
            <div class="info">
              地址：{{ formdata.personal.home_address }} | 籍贯：{{
                formdata.personal.birth_address
              }}
              | 婚姻状况：未婚
            </div>
            <div v-if="formdata.cv" class="info">
              工作经验: 2年 | 工作意向：{{ formdata.cv_positionClass }} |
              意向城市：北京 | 期望薪资：{{ formdata.cv.expected_salary }}
            </div>
          </div>
        </div>
        <!-- 上传照片 -->
        <div class="picture-box">
          <el-upload
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            action=""
            class="avatar-uploader"
          >
            <img
              v-if="formdata.personal"
              :src="disposeImg(formdata.personal.image)"
              class="avatar"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </div>
      </div>
      <div v-if="formdata.personal" class="vita-main">
        <div class="degree">最高学历：{{ formdata.personal.education }}</div>
        <div class="degree">学位类型：学士</div>
      </div>
      <div class="vita-main">
        <div class="study">
          <span
            style="
              width: 16px;
              height: 16px;
              background: #3c69be;
              display: inline-block;
              border-radius: 50%;
              border: none;
            "
          />&nbsp;培训经历
        </div>
        <div
          v-for="(school, index) in formdata.edu_info_set"
          :key="index"
          class="school"
        >
          {{ school.school
          }}<span
            style="padding-left: 30px; font-size: 15px"
          >| {{ school.department }} | {{ school.major }} |
            {{ school.education }}</span>
          <span
            style="float: right; padding-right: 40px; font-size: 15px"
          >{{ school.start_date }}-{{ school.end_date }}</span>
        </div>
      </div>
      <div class="vita-main">
        <div class="study">
          <span
            style="
              width: 16px;
              height: 16px;
              background: #3c69be;
              display: inline-block;
              border-radius: 50%;
              border: none;
            "
          />&nbsp;工作/实习经历
        </div>
        <div
          v-for="(job, index) in formdata.job_info_set"
          :key="index"
          class="school"
        >
          {{ job.enterprise }}
          <span
            style="float: right; padding-right: 40px; font-size: 15px"
          >{{ job.start_date }}-{{ job.end_date }}</span>
          <div v-if="job.position" class="post">
            {{ job.position.name }}
          </div>

          <div class="info">
            <div>{{ job.job_content }}</div>
            <!--          <div>-->
            <!--            1.UI特训班授课，对无经验学员进行授课，根据学员掌握程度把控课程进度。确保学院在最短时间内掌握UI知识，能够独立完成UI作品。-->
            <!--          </div>-->
            <!--          <div>2.根据课程情况调整课纲结构，确保课程质量，保证到课率。</div>-->
            <!--          <div>3.整理教学流程，完善教学流程。</div>-->
          </div>
        </div>
      </div>
      <div class="vita-main">
        <div class="study">
          <span
            style="
              width: 16px;
              height: 16px;
              background: #3c69be;
              display: inline-block;
              border-radius: 50%;
              border: none;
            "
          />&nbsp;培训经历
        </div>
        <div
          v-for="(tra, index) in formdata.tra_info_set"
          :key="index"
          class="school"
        >
          {{ tra.training_team
          }}<span
            style="padding-left: 30px; font-size: 15px"
          >| {{ tra.training_name }}</span>
          <span
            style="float: right; padding-right: 40px; font-size: 15px"
          >{{ tra.start_date }}-{{ tra.end_date }}</span>
        </div>
      </div>
      <div class="vita-main">
        <div class="study">
          <span
            style="
              width: 16px;
              height: 16px;
              background: #3c69be;
              display: inline-block;
              border-radius: 50%;
              border: none;
            "
          />&nbsp;自我介绍
        </div>
        <div v-if="formdata.evaluation" class="introduce">
          自我评价：{{ formdata.evaluation.self_evaluation }}
        </div>
        <div v-if="formdata.evaluation" class="introduce">
          <span
            v-if="formdata.evaluation.teacher_evaluation"
          >教师评价：{{ formdata.evaluation.teacher_evaluation }}</span>
          <span v-else>教师评价：无</span>
        </div>
      </div>
    </div>
    <div class="box">
      <div
        style="color: blue; font-size: 20px; cursor: pointer"
        @click="Backto"
      >
        <el-button type="primary" round>返回</el-button>
      </div>
      <div
        style="
          color: blue;
          font-size: 15px;
          width: 20%;
          display: flex;
          line-height: 35px;
          justify-content: space-between;
        "
      >
        <span
          @click="downloadCv"
        ><i class="el-icon-download" style="color: blue" />下载简历</span>
        <span @click="dialogVisible = true">
          <i class="el-icon-edit" style="color: blue" />
          修改建议
        </span>
      </div>
    </div>
    <el-dialog
      title="修改建议"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div v-show="!comment" v-if="formdata.cv_comment">
        <div v-if="formdata.cv_comment.training.length > 0">
          重要信息 ：
          <p v-for="(item, index) in formdata.cv_comment.training" :key="index">
            <i class="el-icon-edit" style="margin-right: 20px" />{{ item }}
          </p>
        </div>
        <div v-if="formdata.cv_comment.basic.length > 0">
          基本信息 ：
          <p v-for="(item, index) in formdata.cv_comment.basic" :key="index">
            <i class="el-icon-edit" style="margin-right: 20px" />{{ item }}
          </p>
        </div>
        <div v-if="formdata.cv_comment.education.length > 0">
          教育信息 ：
          <p
            v-for="(item, index) in formdata.cv_comment.education"
            :key="index"
          >
            <i class="el-icon-edit" style="margin-right: 20px" />{{ item }}
          </p>
        </div>
        <div v-if="formdata.cv_comment.job.length > 0">
          工作信息 ：
          <p v-for="(item, index) in formdata.cv_comment.job" :key="index">
            <i class="el-icon-edit" style="margin-right: 20px" />{{ item }}
          </p>
        </div>
        <div v-if="formdata.cv_comment.important.length > 0">
          培训信息 ：
          <p
            v-for="(item, index) in formdata.cv_comment.important"
            :key="index"
          >
            <i class="el-icon-edit" style="margin-right: 20px" />{{ item }}
          </p>
        </div>

        <div v-if="formdata.cv_comment.other.length > 0">
          其他信息 ：
          <p v-for="(item, index) in formdata.cv_comment.other" :key="index">
            <br><i class="el-icon-edit" style="margin-right: 20px" />{{ item }}
          </p>
        </div>
      </div>
      <div v-show="comment">无</div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCv, downCv } from '@/api/cv';
import axios from 'axios';
export default {
  data() {
    return {
      formdata: '',
      comment: true,
      dialogVisible: false,
      userid: '',
      cvid: '',
      name: '简历',
      imageUrl:
        'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    };
  },
  created() {
    //  (this.$route.query.data)
    //  (this.$route.query.data)
    // this.formdata = this.$route.query.data;
    if (this.$route.query.data == undefined) {
      this.cvid = this.$route.query.item.id;
      this.userid = this.$route.query.item.user_id.id;
    } else {
      this.cvid = this.$route.query.data.cv.id;
      this.userid = this.$route.query.data.cv.user_id.id;
    }

    getCv(this.userid, this.cvid).then(rs => {
      this.formdata = rs.data;
      // console.log(rs.data);
      if (this.formdata.comment_is_none == true) {
        this.comment = true;
      } else {
        this.comment = false;
      }
      // 性别 sex_choices
      rs.data.sex_choices.forEach(item => {
        if (item.idx == this.formdata.personal.sex) {
          this.formdata.personal.sex = item.label;
        }
      });
      // 省 province_choices birth_address
      rs.data.province_choices.forEach(item => {
        if (item.idx == this.formdata.personal.birth_address) {
          this.formdata.personal.birth_address = item.label;
        }
      });
      // 熟练程度 skill_levels
      // 民族 nations_choices

      rs.data.nations_choices.forEach(item => {
        if (item.idx == this.formdata.personal.nation) {
          this.formdata.personal.nation = item.label;
        }
      });
      // 学历 education_choices

      rs.data.education_choices.forEach(item => {
        if (item.idx == this.formdata.personal.education) {
          this.formdata.personal.education = item.label;
        }
        this.formdata.edu_info_set.forEach(items => {
          if (items.education == item.idx) {
            items.education = item.label;
          }
        });
      });
      //  婚姻 martial_choices  martial_status
      rs.data.martial_choices.forEach(item => {
        if (item.idx == this.formdata.personal.martial_status) {
          this.formdata.personal.martial_status = item.label;
        }
      });
    });
  },
  methods: {
    downloadCv() {
      axios.get('https://znzz.tech/cv/' + this.userid + '/' + this.cvid + '/download-cv/', {
        responseType: 'blob'
      }).then(res => {
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = `用户-${this.name}`; // 下载后的文件名，根据需求定义
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      });
    },
    handleClose(done) {
      done();
    },

    Backto() {
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style lang="scss" scoped>
.goBack {
  width: 75%;
  margin: 20px auto;
  color: #409eff;
  cursor: pointer;
  font-size: 25px;
}
.box {
  width: 62%;
  min-width: 980px;
  height: auto;
  margin: 20px auto;

  color: #2f2f2f;
  display: flex;
  justify-content: space-between;
  span {
    cursor: pointer;
  }
}
.vita-box {
  width: 62%;
  min-width: 1555px;
  height: auto;
  border: 1px solid #cecece;
  border-radius: 10px;
  margin: 20px auto;
  color: #2f2f2f;

  .vita-name {
    width: 100%;
    border-bottom: 1px solid #cecece;
    height: auto;
    display: flex;

    .name-box {
      width: 65%;
      min-width: 600px;

      .name-up {
        width: 80%;
        border-bottom: 1px solid #cecece;
        padding-top: 20px;
        padding-left: 20px;
        padding-bottom: 20px;
        .name {
          margin-bottom: 20px;
          font-size: 30px;
        }

        .phone {
          margin-bottom: 15px;
        }
      }

      .name-down {
        width: 90%;
        padding-top: 20px;
        padding-left: 20px;
        margin-bottom: 20px;

        .info {
          margin-bottom: 12px;
        }
      }
    }

    .picture-box {
      width: 35%;
      min-width: 280px;
      text-align: center;
      padding-top: 20px;

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

        .avatar {
          width: 160px;
          height: 178px;
          display: block;
        }
      }

      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
    }
  }

  .vita-main {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #cecece;
    height: auto;
    padding-bottom: 20px;
    padding-top: 10px;

    .degree {
      width: 100%;
      padding-left: 20px;
      padding-top: 15px;
    }

    .study {
      width: 100%;
      padding-left: 20px;
      padding-top: 15px;
      font-size: 20px;
    }

    .school {
      width: 100%;
      padding-left: 20px;
      padding-top: 15px;
      font-size: 25px;
    }

    .info {
      width: 60%;
      min-width: 650px;
      padding-left: 20px;
      line-height: 30px;
      font-size: 15px;
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
    }
  }
}
</style>
