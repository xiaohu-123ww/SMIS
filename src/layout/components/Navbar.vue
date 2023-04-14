<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <div class="avatar-container right-menu-item hover-effect">
        <svg-icon icon-class="wenhao" />
        帮助
      </div>
      <div
        class="avatar-container right-menu-item hover-effect"
        @click="toCompanyInfo"
      >
        <svg-icon icon-class="qiye" />
        企业信息
      </div>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!--<img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">-->
          <svg-icon icon-class="more" />&nbsp;更多<i
            class="el-icon-caret-bottom"
            style="position: relative; top: 0px; left: 0px"
          />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/usercenter">
            <el-dropdown-item>个人主页</el-dropdown-item>
          </router-link> -->
          <router-link to="/paymentcenter">
            <el-dropdown-item>支付中心</el-dropdown-item>
          </router-link>
          <a v-if="bel" href="https://znzz.tech/admin" target="_blank">
            <el-dropdown-item>后台管理</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="amend">
            <span style="display: block">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import { enterprisePage } from '@/api/enterprise'
import { removeToken } from '@/utils/auth'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    Search
  },
  data () {
    return {
      bel: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'navbar'
    ])
  },
  created () {
    enterprisePage().then(res => {
      // console.log(res.data);
      if (res.data.user.is_active == true && res.data.user.is_staff == true) {
        // console.log(1);

        this.bel = true
      } else {
        // console.log(2);
        this.bel = false
      }
    })
  },
  methods: {
    ...mapMutations('navbar', ['toCompany', 'flagChange']),
    toggleSideBar () {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      console.log('退出登录')
      // await this.$store.commit('ANSWERS', [])
      removeToken()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 跳转到企业信息
    toCompanyInfo () {
      this.$router.push({ path: '/qiyeindex' })
      this.toCompany()
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;

    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    font-size: 20px;
    color: black !important;
    font-weight: 500;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 15px;

      .avatar-wrapper {
        /*margin-top: 5px;*/
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
