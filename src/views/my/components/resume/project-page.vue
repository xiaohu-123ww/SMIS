<template>
  <div>
    <div class="preponderance-one">
      <div class="grid-content bg-purple" style="width: 92%">项目经历</div>

      <div class="grid-content bg-purple-light">
        <el-button
          v-if="!show"
          type="text"
          icon="el-icon-plus"
          style="margin-top: 10px"
          @click="edit"
          >添加</el-button
        >
      </div>
    </div>

    <div v-if="!show">
      <div>
        <WorkText
          :list="list"
          @projectExperiences="projectExperiences"
          @open="open"
        />
      </div>
      <div
        v-if="list.length === 0"
        style="height: 400px; background-color: #fff"
      >
        <img
          src="../../../../assets/imgs/xiang.png"
          alt=""
          style="width: 320px; height: 270px; margin: 20px 0 0 340px"
        />
      </div>
      <!-- <el-empty v-else description="再无项目经历" :image-size="150"></el-empty> -->
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
  padding-right: 25px;
  display: flex;
  .bg-purple {
    color: #256efd;
    font-weight: 600;
    font-size: 20px;
    margin: 15px 0 0 25px;
  }
}
</style>
