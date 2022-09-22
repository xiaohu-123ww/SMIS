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
      <WorkText :list="list" />
    </div>

    <Work :work="work" @reset="reset" />
  </div>
</template>
<script>
import Work from './work.vue'
import WorkText from './work-text.vue'
export default {
  components: { Work, WorkText },
  data () {
    return {
      // 工作经历
      work: false,
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
