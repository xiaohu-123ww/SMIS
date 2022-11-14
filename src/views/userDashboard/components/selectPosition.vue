<template>
  <div>
    <div class="select">
      <el-row>
        <el-col v-for="(item, index) in positionJob" :key="index" :span="8">
          <el-card class="position-b" style="height: 180px">
            <div class="grid-content bg-purple" @click="cardChange(item)">
              <div class="position-b">
                <div class="position-machine">
                  <span class="fullname">
                    {{ item.fullname ? item.fullname : '再无职业' }}
                  </span>
                  <span style="margin-left: 40px; color: red; font-size: 15px">
                    {{ item.salary_min }}-{{ item.salary_max }}.{{
                      item.salary_unit
                    }}薪</span
                  >
                </div>
                <div class="position-city">
                  <button class="position-btn">{{ item.city.name }}</button>
                  <button class="position-btn">
                    {{ item.job_experience.name }}
                  </button>
                  <button class="position-btn">
                    {{ item.education.name }}
                  </button>
                </div>
                <div class="position-firm">{{ item.enterprise_name }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-if="show" class="listChange">
      <el-button
        type="text"
        class="el-icon-refresh-left"
        style="color: black; font-size: 18px"
        :disabled="isLock"
        @click="pickJob"
        >换一批</el-button
      >
    </div>
    <div v-else class="listChange" @click="hotJob">
      <el-button
        type="text"
        class="el-icon-refresh-left"
        style="color: black; font-size: 18px"
        :disabled="isLock"
        @click="hotJob"
        >换一批</el-button
      >
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
    },
    imprison: {
      type: Boolean
    }
  },
  data () {
    return {
      state: 0,
      pick: 1,
      isLock: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    hotJob () {
      this.isLock = true
      setTimeout(() => {
        this.isLock = false
        this.state++
        this.$emit('changeHot', this.state)
        console.log(1)
      }, 1000)
    },
    pickJob () {
      console.log(2)

      this.isLock = true
      setTimeout(() => {
        this.isLock = false
        this.pick++
        this.$emit('changePick', this.pick)
      }, 1000)
    },
    cardChange (item) {
      console.log(item)
      this.$router.push({
        path: '/state',
        name: 'state',
        query: { id: item.id }
      })
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
    // border: 1px solid #e6e3e3;
    background-color: rbg(255, 255, 255);
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
::v-deep .el-card:hover {
  box-shadow: 0 0 10px 20px rgba(255, 255, 255, 0.932);

  border-color: rgb(236, 231, 231);
  transition: all 0.2s ease-in-out;
}
.pro {
  pointer-events: none;
  color: black;
}
</style>
