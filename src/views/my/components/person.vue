<template>
  <div>
    <div v-if="showHidden" class="head" :class="flag === false ? 'btn' : ''">
      <div>
        <el-avatar
          class="left"
          :src="list.circleUrl"
          style="position: relative; top: 10px; left: 0px"
        />
      </div>
      <div class="right">
        <div class="right-i">
          <div style="font-size: 22px; font-weight: 600">
            {{ list.username }}
          </div>
          <div style="margin-left: 40px; margin-top: 5px; font-size: 16px">
            {{ list.state ? list.state : '求职状态' }}
          </div>
        </div>
        <div class="right-i">
          <div class="right-age">{{ list.sex ? list.sex : '性别' }}</div>
          <div class="right-age">{{ list.age ? list.age : '年龄' }}</div>
          <div v-if="flag === false" class="right-age">
            {{ list.work ? list.work : '工作经验' }}
          </div>
          <div class="right-age">{{ list.school ? list.school : '学校' }}</div>
        </div>
        <div v-if="flag === false" class="phone">
          <el-row>
            <el-col :span="9"
              ><div class="grid-content bg-purple">
                {{ list.photo ? list.photo : '联系方式' }}
              </div></el-col
            >
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                {{ list.email ? list.email : '电子邮箱' }}
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
    <Dialog :show="show" :list="list" @reset="reset" />
  </div>
</template>
<script>
import { getPersonalinfo } from '@/api/user'
import Dialog from './resume/dialog.vue'
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
      showHidden: true
    }
  },
  mounted () {

  },
  created () {
    this.getName()
  },
  methods: {

    disposeImg (img) {
      if (img !== undefined) {
        img = String(img)

        if (img.substr(0, 1) == '/') {
          img = img.substr(1)
        }

        return 'https://znzz.tech/' + img
      }
    },
    async getName () {
      const res = await getPersonalinfo()
      console.log('res', res.data)
      // 头像处理
      this.list.circleUrl = this.disposeImg(res.data.personal.image)
      console.log('123', this.circleUrl)
      // 用户名
      if (res.data.user.first_name === '') {
        this.list.username = res.data.user.username
      } else {
        this.list.username =
          res.data.user.last_name + res.data.user.first_name
      }
      console.log('username', this.username)
      this.list.photo = res.data.personal.phone_number
      this.list.email = res.data.user.email
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
