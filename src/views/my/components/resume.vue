<template>
  <div class="resume">
    <el-row>
      <el-col :span="17"
        ><div class="grid-content bg-purple">
          <div class="resume-left">
            <div class="resume-on-line">在线简历</div>
            <div class="personal-details">
              <Person :flag="flag" />
            </div>
            <div class="resume-job">
              <ResumePage />
            </div>
            <div class="preponderance">
              <Personal />
            </div>
            <div class="work">
              <Work />
            </div>
            <div class="personal-details">
              <Education />
            </div>
            <div class="project">
              <Project />
            </div>
            <div class="personal-details">
              <Credentials />
            </div>
          </div></div
      ></el-col>
      <el-col :span="5"
        ><div class="grid-content bg-purple-light">
          <div class="resume-right">
            <!-- <el-button type="primary" icon="el-icon-sell">上传简历</el-button> -->
            <Curriculum />
          </div></div
      ></el-col>
    </el-row>
  </div>
</template>
<script>
import Person from './person.vue'
import Work from './resume/work-page.vue'
import Personal from './resume/personal-page.vue'
import ResumePage from './resume/resume-page.vue'
import Education from './resume/education-page.vue'
import Project from './resume/project-page.vue'
import Credentials from './resume/credentials-page.vue'
import Curriculum from './resume/Curriculum-vitae.vue'
export default {
  components: { Person, ResumePage, Personal, Work, Education, Project, Credentials, Curriculum },
  data () {
    return {
      // 头部信息
      flag: false

    }
  },
  mounted () {

  },
  methods: {
    add () {
      this.show = true
    },
    reset (i) {
      this.show = i
      this.person = i
    },
    edit () {
      this.person = true
    }
  }
}
</script>
<style scoped lang="scss">
.resume {
  // display: flex;
  // border-right: 1px solid #e6e3e3;
  margin: 0;
  padding: 0;
  .resume-left {
    width: 100%;
    // height: 1000px;
    // background-color: red;
    border-right: 1px solid #e6e3e3;
    .resume-on-line {
      height: 50px;
      color: #256efd;
      font-weight: 600;
      font-size: 20px;
      padding: 12px 0 10px 25px;
      border-bottom: 1px solid #e6e3e3;
    }
    .resume-job {
      // height: 200px;
      border-bottom: 1px solid #e6e3e3;
    }
    .preponderance {
      // height: 200px;
      // background-color: #256efd;
      border-bottom: 1px solid #e6e3e3;
    }
    .work {
      border-bottom: 1px solid #e6e3e3;
    }
    .personal-details {
      border-bottom: 1px solid #e6e3e3;
    }
    .project {
      border-bottom: 1px solid #e6e3e3;
    }
  }
  .resume-right {
    // background-color: pink;
    // flex: 1;
  }
}
</style>
