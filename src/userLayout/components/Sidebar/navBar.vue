<template>
  <div class="navbar2">
    <keep-alive>
      <div v-if="dis" class="right-menu">
        <el-dropdown
          class="avatar-container-nav right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <div class="avatar-wrapperL">
              <a href="javascript:;">
                <el-avatar
                  :src="circurl"
                  style="position: relative; top: 10px; left: 0px"
                />
              </a>
              <p class="avatar-wrapper-p">
                {{ userInfo.fullname ? userInfo.fullname : userInfo.username }}
              </p>
            </div>
            <div class="avatar-wrapperR">
              <img
                src="@/assets/images/Grid.png"
                class="avatar-wrapper-img"
                style="cursor: pointer"
              />
            </div>
          </div>
          <el-dropdown-menu slot="dropdown" style="width: 100px">
            <!-- <router-link to="/usercenter">
              <el-dropdown-item>个人主页</el-dropdown-item>
            </router-link>
            <router-link to="/paymentcenter">
              <el-dropdown-item>支付中心</el-dropdown-item>
            </router-link> -->
            <router-link to="/my">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <router-link to="/resume">
              <el-dropdown-item>我的简历</el-dropdown-item>
            </router-link>
            <router-link to="/job">
              <el-dropdown-item>求职申请</el-dropdown-item>
            </router-link>
            <a href="http://www.jczpin.com/RtcScreen">
              <el-dropdown-item>我去招聘</el-dropdown-item>
            </a>

            <a
              v-if="bel"
              href="http://www.zhinengzhizaozhaopin.com/admin"
              target="_blank"
            >
              <el-dropdown-item>后台管理</el-dropdown-item>
            </a>
            <!-- <el-dropdown-item @click.native="amend">
              <span style="display: block">修改密码</span>
            </el-dropdown-item> -->
            <el-dropdown-item divided @click.native="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else style="display: flex" class="login-box">
        <!-- <p class="login">登录</p>
        <p class="register">注册</p> -->
        <router-link to="/lgion">
          <div style="whit">登录</div>
        </router-link>
        <router-link to="/register">
          <div style="margin: 0 20px">注册</div>
        </router-link>
      </div>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getPersonalinfo, personal } from '../../../api/user'
import { getToken } from '@/utils/auth'
import disposeImg from '@/utils/disposeImg'
import { removeToken } from '@/utils/auth'
export default {
  components: {},
  data () {
    return {

      userInfo: {},
      token: '',
      dis: '',
      loginout: true,
      login: false,
      register: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''

      },
      bel: false,
      circurl: ''
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'navbar'])
  },
  async created () {
    this.token = getToken()
    if (this.token == null) {
      this.dis = false
    } else {
      this.dis = true
    }
    console.log(this.token)
    if (this.token) {
      const { data } = await personal()
      console.log('用户信息', data)
      if (data.is_login === false) {
        // this.$confirm('登录过期，请重新登录', '提示', {
        //   confirmButtonText: '确定', // 确认按钮的文字显示
        //   type: 'warning',
        //   center: true, // 文字居中显示
        //   showCancelButton: false, // 不显示取消按钮
        //   showClose: false, // 是否显示右上角的x
        //   closeOnClickModal: false
        // }).then(() => {
        this.$store.dispatch('user/resetToken').then(() => {
          //  ("500");
          location.reload()
          router.push('/')
          removeToken()
        })
        // })
      } else {
        this.userInfo = data
        this.circurl = this.disposeImg(data.avatar)
        console.log('this.circurl', this.circurl)
      }
    }
  },
  methods: {
    dianji () {
      console.log(123)
    },
    ...mapMutations('navbar', ['toCompany', 'flagChange']),
    amend () {
      (this.dialogFormVisible = true)
      this.$emit('amend', this.dialogFormVisible)
    },
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      await RongIMClient.getInstance().logout()
      await this.$store.commit('ANSWERS', [])
      await this.$store.commit('MEMBER', {})
      await this.$store.commit('UserId', {})
      await sessionStorage.removeItem('answerList')
      removeToken()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar2 {
  z-index: 1000;
  .login-box {
    margin-top: 35px;
    margin-right: 50px;
  }
  // height: 100%;
  // overflow: hidden;
  // position: relative;
  right: 5px;
  // background: #fff !important;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    // float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(197, 29, 29, 0.025);
    }
  }
  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    width: 200px;
    // margin-top: 25px;
    // top: 0;
    // position: absolute;
    // float: right;
    // height: 100%;
    // line-height: 50px;
    // padding: 10px;
    // background-color: #fff;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 10px;
      height: 100%;
      font-size: 16px;
      vertical-align: text-bottom;
    }

    .avatar-container-nav {
      .avatar-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .avatar-wrapperL {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }
        .avatar-wrapper-img {
          padding-left: 20px;
          margin-bottom: 20px;
        }
        .avatar-wrapper-p {
          // position: absolute;
          // top: 25px;
          // left: 5px;
          margin-top: 20px;
          color: #000;
          margin-left: 5px;
          font-size: 16px;
        }
      }
    }
  }
  // .avatar-wrapperR {
  //   margin-top: 50px;
  // }
}
.el-dropdown-menu {
  z-index: 100000;
}
::v-deep .el-avatar > img {
  width: 100%;
  // border-radius: 50%;
}
// ::v-deep element.style {
//   // transform-origin: center top;
//   // z-index: 2007;
//   width: 300px;
//   // position: absolute;
//   // top: 110px;
//   // left: 1151px;
// }
</style>
