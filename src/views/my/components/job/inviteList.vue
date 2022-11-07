<template>
  <div>
    <div v-for="item in listInvite" :key="item.id" class="job">
      <div class="job-nn">
        <div class="job-one">
          <div class="bg">
            <img
              :src="disposeImg(item.hr.avatar)"
              alt=""
              style="width: 80px; height: 80px; border-radius: 100px"
            />
          </div>
          <div class="blur">
            <h3>{{ item.hr.name }}</h3>
            <div style="color: #403f3f">
              {{ item.hr.identification }} . {{ item.hr.active }}
            </div>
          </div>
        </div>
      </div>
      <div class="job-job">
        <div class="job-mechanical">
          <div class="mechanical">
            {{ item.position.position_name }} [{{
              item.position.city.second
            }}-{{ item.position.city.third }}]
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
          <div
            style="
              width: 400px;
              height: 30px;

              margin-left: 19px;
              padding-top: 5px;
              font-size: 15px;
            "
          >
            <span style="color: red; margin-right: 40px">
              {{ item.interview_status }}</span
            >
            {{ item.create_time }}
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
import { getInterestsLike, getRefrssh } from '@/api/my/job'
import disposeImg from '@/utils/disposeImg'
export default {
  props: {
    show: {
      type: Number
    },
    listInvite: {
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
      this.$emit('like')
    },
    // 提醒对方
    async remindSomeone (id) {
      const res = await getRefrssh(id)
      console.log('提醒', res)
      this.$emit('remind')
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
    width: 400px;
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
    margin: 30px 0 0 615px;
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
      height: 70px;
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
          width: 150px;
          height: 20px;
          // background-color: #256efd;
          border-right: 1px solid #e6e3e3;
          line-height: 20px;
          padding-left: 20px;
          color: red;
        }
        .machan-bb {
          width: 70px;
          height: 20px;
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
      background-color: #256efd;
    }
  }
}
</style>
