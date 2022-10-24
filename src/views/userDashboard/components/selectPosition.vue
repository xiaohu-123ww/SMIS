<template>
  <div>
    <div class="select">
      <el-row>
        <el-col v-for="item in positionJob" :key="item.id" :span="8"
          ><div class="grid-content bg-purple">
            <div class="position-b">
              <div class="position-machine">
                <span class="fullname">
                  {{ item.fullname ? item.fullname : '再无职业' }}
                </span>
                <span style="margin-left: 90px; color: red; font-size: 15px">
                  {{ item.salary_min }}-{{ item.salary_max }}.{{
                    item.salary_unit
                  }}薪</span
                >
              </div>
              <div class="position-city">
                <button class="position-btn">{{ item.city }}</button>
                <button class="position-btn">{{ item.job_experience }}</button>
                <button class="position-btn">{{ item.education }}</button>
              </div>
              <div class="position-firm">{{ item.enterprise_name }}</div>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
    <div v-if="show" class="listChange" @click="pickJob">
      <a href="javascript:;"><i class="el-icon-refresh-left"></i>换一批</a>
    </div>
    <div v-else class="listChange" @click="hotJob">
      <a href="javascript:;"><i class="el-icon-refresh-left"></i>换一批</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    positionJob: {
      type: Array
    },
    show: {
      type: Boolean
    }
  },
  data () {
    return {
      state: 1,
      pick: 1
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    hotJob () {
      this.state++
      this.$emit('changeHot', this.state)
      console.log(1)
    },
    pickJob () {
      console.log(2)
      this.pick++
      this.$emit('changePick', this.pick)
    }
  }
}
</script>
<style scoped lang="scss">
.select {
  display: inline-block;
  height: 400px;
  display: flex;
  // flex-flow: wrap;
  // flex-flow: wrap;
  // width: 100%;
  // justify-content: space-between;
  align-items: center;
  // background-color: red;

  .position-b {
    // width: 400px;
    height: 160px;
    border-radius: 10px;
    border: 1px solid #e6e3e3;
    // background-color: blueviolet;
    margin: 0 10px 10px 0;
    overflow: hidden;
    .position-machine {
      height: 40px;
      // background-color: aqua;
      // text-align: center;
      line-height: 40px;
      border-bottom: 1px solid #e6e3e3;
      .fullname {
        display: inline-block;
        font-size: 18px;
        width: 200px;
        height: 40px;
        padding-left: 15px;
        // background-color: pink;
      }
    }
    .position-city {
      height: 80px;
      // width: 132.5px;
      // background-color: chocolate;
      display: flex;
      border-bottom: 1px solid #e6e3e3;
      .position-btn {
        margin: 20px 15px;
        height: 20px;
      }
    }
    .position-firm {
      height: 40px;
      padding-left: 15px;
      line-height: 40px;
      font-size: 14px;
      color: #999;
    }
  }
}
.listChange {
  // width: 80px;
  height: 30px;
  // background-color: aqua;
  font-size: 18px;
  // margin-left: 600px;
  text-align: center;
}
</style>
