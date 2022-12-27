<template>
  <div>
    <div v-for="item in list" :key="item.id" class="job">
      <div v-if="item.position_info.hr_info" class="job-nn">
        <div class="job-one">
          <div class="bg">
            <img
              :src="disposeImg(item.position_info.hr_info.avatar)"
              alt=""
              style="width: 80px; height: 80px; border-radius: 100px"
            />
          </div>
          <div class="blur">
            <h3>{{ item.position_info.hr_info.name }}</h3>
            <div style="color: #403f3f">
              {{ item.position_info.hr_info.identification }} .
              {{ item.position_info.hr_info.active }}
            </div>
          </div>
        </div>
        <div class="job-nnkj">
          <el-button
            type="primary"
            @click="cancel(item.position_info.position_info.position_id)"
            >取消收藏</el-button
          >
        </div>
      </div>
      <div v-if="!item.position_info.hr_info" style="display: flex">
        <div style="width: 80%"></div>
        <el-button
          class="numvvv"
          type="primary"
          @click="cancel(item.position_info.position_info.position_id)"
          >取消收藏</el-button
        >
      </div>
      <div class="job-job">
        <div class="job-mechanical">
          <div class="mechanical">
            {{ item.position_info.position_info.position_name }}
            {{ item.position_info.position_info.city }}
          </div>
          <div class="machan">
            <div class="machan-aa">
              {{ item.position_info.position_info.salary_left }}-
              {{ item.position_info.position_info.salary_right }} .
              {{ item.position_info.position_info.salary_unit }}薪
            </div>
            <div class="machan-bb" style="border-right: 1px solid #e6e3e3">
              {{ item.position_info.position_info.experience }}
            </div>
            <div class="machan-bb">
              {{ item.position_info.position_info.education }}
            </div>
          </div>
        </div>
        <div>
          <div class="job-mechanical">
            <div class="mechanical">
              {{ item.position_info.enterprise_info.name }}
            </div>
            <div class="machan">
              <div class="machan-cc">
                {{ item.position_info.enterprise_info.field }}
              </div>
              <div class="machan-cc" style="border-right: 1px solid #e6e3e3">
                {{ item.position_info.enterprise_info.finance }}
              </div>
              <div class="machan-cc">
                {{ item.position_info.enterprise_info.size }}
              </div>
            </div>
          </div>
        </div>
        <div class="machan-sss">
          <img
            :src="disposeImg(item.position_info.enterprise_info.logo)"
            alt=""
            style="width: 90px; height: 90px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import disposeImg from '@/utils/disposeImg'
import { getCollectionsDelete } from '@/api/particulars'
export default {
  props: {
    show: {
      type: Boolean
    },
    list: {
      type: Array
    }
  },
  data () {
    return {
      collectList: {
        collects: ''
      }

    }
  },
  computed: {

  },
  watch: {
    list (newVal, oldVal) {
      if (newVal) {
        console.log('12', newVal)
      }
    }
  },
  mounted () {

  },
  methods: {
    async cancel (id) {
      console.log(id)

      this.collectList.collects = id.toString()
      console.log(this.collectList)
      const res = await getCollectionsDelete(this.collectList)
      console.log('取消收藏', res)
      this.$message.success('取消收藏成功')
      this.$emit('reset')
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
    width: 80%;
    // background-color: #256efd;
    display: flex;
    .bg {
      width: 100px;
      height: 100px;
      // background-color: aqua;
      margin: 0 20px;
    }
    .blur {
      width: 300px;
      // background-color: red;
      font-size: 15px;
    }
  }
  .job-nnkj {
    // margin: 30px 0 0 615px;
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
          width: 150px;
          height: 20px;
          // background-color: #256efd;
          // border-right: 1px solid #e6e3e3;
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
          // padding: 10px;
          // background-color: #256efd;
          border-right: 1px solid #e6e3e3;
          line-height: 20px;
          padding: 0 10px 0 20px;
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
.numvvv {
  margin: 10px 0px 15px;
}
</style>
