<template>
  <div>
    <div>
      <div class="resume-job-one">
        <el-row>
          <el-col :span="20"
            ><div class="grid-content bg-purple">求职意向</div></el-col
          >
          <el-col :span="1"
            ><div class="grid-content bg-purple-light">
              <el-button
                v-if="!show"
                type="primary"
                icon="el-icon-plus"
                @click="add"
                >添加</el-button
              >
              <el-button
                v-if="show"
                type="primary"
                icon="el-icon-edit"
                @click="add"
                >编辑</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
      <div v-if="!show" class="resume-job-two" style="margin-top: 20px">
        <el-row>
          <el-col :span="17"
            ><div class="grid-content bg-purple">职位名称</div></el-col
          >
          <el-col :span="2"
            ><div class="grid-content bg-purple-light">
              <el-button type="primary" icon="el-icon-edit">编辑</el-button>
            </div></el-col
          >
          <el-col :span="3"
            ><div
              class="grid-content bg-purple-light"
              style="margin-left: 30px"
            >
              <el-button type="success" icon="el-icon-delete">删除</el-button>
            </div></el-col
          >
        </el-row>
        <div class="resum-jobs">
          <el-row>
            <el-col :span="12"><div class="grid">期望薪资：</div></el-col>
            <el-col :span="12"><div class="grid">期望城市：</div></el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><div class="grid">期望薪资：</div></el-col>
            <el-col :span="12"><div class="grid">期望城市：</div></el-col>
          </el-row>
        </div>
      </div>
    </div>
    <ResumeDialog :show="show" @reset="reset" />
  </div>
</template>
<script>
import ResumeDialog from './resumeDialog.vue'
export default {
  components: { ResumeDialog },
  data () {
    return {
      // 求职意向
      show: false
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    add () {
      this.show = true
    },
    reset (i) {
      this.show = i
    }
  }
}
</script>
<style scoped lang="scss">
.resume-job-one {
  // height: 40px;
  // background-color: red;
  // border-bottom: 1px solid #e6e3e3;
  font-size: 20px;
  padding-left: 25px;
  .bg-purple {
    margin-top: 20px;
    color: #256efd;
    font-weight: 600;
  }
  .bg-purple-light {
    margin-top: 15px;
  }
}
.resume-job-two {
  // height: 150px;
  .bg-purple {
    margin: 20px 0 0 50px;
    font-size: 20px;
  }
  .bg-purple-light {
    margin-top: 10px;
    padding-left: 10px;
  }
  .resum-jobs {
    height: 130px;

    .grid {
      margin: 30px 0 0 70px;
      font-size: 18px;
    }
  }
}
</style>
