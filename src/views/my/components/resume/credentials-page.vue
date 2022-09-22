<template>
  <div class="box">
    <div class="preponderance-one">
      <el-row>
        <el-col :span="20"
          ><div class="grid-content bg-purple">资格证书</div></el-col
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
    <div v-if="!show" class="credentials">
      <el-row>
        <el-col :span="7"
          ><div class="grid-content bg-purple">
            <img
              src="../../../../assets/imgs/zhengshu.png"
              alt=""
              style="width: 160px; height: 100px"
            /></div
        ></el-col>
        <el-col :span="10"
          ><div class="grid-content bg-purple-light">
            {{ text ? text : 'XXXXX级证书' }}
          </div></el-col
        >
        <el-col :span="3"
          ><div class="grid-content bg-purple">
            <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          </div>
        </el-col>
        <el-col :span="2"
          ><div class="grid-content bg-purple-light">
            <el-button type="success" icon="el-icon-delete">删除</el-button>
          </div></el-col
        >
      </el-row>
    </div>

    <div>
      <Credentials :show="show" @reset="reset" />
    </div>
  </div>
</template>
<script>
import Credentials from './credentials.vue'
export default {
  components: { Credentials },
  data () {
    return {
      show: false,
      text: ''
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    edit () {
      this.show = true
    },
    reset (i) {
      this.show = i
    }
  }
}
</script>
<style scoped lang="scss">
.box {
  margin: 15px 0 20px 25px;
  .preponderance-one {
    height: 50px;
    // background-color: aqua;
    .bg-purple {
      color: #256efd;
      font-weight: 600;
      font-size: 20px;
    }
  }
  .credentials {
    height: 100px;
    // background-color: #256efd;
    line-height: 100px;
    font-size: 18px;
    margin-bottom: 20px;
    display: inline;
  }
}
</style>
