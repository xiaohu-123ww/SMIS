<template>
  <div class="container">
    <div class="header">
      <div class="side-header" style="position: relative">
        <div class="logo">
          <img
            src="../../assets/images/logo2.png"
            style="width: 200px; cursor: pointer"
            @click="dialog"
          />
        </div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          text-color="black"
          @select="handleSelect"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title" style="font-size: 16px">选课中心</template>
            <el-menu-item index="2-1">公开课程</el-menu-item>
            <el-menu-item index="2-2">校区专属</el-menu-item>
            <el-menu-item index="2-3">课程包</el-menu-item>
          </el-submenu>

          <el-menu-item index="3"
            ><a
              href="https://admin.xiaoe-tech.com/t/account/muti_index#/myParticipate"
              target="_blank"
              >班级学习</a
            ></el-menu-item
          >
          <el-menu-item index="4">题库考试</el-menu-item>
          <el-menu-item index="5" @click="test">实训考试</el-menu-item>

          <!-- <Dia :add="add" @handler="handler" /> -->
        </el-menu>
        <Navbar style="margin-top: 15px" class="logins" />
      </div>
      <div>
        <!-- <img
          src="../../assets/images/智能智造学院.jpg"
          style="width: 100%; height: auto; margin-top: 100px"
        /> -->
      </div>
    </div>
    <div>
      <img
        src="../../assets/images/智能智造学院.jpg"
        style="width: 100%; height: auto; margin-top: 100px"
      />
    </div>
    <Dialog :dialog-visible="dialogVisible" @reset="reset" />
  </div>
</template>
<script>
// import router from '@/router'
import Navbar from '@/userLayout/components/Sidebar/navBar.vue'
import Dialog from './components/dialog.vue'
export default {
  components: {
    Navbar,
    Dialog
  },
  data () {
    return {
      add: false,
      activeIndex: '1',
      dialogVisible: false,
      status: false
      // activeIndex: '首页'
      // routes: [
      //   {
      //     name: '首页',
      //     path: '/userdash'
      //   },
      //   {
      //     name: '职位搜索',
      //     path: '/userpost'
      //   },
      //   {
      //     name: '智能学院',
      //     // path: "/clientlayout",
      //     // path: '/Bmanagementlayout'
      //     // path: '/clientindex'
      //     path: '/college'
      //   },
      //   {
      //     name: '关于我们',
      //     path: '/userabout'
      //   }
      //   // {
      //   //   name: '反馈'
      //   //   // path: '/userabout'
      //   // }
      //   // {
      //   //   name: '联系我们',
      //   //   path: '/usercontact'
      //   // }
      // ]
    }
  },
  mounted () {

  },
  created () {
    window.addEventListener('scroll', this.windowScroll)
    this.$nextTick(() => {
      // 页面渲染完成后的回调
      var h =
        document.documentElement.clientHeight || document.body.clientHeight
      // console.log(h)
      // console.log(this.$refs.getheight.offsetHeight);
      if (this.$refs.getheight.offsetHeight < h) {
        // console.log(1);
        this.status = true
      } else {
        // console.log(2);
        this.status = false
      }
    })
  },
  mounted () {
    window.addEventListener('scroll', this.windowScroll)
    this.$nextTick(() => {
      // 页面渲染完成后的回调
      var h =
        document.documentElement.clientHeight || document.body.clientHeight
      // console.log(h)
      // console.log(this.$refs.getheight.offsetHeight);
      if (this.$refs.getheight.offsetHeight < h) {
        // console.log(1);
        this.status = true
      } else {
        // console.log(2);
        this.status = false
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.windowScroll)
  },
  methods: {
    windowScroll () {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      // console.log(scrollTop == '');
      if (scrollTop !== '') {
        this.status = true
      } else {
        this.status = false
      }
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },

    dialog () {
      this.$router.push('/userdash')
    },
    // 实训考试
    test () {
      this.dialogVisible = true
    },
    reset () {
      this.dialogVisible = false
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: auto;
  min-width: 1280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    width: 100%;
    height: 113px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    position: relative;
    .logins {
      position: absolute;
      right: 10px;
      top: 10px;
    }
  }

  .main {
    width: 100%;
    height: auto;
    background-color: #fffeff;
    //align-self: flex-start;
  }
}

.containers {
  width: 100%;
  height: auto;
  // min-width: 1555px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    width: 100%;
    height: 113px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    position: relative;
    .logins {
      position: absolute;
      right: 5px;
      top: 10px;
    }
  }

  .main {
    width: 100%;
    height: auto;
    flex: 1;
    background-color: #f6f6f8;
    //align-self: flex-start;
    //background-color: #f6f6f8;
  }
}
.header {
  width: 100%;
  height: 113px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  position: relative;
  .logins {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}

.side-header {
  // overflow: hidden;
  width: 100%;
  // min-width: 960px;
  display: flex;
  height: 113px;
  background-color: #fff;
  // line-height: 100px;
  //background-color: #fff;

  .logo {
    margin-left: 80px;
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
    // margin-left: 70px;
    height: 80px;
  }
}
.el-menu--horizontal > .el-menu-item a,
.el-menu--horizontal > .el-menu-item a:hover {
  color: black;
}
::v-deep .el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: #f4f6f9;
}
li.el-menu-item {
  margin-right: 50px;
  // width: 120px;
  // font-size: 16px;
}
// ::v-deep element.style {
//   border-bottom-color: transparent;
//   color: black;
//   font-size: 16px;
// }
</style>

