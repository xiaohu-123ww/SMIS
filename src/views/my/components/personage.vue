<template>
  <div>
    <div class="header">
      <Person :flag="flag" />
    </div>
    <div class="center">
      <div class="communicate">
        <div class="communicate-1">已沟通</div>
        <div class="communicate-1 communicate-2">1</div>
      </div>
      <div class="communicate">
        <div class="communicate-1">已投递</div>
        <div class="communicate-1 communicate-2">1</div>
      </div>
      <div class="communicate">
        <div class="communicate-1">面试</div>
        <div class="communicate-1 communicate-2">1</div>
      </div>
      <div class="communicate">
        <div class="communicate-1">收藏</div>
        <div class="communicate-1 communicate-2">1</div>
      </div>
      <!-- <div>2</div>
      <div>3</div> -->
    </div>
    <div class="footer">
      <div class="credential">
        <div class="credential-a">
          <div class="credential-b">我的证书</div>
          <div class="credential-c">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="$router.push('/resume')"
              >绑定证书</el-button
            >
          </div>
        </div>
        <div class="credential-d">
          <div class="credential-dd">
            <img
              src="../../../assets/imgs/zhengshu.png"
              alt=""
              style="width: 300px; height: 180px"
            />
            <p style="font-size: 14px; padding-left: 45px">
              机器视觉智能检测技术应用-初级
            </p>
          </div>
          <div class="credential-dd">
            <img
              src="../../../assets/imgs/zhengshu.png"
              alt=""
              style="width: 300px; height: 180px"
            />
            <p style="font-size: 14px; padding-left: 45px">
              机器视觉智能检测技术应用-初级
            </p>
          </div>
          <div class="credential-dd">
            <img
              src="../../../assets/imgs/zhengshu.png"
              alt=""
              style="width: 300px; height: 180px"
            />
            <p style="font-size: 14px; padding-left: 45px">
              机器视觉智能检测技术应用-初级
            </p>
          </div>
        </div>
      </div>
      <div class="position">
        <div class="position-a">精选职位</div>
        <div class="position-footer">
          <div class="position-b">
            <div class="position-machine">
              <span style="font-size: 20px; margin-top: 20px">
                机器视觉工程师
              </span>
              <span style="margin-left: 90px; color: red; font-size: 15px"
                >8000-15000.12薪</span
              >
            </div>
            <div class="position-city">
              <button class="position-btn">北京</button>
              <button class="position-btn">1-3年</button>
              <button class="position-btn">本科</button>
              <!-- <button>1-3年</button>
            <button>本科</button> -->
            </div>
            <div class="position-firm">北京智能智造科技有限公司</div>
          </div>
          <div class="position-b">
            <div class="position-machine">
              <span style="font-size: 20px; margin-top: 20px">
                机器视觉工程师
              </span>
              <span style="margin-left: 90px; color: red; font-size: 15px"
                >8000-15000.12薪</span
              >
            </div>
            <div class="position-city">
              <button class="position-btn">北京</button>
              <button class="position-btn">1-3年</button>
              <button class="position-btn">本科</button>
              <!-- <button>1-3年</button>
            <button>本科</button> -->
            </div>
            <div class="position-firm">北京智能智造科技有限公司</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Person from './person.vue'
// import { getPersonalinfo } from '@/api/user'
export default {
  components: { Person },
  data () {
    return {
      circleUrl: '',
      username: '',
      flag: true
    }
  },
  mounted () {

  },
  // created () {
  //   this.getName()
  // },
  methods: {
    // 转换图片格式
  }
}
</script>
<style scoped lang="scss">
.header {
  height: 200px;
  // background-color: aqua;
  display: flex;
  overflow: hidden;
  // justify-content: space-around;
  .head {
    width: 1100px;
    height: 200px;
    // background-color: brown;
    display: flex;
    .left {
      width: 150px;
      height: 150px;
      // background-color: blueviolet;
      margin-left: 80px;
      border-radius: 100px;
    }
    .right {
      width: 500px;
      height: 100px;
      // background-color: rgb(255, 0, 217);
      margin-top: 30px;
      .right-i {
        width: 500px;
        height: 50px;
        // background-color: blueviolet;
        margin-top: 10px;
        margin-left: 10px;
        display: flex;
        padding: 20px;
        .right-age {
          width: 60px;
          height: 20px;
          // background-color: cadetblue;
          font-size: 16px;
          border-right: 1px solid rgb(124, 120, 120);
          margin-right: 10px;
        }
      }
    }
  }
  .communication {
    width: 200px;
    height: 200px;
    // background-color: pink;
    .el-button {
      margin: 100px 50px;
    }
  }
}
.center {
  height: 250px;
  // background-color: aquamarine;
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
  .communicate {
    width: 200px;
    height: 180px;
    // background-color: pink;
    border: 1px solid #1890ff;
    border-radius: 25px;
    overflow: hidden;
    .communicate-1 {
      width: 100%;
      height: 70px;
      line-height: 30px;
      text-align: center;
      font-size: 25px;
      color: #1890ff;
      padding-top: 20px;
    }
    .communicate-2 {
      background: #fff;
      margin-top: 10px;
      font-size: 30px;
      color: #ccc;
    }
  }
}
.footer {
  // background-color: pink;
  height: 900px;
  .credential {
    height: 260px;
    // background-color: aqua;

    .credential-a {
      height: 40px;
      // background-color: yellow;
      display: flex;
      margin-bottom: 20px;
      .credential-b {
        width: 1065px;
        height: 30px;
        // background-color: aqua;
        font-size: 25px;
        margin-left: 20px;
      }
    }
    .credential-d {
      height: 220px;
      // background-color: red;
      display: flex;
      justify-content: space-around;
      .credential-dd {
        width: 300px;
        height: 180px;
        // background-color: green;
        margin-top: 9px;
        .p {
          font-size: 15px;
        }
      }
    }
  }
  .position {
    height: 400px;
    // background-color: chartreuse;
    margin-top: 40px;
    .position-a {
      height: 100px;
      // background-color: pink;
      font-size: 25px;
      line-height: 100px;
      margin-left: 20px;
    }
    .position-footer {
      display: flex;
      justify-content: space-around;
      .position-b {
        width: 500px;
        height: 160px;
        border-radius: 10px;
        border: 1px solid #e6e3e3;
        // background-color: blueviolet;
        overflow: hidden;
        .position-machine {
          height: 40px;
          // background-color: aqua;
          text-align: center;
          line-height: 40px;
          border-bottom: 1px solid #e6e3e3;
        }
        .position-city {
          height: 80px;
          // background-color: chocolate;
          border-bottom: 1px solid #e6e3e3;
          .position-btn {
            margin: 20px;
          }
        }
        .position-firm {
          height: 40px;

          padding-left: 20px;
          line-height: 40px;
        }
      }
    }
  }
}
</style>
