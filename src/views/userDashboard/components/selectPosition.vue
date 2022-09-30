<template>
  <div>
    <div class="select">
      <el-row>
        <el-col v-for="item in list" :key="item.id" :span="8"
          ><div class="grid-content bg-purple">
            <div class="position-b">
              <div class="position-machine">
                <span style="font-size: 18px; margin-top: 20px">
                  {{ item.name }}
                </span>
                <span style="margin-left: 90px; color: red; font-size: 15px">{{
                  item.money
                }}</span>
              </div>
              <div v-for="bt in item.education" :key="bt" class="position-city">
                <button class="position-btn">{{ bt }}</button>
              </div>
              <div class="position-firm">{{ item.company }}</div>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
    <div class="listChange"><i class="el-icon-refresh-left"></i>换一批</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          id: 1,
          name: '机械视觉工程师',
          money: '8000-15000.12薪',
          education: ['北京', '1-3年', '本科'],
          company: '北京智能智造科技有限公司'
        },
        {
          id: 2,
          name: '机械视觉工程师',
          money: '8000-15000.12薪',
          education: ['北京', '1-3年', '本科'],
          company: '北京智能智造科技有限公司'
        },
        {
          id: 3,
          name: '机械视觉工程师',
          money: '8000-15000.12薪',
          education: ['北京', '1-3年', '本科'],
          company: '北京智能智造科技有限公司'
        },
        {
          id: 4,
          name: '机械视觉工程师',
          money: '8000-15000.12薪',
          education: ['北京', '1-3年', '本科'],
          company: '北京智能智造科技有限公司'
        }, {
          id: 5,
          name: '机械视觉工程师',
          money: '8000-15000.12薪',
          education: ['北京', '1-3年', '本科'],
          company: '北京智能智造科技有限公司'
        }, {
          id: 6,
          name: '机械视觉工程师',
          money: '8000-15000.12薪',
          education: ['北京', '1-3年', '本科'],
          company: '北京智能智造科技有限公司'
        }
      ]
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

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
      text-align: center;
      line-height: 40px;
      border-bottom: 1px solid #e6e3e3;
    }
    .position-city {
      height: 80px;
      width: 132.5px;
      // background-color: chocolate;
      display: inline-block;
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
.listChange {
  // width: 80px;
  height: 30px;
  // background-color: aqua;
  font-size: 18px;
  // margin-left: 600px;
  text-align: center;
}
</style>
