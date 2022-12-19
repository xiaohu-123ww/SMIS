<template>
  <div>
    <div
      v-for="item in list"
      :key="item.id"
      class="job"
      :class="{ set: list.length === 1 }"
    >
      <div v-if="item.comm_class === 'HR发起'" class="job-nn">
        <div class="job-one">
          <div class="bg">
            <img
              :src="disposeImg(item.sender.avatar)"
              alt=""
              style="width: 90px; height: 90px; border-radius: 100px"
            />
          </div>
          <div class="blur">
            <h3>{{ item.sender.sender_name }}</h3>
            <div style="color: #403f3f">
              {{ item.sender.sender_class }} . {{ item.sender.online_status }}
            </div>
          </div>
        </div>
        <div class="job-nnkj">
          <el-button
            v-if="show === 1"
            type="primary"
            @click="likeChange(item.id)"
            >感兴趣</el-button
          >
          <div v-if="show === 2">
            <el-button
              type="primary"
              :disabled="item.is_refresh_valid === false"
              @click="remindSomeone(item.id)"
              >提醒对方</el-button
            >
          </div>
          <div v-if="show === 3">
            <el-button
              v-if="item.is_cv_exchanged === false"
              type="primary"
              @click="exChange(item.id)"
              >发送简历</el-button
            >
            <el-button
              v-if="item.is_cv_exchanged === null"
              type="primary"
              :disabled="item.is_cv_exchanged === null"
              >发送简历</el-button
            >
            <el-button v-if="item.is_cv_exchanged === true" type="primary"
              >已发送</el-button
            >
          </div>
        </div>
      </div>
      <div v-if="item.comm_class === '求职者发起'" class="job-nn">
        <div class="job-one">
          <div class="bg">
            <img
              :src="disposeImg(item.receiver.avatar)"
              alt=""
              style="width: 90px; height: 90px; border-radius: 100px"
            />
          </div>
          <div class="blur">
            <h3>{{ item.receiver.receiver_name }}</h3>
            <div style="color: #403f3f">
              {{ item.receiver.receiver_class }} .
              {{ item.receiver.online_status }}
            </div>
          </div>
        </div>
        <div class="job-nnkj">
          <el-button
            v-if="show === 1"
            type="primary"
            @click="likeChange(item.id)"
            >感兴趣</el-button
          >
          <div v-if="show === 2">
            <el-button
              type="primary"
              :disabled="item.is_refresh_valid === false"
              @click="remindSomeone(item.id)"
              >提醒对方</el-button
            >
          </div>
          <div v-if="show === 3">
            <el-button
              v-if="item.is_cv_exchanged === false"
              type="primary"
              @click="exChange(item.id)"
              >发送简历</el-button
            >
            <el-button
              v-if="item.is_cv_exchanged === null"
              type="primary"
              :disabled="item.is_cv_exchanged === null"
              >发送简历</el-button
            >
            <el-button v-if="item.is_cv_exchanged === true" type="primary"
              >已发送</el-button
            >
          </div>
        </div>
      </div>
      <div class="job-job">
        <div class="job-mechanical">
          <div class="mechanical">
            {{ item.position.position_name }} [{{ item.position.city[0]
            }}{{ item.position.city[1] }}{{ item.position.city[2] }}]
          </div>
          <div class="machan">
            <div class="machan-aa">
              {{ item.position.salary_min }}- {{ item.position.salary_max }} .
              {{ item.position.salary_unit }}薪
            </div>
            <div class="machan-bb" style="border-right: 1px solid #e6e3e3">
              {{ item.position.job_experience }}
            </div>
            <div class="machan-bb">{{ item.position.education }}</div>
          </div>
        </div>
        <div>
          <div class="job-mechanical">
            <div class="mechanical">
              {{ item.position.enterprise.enterprise_name }}
            </div>
            <div class="machan">
              <div class="machan-cc">
                {{ item.position.enterprise.enterprise_field }}
              </div>
              <div class="machan-cc" style="border-right: 1px solid #e6e3e3">
                {{ item.position.enterprise.financing_status }}
              </div>
              <div class="machan-cc">{{ item.position.enterprise.size }}</div>
            </div>
          </div>
        </div>
        <div class="machan-sss">
          <img
            :src="disposeImg(item.position.enterprise.logo)"
            alt=""
            style="width: 90px; height: 90px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getInterestsLike, getRefrssh, getChatingId } from '@/api/my/job'
import disposeImg from '@/utils/disposeImg'
export default {
  props: {
    show: {
      type: Number
    },
    list: {
      type: Array
    }

  },
  data () {
    return {
      offset: 1,
      limit: 5
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    // 感兴趣
    async likeChange (id) {
      const res = await getInterestsLike(id)
      console.log('感兴趣', res)
      this.$message.success('以添加到沟通列表')
      this.$emit('like')
    },
    // 提醒对方
    async remindSomeone (id) {
      const res = await getRefrssh(id)
      console.log('提醒', res)
      if (res.code === 200) {
        this.$message.success('已提醒hr,稍后回复您')
      } else {
        this.$message.warning(res.data.msg)
      }
      this.$emit('remind')
    },
    // 发送简历
    async exChange (id) {
      const res = await getChatingId(id)
      console.log('发送简历', res)
      if (res.code === 200) {
        this.$message.success('已发送至hr邮箱')
      } else {
        this.$message.success(res.data.msg)
      }
    }
  }
}
</script>
<style scoped lang="scss">
.job {
  height: 230px;
  // background-color: #256efd;
  margin: 30px;
  .job-nn {
    height: 100px;
    // background-color: pink;
    display: flex;
  }
  .job-one {
    height: 100px;
    width: 88%;
    // background-color: #256efd;
    display: flex;
    .bg {
      width: 100px;
      height: 100px;
      // background-color: aqua;
      border-radius: 100px;
      overflow: hidden;
      margin: 0 20px;
    }
    .blur {
      width: 300px;
      // background-color: red;
      font-size: 15px;
    }
  }
  .job-nnkj {
    margin: 30px 0 0 0px;
  }
  .job-job {
    height: 130px;
    border: 1px solid #e6e3e3;
    // background-color: red;
    display: flex;
    justify-content: space-evenly;
    border-radius: 20px;
    padding: 20px;
    .job-mechanical {
      width: 400px;
      height: 80px;
      // background-color: aqua;
      .mechanical {
        height: 40px;
        // background-color: #256efd;
        font-size: 15px;
        line-height: 40px;
        padding-left: 20px;
      }
      .machan {
        height: 40px;
        // background-color: pink;
        display: flex;
        font-size: 15px;
        .machan-aa {
          // width: 150px;
          height: 20px;
          padding: 0px 15px 0px 0px;
          // background-color: #256efd;
          border-right: 1px solid #e6e3e3;
          line-height: 20px;
          padding-left: 20px;
          color: red;
        }
        .machan-bb {
          // width: 70px;
          height: 20px;
          padding: 0px 15px 0px 0px;
          // background-color: greenyellow;
          line-height: 20px;
          padding-left: 20px;
        }
        .machan-cc {
          // width: 100px;
          height: 20px;
          // background-color: #256efd;
          padding: 0 20px;
          border-right: 1px solid #e6e3e3;
          line-height: 20px;
          padding-left: 20px;
        }
      }
    }
    .machan-sss {
      width: 80px;
      height: 80px;
      // background-color: #256efd;
    }
  }
}
.set {
  height: 500px;
}
</style>
