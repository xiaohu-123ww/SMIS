<template>
  <div v-if="hidden">
    <div v-if="showHidden" class="head" :class="flag === false ? 'btn' : ''">
      <div>
        <el-avatar
          class="left"
          :src="circleUrl"
          style="position: relative; top: 10px; left: 0px"
        />
      </div>
      <div class="right">
        <div class="right-i">
          <div style="font-size: 22px; font-weight: 600">
            {{ num.name ? num.name : 'XXXX' }}
          </div>
          <div style="margin-left: 40px; margin-top: 5px; font-size: 16px">
            {{ num.status }}
          </div>
        </div>
        <div class="right-i">
          <div class="right-age">
            {{ num.sex }}
          </div>
          <div class="right-age">{{ num.age ? num.age : '无' }}</div>
          <div v-if="flag === false" class="right-age">
            {{ num.year ? num.year : '工作经验' }}
          </div>
          <div class="right-age">
            {{ num.education ? num.education : '学历' }}
          </div>
        </div>
        <div v-if="flag === false" class="phone">
          <el-row>
            <el-col :span="9"
              ><div class="grid-content bg-purple">
                {{ num.phone_number }}
              </div></el-col
            >
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                {{ num.email }}
              </div></el-col
            >
          </el-row>
        </div>
      </div>
      <div v-if="flag === false" class="commun">
        <el-button type="primary" icon="el-icon-edit" @click="redact"
          >编辑简历</el-button
        >
      </div>
      <div v-if="flag" class="communication">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="$router.push('/resume')"
          >编辑简历</el-button
        >
      </div>
      <!-- </div> -->
    </div>
    <Dialog
      :show="show"
      :list="list"
      :num="num"
      :circle-url="circleUrl"
      @reset="reset"
    />
  </div>
</template>
<script>
import { getMessage } from '@/api/user'
import Dialog from './resume/dialog.vue'
import disposeImg from '@/utils/disposeImg'
export default {
  components: {
    Dialog
  },
  props: {
    flag: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      list: {
        // 头像
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        // 名字
        username: 'XXX',
        // 电话
        photo: '',
        // 邮件
        email: '',
        sex: '',
        age: '',
        work: '',
        school: '',
        state: ''
      },
      show: false,
      showHidden: true,
      name: {},
      hidden: false,
      circleUrl: '',
      num: {}
    }
  },
  mounted () {

  },
  created () {
    this.getName()
  },
  methods: {

    async getName () {
      const res = await getMessage()
      console.log('用户信息12', res)
      this.hidden = true
      this.num = res.data.data

      this.circleUrl = this.disposeImg(res.data.data.image)
    },
    // 点击编辑
    redact () {
      // console.log(1)
      this.show = true
      this.showHidden = false
    },
    reset (i) {
      this.show = i
      this.showHidden = true
    }

  }
}
</script>
<style scoped lang="scss">
.btn {
  // border-bottom: 1px solid #e6e3e3;
}
.head {
  width: 1100px;
  height: 200px;
  // background-color: brown;
  display: flex;
  .left {
    width: 150px;
    height: 150px;
    // background-color: blueviolet;
    margin-left: 80px;
    border-radius: 100px;
  }
  .right {
    width: 500px;
    height: 100px;
    // background-color: rgb(255, 0, 217);
    margin-top: 20px;
    .right-i {
      width: 400px;
      height: 40px;
      // background-color: blueviolet;
      margin-top: 8px;
      margin-left: 8px;
      display: flex;
      padding: 10px;
      .right-age {
        // width: 100px;
        padding-right: 10px;
        height: 20px;
        // background-color: cadetblue;
        font-size: 16px;
        border-right: 1px solid rgb(124, 120, 120);
        margin-right: 10px;
      }
    }
    .phone {
      width: 400px;
      height: 30px;
      // background-color: red;
      margin-left: 15px;
      line-height: 30px;
      padding-left: 5px;
      font-size: 16px;
    }
  }
  .commun {
    margin-top: 20px;
  }
  .communication {
    width: 200px;
    height: 200px;
    // background-color: pink;
    .el-button {
      margin: 100px 100px;
      margin-left: 350px;
    }
  }
}
</style>
