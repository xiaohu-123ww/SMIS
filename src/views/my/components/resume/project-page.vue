<template>
  <div>
    <div class="preponderance-one">
      <el-row>
        <el-col :span="20"
          ><div class="grid-content bg-purple">项目经历</div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button
              v-if="!show"
              type="primary"
              icon="el-icon-plus"
              @click="edit"
              >编辑</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div v-if="!show">
      <!-- <WorkText :list="list" /> -->
    </div>
    <Project :show="show" @reset="reset" />
  </div>
</template>
<script>
import { confirm } from 'dropzone'
import Project from './project.vue'
import WorkText from './work-text.vue'
export default {
  components: {
    Project,
    WorkText
  },
  data () {
    return {
      show: false,
      list: {
        company: '',
        data: '',
        subject: '',
        specialty: '',
        text: ''
      }
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    edit () {
      console.log(1)
      this.show = true
    },
    reset (i) {
      this.show = i
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
</style>
