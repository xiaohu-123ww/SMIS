<template>
  <div>
    <div class="preponderance-one">
      <div class="grid-content bg-purple" style="width: 92%">个人优势</div>
      <div
        v-if="!person"
        class="grid-content bg-purple-light"
        style="padding-right: 25px"
      >
        <el-button
          type="text"
          icon="el-icon-edit"
          style="margin-top: 10px"
          @click="edit"
          >编辑</el-button
        >
      </div>
    </div>
    <div
      v-if="!person"
      class="textare"
      style="white-space: pre-line; font-size: 15px; margin-top: 15px"
    >
      <div style="line-height: 30px" v-html="list.text"></div>
    </div>
    <Personal :person="person" :list="list" @reset="reset" />
  </div>
</template>
<script>
import Personal from './personal.vue'
import { getpersonal } from '@/api/my/resume'
export default {
  components: { Personal },
  data () {
    return {
      list: {
        text: ''
      },
      // 个人优势
      person: false

    }
  },
  computed: {
    commendContent () {
      // this.commend.content是后端传回来的文本数据，就是要对这个数据进行处理
      const arr = this.list.text
      return arr.map((item) => {
        return item === '\n' ? '<br>' : item
      }).join('')
    }
  },
  mounted () {
    this.getText()
  },
  created () {
    this.getText()
  },
  methods: {
    async getText () {
      const { data } = await getpersonal()
      console.log('个人优势', data)

      this.list.text = data.self_evaluation
    },
    reset (i) {
      this.person = i
    },
    edit () {
      this.person = true
    }

  }
}
</script>
<style scoped lang="scss">
.preponderance-one {
  height: 50px;
  display: flex;
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
  // padding-top: 10px;
}
</style>
