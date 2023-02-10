<template>
  <div class="side-header">
    <div class="logo">
      <img src="../../../assets/images/logo.png" @click="dialog" />
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item
        v-for="(item, index) in routes"
        :key="index"
        :index="item.name"
        @click="edit(item)"
      >
        <span class="title">{{ item.name }}</span>
      </el-menu-item>
      <!-- <el-menu-item key="zq://" index="">
        <a href="zq://">智能智造学院</a>
      </el-menu-item> -->
      <!-- <el-menu-item index="1" style="color: black" @click="feedback"> -->
      <!-- <a
        :href="`IflytekAudioScheduler://${application.serverIp}-${application.token}`"
        >智能</a
      > -->
      <!-- </el-menu-item> -->
    </el-menu>
    <!-- <a
      :href="`IflytekAudioScheduler://${application.serverIp}-${application.token}`"
      >智能</a
    > -->
    <!-- <el-menu :default-active="activeIndex" mode="horizontal">
      <el-menu-item index="1" style="color: black" @click="about"
        >关于我们</el-menu-item
      >
    </el-menu> -->
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      active-text-color="#000"
      background-color="#fff"
      mode="horizontal"
      text-color="#000"
    >
      <el-menu-item
        v-for="(item, index) in routes"
        :key="index"
        @click="edit(item)"
      >
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu> -->
    <Dia :add="add" @handler="handler" />
  </div>
</template>
<script>
import router from '@/router'
import Dia from './dia.vue'
export default {
  components: {
    Dia
  },
  data () {
    return {
      add: false,
      activeIndex: '首页',
      routes: [
        {
          name: '首页',
          path: '/userdash'
        },
        {
          name: '职位搜索',
          path: '/userpost'
        },
        {
          name: '智能智造学院',
          // path: "/clientlayout",
          // path: '/Bmanagementlayout'
          // path: '/clientindex'
          path: '/college'
        },
        {
          name: '关于我们',
          path: '/userabout'
        }
        // {
        //   name: '反馈'
        //   // path: '/userabout'
        // }
        // {
        //   name: '联系我们',
        //   path: '/usercontact'
        // }
      ]
    }
  },
  mounted () {
    this.timer = window.setInterval(() => {
      // console.log(this.$router.currentRoute.name);
      const b = this.$router.currentRoute.name
      // console.log(b);
      // console.log(this.activeIndex);
      if (b == this.activeIndex) {
        return
      } else {
        this.activeIndex = this.$router.currentRoute.name
      }
      // if (b != this.$router.currentRoute.name) {
      //   this.activeIndex = b;
      //   console.log('走了');
      // } else {
      //   console.log('一样');
      //   return;
      // }
      // if (b !== this.$router.currentRoute.name) {

      // } else {

      // }
    }, 1000)
  },
  created () {
    // this.edit();
    console.log(this.$router.currentRoute.name)
    // console.log(window.location.href);
    this.$nextTick(() => {
      this.activeIndex = this.$router.currentRoute.name
      console.log(12321)
    })
  },
  methods: {
    about () {
      this.$router.push('/userabout')
    },
    // 反馈
    handler (i) {
      this.add = i
    },
    feedback () {
      console.log(113)
      this.add = true
    },
    edit (item) {
      // console.log(this.routes);
      console.log(item)
      // if (item.name === '反馈') {
      //   // this.add = true
      // }
      // if (item.name === '智能学院') {
      //   this.$message.success('智能学院正在维护中！！')

      //   // console.log(item)
      //   // var token = localStorage.getItem('Admin-Token')
      //   // if (token) {
      //   //   this.$router.push('/clientlayout')
      //   // } else {
      //   //   this.$confirm('您还未登录, 请跳转登录页面?', '提示', {
      //   //     confirmButtonText: '确定',
      //   //     cancelButtonText: '取消',
      //   //     type: 'warning'
      //   //   })
      //   //     .then(() => {
      //   //       this.$router.push('/login')
      //   //     })
      //   //     .catch(() => {
      //   //       this.$router.push('/userdash')
      //   //     })
      //   // }
      // } else {
      this.$router.push(item.path)
      this.activeIndex = item.name
      // }
    },
    dialog () {
      this.$router.push('/userdash')
    }
  }
};
</script>
<style lang="scss" scoped>
.side-header {
  width: 100%;
  // min-width: 960px;
  display: flex;
  height: 113px;
  line-height: 100px;
  //background-color: #fff;

  .logo {
    margin-left: 70px;
    // margin-top: 33px;
    padding-top: 33px;
    padding-bottom: 10px;
    margin-right: 100px;
  }
  .title {
    color: #000;
    // font-size: 18px;
  }
  .el-menu {
    background-color: rgba(255, 255, 255, 0);
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
    // padding-top: 33px;
    padding-bottom: 10px;
    margin-top: 33px;
    // height: 80px;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    // border-bottom:39px ;
    // padding-top: 44px;
    // height: 65px;
    // height: 80px;
    border-bottom: 4px solid #256efd;
  }
  .el-menu--horizontal > .el-menu-item:not(.is-disabled):hover {
    background-color: rgba(255, 255, 255, 0) !important;
  }
  .el-menu--horizontal > .el-menu-item:not(.is-disabled) {
    background-color: rgba(255, 255, 255, 0) !important;
  }
  .el-menu--horizontal > .el-menu-item {
    // border-bottom: none;
    margin-left: 70px;
    height: 80px;
  }
}
.el-menu--horizontal > .el-menu-item a,
.el-menu--horizontal > .el-menu-item a:hover {
  color: black;
}
</style>
