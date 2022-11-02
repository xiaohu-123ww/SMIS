<template>
  <div>
    <div class="preponderance-one">
      <el-row>
        <el-col :span="20"
          ><div class="grid-content bg-purple">工作经历</div></el-col
        >
        <el-col :span="1"
          ><div v-if="!work" class="grid-content bg-purple-light">
            <el-button type="primary" icon="el-icon-plus" @click="workEdit"
              >添加</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div v-if="!work">
      <WorkText v-if="empty" :list="list" />
      <el-empty v-else :image-size="150" description="再无工作经历"></el-empty>
    </div>
    <Work :work="work" @reset="reset" />
  </div>
</template>
<script>
import Work from './work.vue'
import WorkText from './work-text.vue'
import { getexperiences } from '@/api/my/resume'
export default {
  components: { Work, WorkText },
  data () {
    return {
      // 工作经历
      work: false,
      list: [],
      empty: true
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
    async getList () {
      const { data } = await getexperiences()
      console.log('工作经历', data)
      this.list = data.results
      if (data.results.length === 0) {
        this.empty = false
      }
      this.list = data.results
    },
    reset (i) {
      this.work = i
    },
    workEdit () {
      this.work = true
    },
    edit (row) {
      // this.work = true
      console.log(row)
    }
  }
}
</script>
<style scoped lang="scss">
.preponderance-one {
  height: 50px;
  // background-color: aqua;
  margin-top: 10px;
  .bg-purple {
    color: #256efd;
    font-weight: 600;
    font-size: 20px;
    margin: 15px 0 0 25px;
  }
}
.textarea {
  // height: 300px;
  // background-color: pink;
  margin: 15px 0 0 25px;
}
</style>
