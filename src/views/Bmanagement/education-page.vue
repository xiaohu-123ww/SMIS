<template>
  <div>
    <div class="preponderance-one">
      <el-row>
        <el-col :span="20"
          ><div class="grid-content bg-purple">个人优势</div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button type="primary" icon="el-icon-edit" @click="edit"
              >添加</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div class="work">
      <div class="school">el-ro</div>
      <Education :show="show" />
    </div>
  </div>
</template>
<script>
import Education from './education'
export default {
  components: { Education },
  data () {
    return {
      show: false,
      list: [{
        company: '',
        data: '',
        subject: '',
        specialty: '',
        text: ''
      },
      {
        company: '',
        data: '',
        subject: '',
        specialty: '',
        text: ''
      }
      ]
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    edit () {
      this.show = true
    }
  }
}
</script>
<style scoped lang="scss">
.preponderance-one {
  height: 50px;
  // background-color: aqua;
  .bg-purple {
    color: #256efd;
    font-weight: 600;
    font-size: 20px;
    margin: 15px 0 0 25px;
  }
}
.work {
  // height: 100px;
  // background-color: red;
  margin-left: 20px;
  .school {
    // background-color: #256efd;
    line-height: 40px;
    font-size: 15px;
    .bg {
      font-size: 15px;
    }
    .bg-purple-light {
      color: #bcb9b9;
    }
  }
  .education {
    height: 30px;
    // background-color: #256efd;
    padding-left: 20px;
  }
}
</style>
