<template>
  <div style="hieght: auto">
    <div>
      <Person :flag="flag" />
    </div>
    <div class="center">
      <div class="communicate">
        <div class="communicate-1">已沟通</div>
        <div class="communicate-1 communicate-2">
          {{ list.num_of_communication }}
        </div>
      </div>
      <div class="communicate">
        <div class="communicate-1">已投递</div>
        <div class="communicate-1 communicate-2">{{ list.num_of_post }}</div>
      </div>
      <div class="communicate">
        <div class="communicate-1">面试</div>
        <div class="communicate-1 communicate-2">
          {{ list.num_of_interview }}
        </div>
      </div>
      <div class="communicate">
        <div class="communicate-1">收藏</div>
        <div class="communicate-1 communicate-2">
          {{ list.num_of_collection }}
        </div>
      </div>
      <!-- <div>2</div>
      <div>3</div> -->
    </div>
    <div class="footer">
      <div class="credential">
        <div class="credential-a">
          <div class="credential-b" style="width: 90%">我的证书</div>
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
          <div
            v-for="(item, index) in credential"
            :key="index"
            class="credential-dd"
          >
            <img
              :src="disposeImg(item.sample)"
              alt=""
              style="width: 300px; height: 180px"
            />
            <p style="font-size: 14px; padding-left: 45px">
              {{ item.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="position">
        <div class="position-a">精选职位</div>
        <div class="position-footer">
          <div v-for="(item, index) in job" :key="index" class="position-b">
            <div class="position-machine">
              <div
                style="
                  font-size: 20px;

                  width: 70%;
                  margin-left: 20px;
                "
              >
                {{ item.fullname ? item.fullname : '再无职业' }}
              </div>
              <span style="margin-right: 20px; color: red; font-size: 15px"
                >{{ item.salary_min }}k - {{ item.salary_max }}k·{{
                  item.salary_unit
                }}薪</span
              >
            </div>
            <div class="position-city">
              <button class="position-btn">{{ item.city.name }}</button>
              <button class="position-btn">
                {{ item.job_experience.name }}
              </button>
              <button class="position-btn">{{ item.education.name }}</button>
              <!-- <button>1-3年</button>
            <button>本科</button> -->
            </div>
            <div class="position-firm">{{ item.enterprise_name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Person from './person.vue'
import { getList } from '@/api/my/my'
import { getCertificate } from '@/api/position'
import { getHandpickJob } from '@/api/cat'
import disposeImg from '@/utils/disposeImg'
export default {
  components: { Person },
  data () {
    return {
      circleUrl: '',
      username: '',
      flag: true,
      list: {},
      credential: {},
      limit: 4,
      job: []
    }
  },
  mounted () {

  },
  created () {
    this.getName()
    this.getCertificateList()
    this.getJob()
  },
  methods: {
    // 用户数据
    async getName () {
      const { data } = await getList()
      console.log('用户数据', data)
      this.list = data
    },
    // 证书
    async getCertificateList () {
      const { data } = await getCertificate()
      console.log('证书', data.slice(0, 3))
      this.credential = data.slice(0, 3)
    },
    // 精选职位
    async getJob () {
      const { data } = await getHandpickJob(this.limit)
      console.log('精选职位', data)
      this.job = data.results
    }
  }
}
</script>
<style scoped lang="scss">
.header {
  height: 200px;
  // background-color: aqua;
  display: flex;
  // overflow: hidden;
  // justify-content: space-around;
  .head {
    // width: 1100px;
    // height: 200px;
    // // background-color: brown;
    // display: flex;
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
    box-shadow: 8px 8px 1px 1px #1890ff63;
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
        // width: 1065px;
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
      flex-wrap: wrap;
      .position-b {
        width: 450px;
        height: 160px;
        border-radius: 10px;
        border: 1px solid #e6e3e3;
        // background-color: blueviolet;
        overflow: hidden;
        margin-bottom: 20px;
        .position-machine {
          height: 40px;
          // background-color: aqua;
          // text-align: center;
          line-height: 40px;
          border-bottom: 1px solid #e6e3e3;
          display: flex;
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
