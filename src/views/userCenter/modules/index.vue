<template>
  <div class="content-box">
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="#">个人主页</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="name" style="font-size: 38px; font-weight: 400">
        Hello,
        <span>{{ userInfo.name }}</span> !
        <div class="check">
          <router-link to="/jobwanted">我的投递</router-link>
        </div>
      </div>
      <div
        class="text"
        style="line-height: 1.5; font-size: 14px; color: #333333"
      >
        不知不觉，我们已经认识{{
          userInfo.days
        }}天了。缘分真是个奇妙的东西，不知道你是不是已经找到了合适的工作？如果有的话，我真的很为你开心；如果没有也不要急，我们会尽我们所能的去帮助你的……
      </div>
    </div>
    <div class="information">
      <div class="info-left">
        <div class="name">我的信息</div>
        <div class="text">
          个人信息完善进度
          <span>{{ userInfo.ratio }}%</span>
        </div>
        <div style="padding-top: 20px">
          <el-progress
            :percentage="userInfo.ratio"
            :stroke-width="10"
            :text-inside="true"
            :show-text="false"
            color="#256EFD"
          />
        </div>
        <div style="color: #808080; padding: 15px 5px">
          上次编辑时间：{{ userInfo.changeTime }}
        </div>
        <div
          style="
            color: #808080;
            padding: 10px 5px 5px 5px;
            color: rgb(239, 144, 77);
          "
        >
          *完善而真实的个人信息会让你的简历内容更加充实
        </div>
        <div
          style="color: #808080; padding: 10px 5px 20px 5px; line-height: 25px"
        >
          <p>我有教育经历 {{ userInfo.num_edu }} 条</p>
          <p>我有培训经历 {{ userInfo.num_tra }} 条</p>
          <p>我有工作经历 {{ userInfo.num_job }} 条</p>
          <p>你可以继续去完善你的经历信息，让你的简历更优秀</p>
        </div>
      </div>
      <div class="adorn" />
      <div class="info-left">
        <div class="name">我的简历</div>
        <div
          style="color: #808080; padding: 10px 5px 20px 5px; line-height: 25px"
        >
          <p>你一共在这里创建了 {{ userInfo.num_cv }} 张简历。</p>
          <p>第一次创建简历是在 {{ userInfo.first_create_time }}。</p>
          <p>最后一次编辑简历是在 {{ userInfo.last_modify_date }}。</p>
          <p>上次更新简历时你在求职意向中写下了：</p>
          <p style="color: #256efd">
            {{ userInfo.last_modify_job_intention }}。
          </p>
          <p>现在你是不是依然未改初衷？</p>
          <div class="check">
            <router-link to="/uservitae">查看详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPersonalinfo } from '../../../api/user';

export default {
  data() {
    return {
      userInfo: {},
      status: true
    };
  },
  created() {
    getPersonalinfo().then((res) => {
      console.log(res);
      this.userInfo = res.data;
      // console.log(res.data);
      this.userInfo.changeTime = this.formateDate(this.userInfo.update_date_pi);

      this.userInfo.first_create_time = this.formateDate(
        this.dateFormat('YYYY-mm-dd HH:MM', res.data.first_create_time)
      );
      this.userInfo.last_modify_date = this.formateDate(
        this.dateFormat('YYYY-mm-dd HH:MM', res.data.last_modify_date)
      );

      if (res.data.cv != undefined) {
        this.userInfo.cv_positionclass_set.get.position_class_id.name =
          res.data.cv.cv_positionclass_set.get.position_class_id.name;
      }

      if (res.data.user.first_name == '') {
        this.userInfo.name = res.data.user.username;
      } else {
        this.userInfo.name = res.data.user.last_name + res.data.user.first_name;
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.content-box {
  background: #fff;
  width: 100%;
  // min-width: 1280px;
  height: 100%;

  .title {
    width: 62%;
    min-width: 1000px;
    height: auto;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 120px;
    // border-bottom: 2px solid #cecece;

    .name {
      margin-top: 24px;
      min-width: 210px;
      height: 56px;
      font-size: 35px;
      font-weight: 400;
      line-height: 40px;
      display: flex;
      color: #000000;

      .check {
        width: 147px;
        height: 36px;
        background: #256efd;
        border-radius: 4px;
        margin-left: 50px;
        // padding: 8px 25px;
        // background: #3c69be;
        text-align: center;
        color: #fff;
        font-size: 14px;
      }
    }

    .text {
      padding-top: 30px;
      color: #808080;
    }
  }

  .information {
    width: 62%;
    min-width: 1000px;
    height: auto;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;

    .info-left {
      width: 45%;
      min-width: 450px;

      .name {
        min-width: 210px;
        height: 56px;
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #141518;
      }
      .check {
        width: 147px;
        height: 36px;
        background: #256efd;
        border-radius: 4px;
        line-height: 40px;
        float: left;
        // background: #035afa;
        text-align: center;
        font-size: 14px;
        font-family: Helvetica;
        color: #ffffff;
      }

      .text {
        padding-top: 10px;
        color: #808080;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .adorn {
    width: 1px;
    height: 350px;
    background-color: #979797;
    opacity: 0.25;
  }
}
</style>
