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
              :disabled="list.length === 10"
              @click="edit"
              >添加</el-button
            >
          </div></el-col
        >
      </el-row>
    </div>
    <div v-if="!show" class="credentials">
      <div v-if="flagShow">
        <div>
          <el-row v-for="item in list" :key="item.id">
            <el-col :span="7"
              ><div class="grid-content bg-purple">
                <img
                  :src="disposeImg(item.cert_info.sample)"
                  alt=""
                  style="width: 160px; height: 100px"
                /></div
            ></el-col>
            <el-col :span="10"
              ><div class="grid-content bg-purple-light">
                {{ item.cert_info.cert_name }} - {{ item.cert_info.cert_level }}
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
      </div>
      <el-empty v-else :image-size="150" description="再无资格证书"></el-empty>
    </div>

    <div>
      <Credentials :show="show" @reset="reset" />
    </div>
  </div>
</template>
<script>
import Credentials from './credentials.vue'
import { getcertificate } from '@/api/my/resume'
import disposeImg from '@/utils/disposeImg'
export default {
  components: { Credentials },
  data () {
    return {
      show: false,
      text: '',
      empty: true,
      list: [],
      flagShow: false
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.getCertificate()
  },
  methods: {
    edit () {
      this.show = true
    },
    reset (i) {
      this.show = i
    },
    async getCertificate () {
      const res = await getcertificate()
      console.log('证书', res)
      if (res.data.msg.length === 0) {
        this.empty = false
      } else {
        this.flagShow = true
      }
      this.list = res.data.msg
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
