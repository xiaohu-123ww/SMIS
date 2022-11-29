<template>
  <div class="post-list">
    <div class="postList-one">
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple">
            <div class="postList">
              <div
                v-for="(item, index) in inRecruitList"
                :key="index"
                class="job-job"
              >
                <div class="grid-content bg-purple">
                  <div style="display: flex">
                    <div class="job-mechanical" style="width: 500px">
                      <div
                        class="mechanical"
                        style="width: 500px; display: flex"
                      >
                        <div style="width: 240px" @click="particulars(item)">
                          <a href="javascript:;">
                            {{ item.fullname }} {{ item.city.name }}</a
                          >
                        </div>
                        <el-button
                          type="primary"
                          round
                          class="el-bt"
                          style="margin-top: 5px"
                          @click="particulars(item)"
                          >立即沟通</el-button
                        >
                      </div>
                      <div
                        class="machan"
                        style="border-bottom: 1px solid #e6e3e3"
                      >
                        <div class="machan-aa">
                          {{ item.salary_min }}-{{ item.salary_max }} .
                          {{ item.salary_unit }}薪
                        </div>
                        <div
                          class="machan-bb"
                          style="border-right: 1px solid #e6e3e3"
                        >
                          {{ item.job_experience.name }}
                        </div>
                        <div class="machan-bb">{{ item.education.name }}</div>
                      </div>
                      <div class="equipment">
                        <div
                          v-for="(itemss, index) in item.tag"
                          :key="index"
                          class="equiment-ff"
                        >
                          {{ itemss }}
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div style="width: 500px; display: flex">
                      <div
                        class="job-mechanical"
                        style="width: 350px; border: 0"
                      >
                        <div class="mechanical">{{ firm }}</div>
                        <div
                          class="machan"
                          style="border-bottom: 1px solid #e6e3e3"
                        >
                          <div class="machan-aa">
                            {{ item.field_name[0].name }}
                          </div>
                          <div
                            class="machan-bb"
                            style="border-right: 1px solid #e6e3e3"
                          >
                            {{ nature }}
                          </div>
                          <div class="machan-bb" style="width: 120px">
                            {{ size }}人
                          </div>
                        </div>
                        <div class="equipment">
                          <div
                            style="
                              padding-top: 10px;
                              font-size: 12px;
                              color: #878484;
                              padding-left: 40px;
                            "
                          >
                            {{ text }}
                          </div>
                        </div>
                      </div>
                      <div
                        style="width: 60px; height: 60px; margin: 10px 0 0 20px"
                      >
                        <img
                          alt=""
                          style="width: 60px; height: 60px"
                          :src="image"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div></div></el-col
      ></el-row>
    </div>
  </div>
</template>
<script>
import disposeImg from '@/utils/disposeImg'
export default {
  props: {
    inRecruitList: {
      type: Array
    },
    firm: {
      type: String
    },
    image: {
      type: String
    },
    nature: {
      type: String
    },
    size: {
      type: String
    },
    text: {
      type: String
    }
  },
  data () {
    return {

    }
  },
  computed: {

  },
  watch: {},
  created () { },
  methods: {
    particulars (item) {
      console.log('简历详情', item)
      this.$router.push({
        path: '/state',
        name: 'state',
        query: { id: item.id }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.postList-one {
  // display: flex;
  width: 100%;
  position: relation;
  margin: 0 auto;
  .postList {
    margin-top: 10px;
    height: 100%;
    // background-color: #fff;
    .job-job {
      height: 140px;
      border: 1px solid #e6e3e3;
      background-color: #fff;
      // display: flex;
      // justify-content: space-evenly;
      border-radius: 20px;
      padding-top: 20px;
      margin-bottom: 30px;
      .machan-sss {
        width: 60px;
        height: 60px;
        // background-color: #256efd;
      }
      .el-bt {
        width: 100px;
        height: 28px;
        line-height: 4px;
        margin-left: 50px;
      }
      .job-mechanical {
        width: 100%;
        height: 80px;
        // background-color: aqua;
        // border-bottom: 1px solid #999;
        .equipment {
          height: 38px;
          // background-color: #256efd;
          display: flex;
          // padding-left: 20px;
          .equiment-ff {
            // width: 70px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border: 1px solid #bfbbbb;
            background-color: rgba(230, 227, 238, 0.836) 4;
            margin-top: 9px;
            color: #878484;
            margin-left: 40px;
          }
        }
        .mechanical {
          height: 40px;
          // background-color: #256efd;
          font-size: 16px;
          line-height: 40px;
          padding-left: 30px;
          color: #256efd;
          font-weight: 700;
        }
        .image {
          width: 400px;
          // background-color: red;
        }
        .machan {
          height: 40px;
          // background-color: pink;
          // border-bottom: 1px solid #e6e3ee;
          display: flex;
          font-size: 15px;
          .machan-aa {
            width: 200px;
            height: 20px;
            // background-color: #256efd;
            border-right: 1px solid #e6e3e3;
            line-height: 20px;
            padding-left: 30px;
            // color: red;
          }
          .machan-bb {
            width: 100px;
            height: 20px;
            // background-color: greenyellow;
            line-height: 20px;
            padding-left: 20px;
            // margin-right: 10px;
          }
          .machan-cc {
            width: 100px;
            height: 20px;
            // background-color: #256efd;
            border-right: 1px solid #e6e3e3;
            line-height: 20px;
            padding-left: 30px;
          }
        }
      }
    }
  }
  .record {
    // width: 300px;
    // height: 1000px;
    background-color: #fff;
    margin: 10px 0 0 20px;
    border-radius: 20px;
    .record-aa {
      height: 45px;
      // background-color: #256efd;
      // border-bottom: 1px solid #e6e3e3;
      font-size: 18px;
      padding: 12px;
      color: #256efd;
    }
    .record-box {
      // height: 80px;
      // background-color: pink;
      padding: 12px;
      font-size: 16px;
      // border-bottom: 1px solid #e6e3e3;
      .record-row {
        height: 40px;
        // background-color: #256efd;
        line-height: 30px;
        font-size: 15px;
      }
    }
  }
}
</style>
