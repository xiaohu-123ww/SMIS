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
              style="margin-top: 10px"
              @click="edit"
              >编辑</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div v-if="!show">
      <div v-if="ematy">
        <WorkText
          :list="list"
          @projectExperiences="projectExperiences"
          @open="open"
        />
      </div>
      <el-empty v-else description="再无项目经历" :image-size="150"></el-empty>
    </div>
    <Project :show="show" :num="num" @reset="reset" />
  </div>
</template>
<script>
import { confirm } from 'dropzone'
import Project from './project.vue'
import WorkText from './work-text.vue'
import { getProjectList } from '@/api/my/resume'
export default {
  components: {
    Project,
    WorkText
  },
  data () {
    return {
      show: false,
      list: [],
      ematy: true,
      num: {}
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.getList()
  },
  methods: {
    edit () {
      console.log(1)
      this.show = true
    },
    reset (i) {
      this.show = i
      this.getList()
    },
    async getList () {
      const res = await getProjectList()
      console.log('项目', res)
      if (res.data.results.length === 0) {
        this.ematy = false
      }
      this.list = res.data.results
    },
    projectExperiences () {
      this.getList()
    },
    open (i, item) {
      this.show = i
      console.log(item)
      this.num = item
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
