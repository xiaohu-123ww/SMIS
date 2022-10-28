<template>
  <div class="postdes-box">
    <div class="top">
      <div class="post-name">
        <div class="post-name-logo">
          <img :src="ceshi" alt height="100%" srcset width="100%" />
        </div>
        <div class="name-left">
          <div v-if="jobDetails.position" class="title">
            <span v-if="jobDetails.position.fullname">{{
              jobDetails.position.fullname
            }}</span>
            <span v-else>{{ jobDetails.position.pst_class.name }}</span>
            <span
              style="
                color: #fe6b49;
                padding-top: 10px;
                font-size: 36px;
                font-weight: 500;
                display: block;
              "
            >
              {{ jobDetails.salary_min }} - {{ jobDetails.salary_max }}
              <span
                v-if="jobDetails.city != ''"
                style="
                  font-size: 14px;
                  font-weight: 500;
                  color: #fff;
                  height: 20px;
                  line-height: 20px;
                "
              >
                {{ jobDetails.city }} / {{ jobDetails.job_experience }} /
                {{ jobDetails.education }}
              </span>
            </span>
          </div>
          <span
            v-for="(item, index) in jobDetailsaaa"
            :key="index"
            class="fuli"
            >{{ item }}</span
          >
        </div>
        <div class="name-right">
          <el-button
            :disabled="userPosted"
            :type="userPosted ? 'info' : 'primary'"
            round
            style="
              padding: 10px 30px;
              width: 212px;
              height: 36px;
              background: #256efd;
              border-radius: 4px;
            "
            @click="open"
          >
            <span>{{ cvTitle }}</span>
          </el-button>
        </div>
      </div>
    </div>
    <!-- 底部内容 -->
    <div class="vita-box">
      <div class="left_right">
        <div class="left">
          <div v-if="jobDetails.position" class="post-des">
            <div style="font-size: 23px">岗位描述</div>
            <div class="adorn" />
            <div style="font-size: 15px; padding-bottom: 10px">职位简介</div>
            <div
              v-for="(jobcon, index) in jobDetails.position.jobContent"
              :key="index"
              style="color: #666"
              v-html="jobcon"
            />
          </div>
          <div v-if="jobDetails.position" class="post-tip">
            <div style="font-size: 15px; padding-bottom: 10px">公司简介</div>
            <div
              v-for="(requirement, index) in jobDetails.position.jobrequirement"
              :key="index"
            >
              {{ requirement }}
            </div>
          </div>
        </div>
        <div class="right">
          <div v-if="jobDetails.enterprise" class="up">
            <div class="logo">
              <img
                :src="jobDetails.enterprise.logo"
                alt
                height="100%"
                srcset
                width="100%"
              />
            </div>
            <div style="padding-top: 30px; font-size: 26px">
              {{ jobDetails.enterprise.name }}
            </div>
            <div style="padding: 30px 0">
              {{ jobDetails.enterprise.field.name }}
              {{ jobDetails.enterprise.financing }} | {{ min_number }} -
              {{ max_number }}人
            </div>
            <div
              style="
                padding: 10px 20px;
                text-align: left;
                font-size: 16px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                margin-left: 70px;
              "
            >
              <p v-if="qiyeinfo.address">
                <i class="el-icon-office-building" style="margin-right: 10px" />
                {{ qiyeinfo.address }}
              </p>
              <p v-if="qiyeinfo.site_url">
                <i class="el-icon-link" style="margin-right: 10px" />
                {{ qiyeinfo.site_url }}
              </p>
              <p v-if="qiyeinfo.id">
                <i class="el-icon-message" style="margin-right: 10px" />
                {{ qiyeinfo.id.email }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" title="简历列表" width="30%">
      <p>选择你要投递的简历</p>
      <el-radio-group v-model="radio">
        <el-radio
          v-for="(item, index) in cvsList"
          :key="index"
          style="margin-top: 20px"
          border
          :label="item.id"
          >求职意向：{{ item.get_intention }} 上次更新：{{
            item.update_time
          }}</el-radio
        >
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="postCv">确认投递</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
      <!-- <p
        v-for="item in cvsList"
        @click="postCv(item.id)"
        style="cursor: pointer; margin-top: 20px"
      >
        学科：{{ item.major }} 的简历
      </p>-->
    </el-dialog>
  </div>
</template>
<script>
import { jobDetail, jobSearch, postJob } from '@/api/jobs'
export default {
  data () {
    return {
      ceshi: '',
      radio: '',
      cvTitle: '',
      jobDetails: '',
      jobDetailsaaa: '',
      cvsList: [],
      dialogVisible: false,
      userPosted: false,
      qiyeinfo: {},
      ids: '',
      max_number: '',
      min_number: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    // ...
    next((vm) => {
      // console.log(to.query.item);
      vm.ids = to.query.id
      // console.log(vm);
      // console.log(this);
      // this.item = vm.item
    })
  },
  created () {
    // this.beforeRouteEnter()
    // console.log(this);
    // this.searchs();
    this.getlist()
  },
  mounted () {
    // console.log(this);
  },
  methods: {
    searchs () {
      jobSearch().then((rs) => {
        // console.log(112313, rs);
        // rs.enterprise.logo
        // console.log(this.jobDetails);
        // 城市
        rs.data.cities_options.forEach((item) => {
          // console.log('123123123123213123qweqweqweqw', item);
          // console.log('我是地区', this.jobDetails);
          if (item.idx === this.jobDetails.city) {
            this.jobDetails.city = item.label
          }
        })
        // 工作经验exp_options
        rs.data.exp_options.forEach((item) => {
          if (item.idx == this.jobDetails.job_experience) {
            //  (item.label);
            this.jobDetails.job_experience = item.label
          }
        })
        // 融资 financial_options
        rs.data.financial_options.forEach((item) => {
          // console.log(this.jobDetails);
          if (this.jobDetails.enterprise != undefined) {
            if (item.idx == this.jobDetails.enterprise.financing_status) {
              //  (item.label);
              this.jobDetails.enterprise.financing = item.label
            }
          }
        })
        // 人数 staff_size_options
        // 地点 cities_options
        // 学历 education_choices education
        rs.data.education_choices.forEach((item) => {
          if (item.idx == this.jobDetails.education) {
            //  (item.label);
            this.jobDetails.education = item.label
          }
        })
      })
    },
    getlist () {
      // console.log(this.$route.query);
      jobDetail(this.$route.query.id).then((rs) => {
        // console.log(1111111111, rs);
        this.qiyeinfo = rs.data.this_enterprise
        this.userPosted = rs.data.is_user_posted
        // console.log(rs.data.is_user_posted);
        if (this.userPosted == false) {
          this.cvTitle = '立即投递'
        } else {
          this.cvTitle = '已投递'
        }
        this.cvsList = rs.data.cvs
        // console.log(this.cvsList);
        this.cvsList.forEach((rs) => {
          rs.update_time = rs.update_time.split('T')[0]
        })
        this.jobDetails = rs.data.this_rcm
        this.searchs()
        if (rs.data.this_rcm.enterprise.staff_size) {
          this.min_number = rs.data.this_rcm.enterprise.staff_size.min_number
          this.max_number = rs.data.this_rcm.enterprise.staff_size.max_number
        } else {
          this.min_number = '未知'
          this.max_number = '未知'
        }
        this.jobDetailsaaa = this.jobDetails.position.extra_info.split('、')
        // console.log(this.jobDetailsaaa);
        if (this.jobDetails.enterprise.logo.indexOf('/www.zhineng') < 0) {
          this.jobDetails.enterprise.logo = this.disposeImg(
            this.jobDetails.enterprise.logo
          )
          this.ceshi = this.jobDetails.enterprise.logo
        }
        if (this.jobDetails.salary_min > 1000) {
          this.jobDetails.salary_min = this.jobDetails.salary_min / 1000 + 'K'
          console.log(this.jobDetails)
        }
        if (this.jobDetails.salary_max > 1000) {
          this.jobDetails.salary_max = this.jobDetails.salary_max / 1000 + 'K'
        }
        if (this.jobDetails.position.job_content.indexOf(';') > 0) {
          this.jobDetails.position.jobContent =
            this.jobDetails.position.job_content.split(';')
          this.jobDetails.position.jobContent =
            this.jobDetails.position.jobContent.filter((rs) => {
              return rs && rs.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
            })
        } else if (this.jobDetails.position.job_content.indexOf(' ') > 0) {
          this.jobDetails.position.jobContent =
            this.jobDetails.position.job_content.split(' ')
          // item.position.jobContent=item.position.job_content
        } else {
          return (this.jobDetails.position.jobContent = [
            this.jobDetails.position.job_content
          ])
          //  ();
        }
        if (this.jobDetails.position.requirement.indexOf(';') > 0) {
          this.jobDetails.position.jobrequirement =
            this.jobDetails.position.requirement.split(';')
          if (this.jobDetails.position.jobContent > 0) {
            this.jobDetails.position.jobrequirement =
              this.jobDetails.position.requirement.filter((rs) => {
                return rs && rs.trim() // 注：IE9(不包含IE9)以下的版本没有trim()方法
              })
          }
        } else if (this.jobDetails.position.requirement.indexOf(' ') > 0) {
          this.jobDetails.position.jobrequirement =
            this.jobDetails.position.requirement.split(' ')
          // item.position.jobContent=item.position.job_content
        } else {
          return (this.jobDetails.position.jobrequirement = [
            this.jobDetails.position.requirement
          ])
          //  ();
        }
        // this.searchs();
        // console.log(this.cvsList);
      })
    },
    open () {
      this.dialogVisible = true
    },
    postCv () {
      // console.log(this.$route.query);
      postJob(this.$route.query.id, {
        type: '101',
        result: String(this.radio)
      }).then((rs) => {
        //  (rs)
        // console.log(rs.data);
        this.getlist()
        this.dialogVisible = false
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.postdes-box {
  min-width: 1555px;
  // max-width: 2000px;
  width: 100%;
  height: auto;
  background-color: #fff;
  overflow: hidden;
  .top {
    .post-name {
      width: 100%;
      position: relative;
      margin: 0 auto;
      height: 222px;
      display: flex;
      padding-bottom: 30px;
      background-color: rgb(21, 37, 50);
      .post-name-logo {
        height: 60%;
        position: absolute;
        top: 40px;
        left: 70px;
        img {
          width: 140px;
          height: 140px;
          border-radius: 5px;
        }
      }
    }
    .name-left {
      position: absolute;
      left: 300px;
      width: 40%;
      padding: 40px 0 10px 30px;
      .title {
        padding-bottom: 20px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
      .fuli {
        margin-right: 10px;
        padding: 5px;
        color: #ffffff;
        border-radius: 10px;
        border: 1px solid #999999;
      }
    }
    .name-right {
      position: absolute;
      right: 15%;
      width: 35%;
      text-align: right;
      padding-top: 80px;
    }
  }
  .post-des {
    width: 100%;
    padding: 30px;
    line-height: 30px;
  }
  .post-tip {
    width: 100%;
    padding: 30px;
    line-height: 30px;
  }
  .vita-box {
    width: 72%;
    min-width: 1000px;
    height: auto;
    border-radius: 10px;
    margin: 0px auto 20px;
    color: #2f2f2f;
    // display: flex;
  }
  .left_right {
    display: flex;
    .left {
      margin: 20px 0;
      width: 70%;
      min-width: 640px;
      height: auto;
      border-right: 1px solid #979797;
    }
    .right {
      width: 25%;
      min-width: 360px;
      height: auto;
      .up {
        width: 100%;
        height: auto;
        padding-top: 40px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .logo {
          // border-radius: 50%;
          margin: 0 auto;
          overflow: hidden;
          img {
            width: 140px;
            height: 140px;
            border-radius: 10px;
          }
        }
      }
      .down {
        height: auto;
        width: 100%;
        padding: 40px 30px;
        .sub {
          width: 80px;
          height: 28px;
          font-size: 18px;
          border-bottom: 3px solid #cecece;
        }
        .post-list {
          width: 100%;
          height: auto;
          padding-top: 30px;
        }
      }
    }
  }
}
.describe {
  position: relative;
}
.describe:after {
  background: #f0f0f0;
  content: '';
  display: inline-block;
  height: 1px;
  position: absolute;
  right: -28px;
  top: 15px;
  width: 89%;
}
.adorn {
  width: 50px;
  height: 4px;
  background: #256efd;
  margin-top: 15px;
  margin-bottom: 40px;
}
::v-deep .el-dialog {
  min-width: 550px;
}
</style>
