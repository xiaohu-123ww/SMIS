<template>
  <div>
    <div class="preponderance-one">
      <el-row>
        <el-col :span="20"
          ><div class="grid-content bg-purple">个人优势</div></el-col
        >
        <el-col :span="1"
          ><div v-if="!person" class="grid-content bg-purple-light">
            <el-button type="primary" icon="el-icon-edit" @click="edit"
              >编辑</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div
      v-if="!person"
      class="textare"
      style="white-space: pre-line; font-size: 15px; margin-top: 15px"
    >
      {{ text }}
    </div>
    <Personal :person="person" :text="text" @reset="reset" @writing="writing" />
  </div>
</template>
<script>
import Personal from './personal.vue'
export default {
  components: { Personal },
  data () {
    return {
      text: '1、具有较强的学习能力，认真刻苦，勤奋务实  \n2.工作责任心强，具有一定的团队合作能力、快速执行能力 \n 3、亲和力强，有耐心、沟通能力强，能很好地处理突发状况，应变能力强',
      // 个人优势
      person: false
    }
  },
  computed: {
    commendContent () {
      // this.commend.content是后端传回来的文本数据，就是要对这个数据进行处理
      const arr = this.text
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    }
  },
  mounted () {

  },
  methods: {
    reset (i) {
      this.person = i
    },
    edit () {
      this.person = true
    },
    writing (i) {
      this.text = i
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
.textare {
  // height: 150px;
  // background-color: #256efd;
  padding: 30px 80px;
  font-size: 14px;
  padding-top: 10px;
}
</style>
