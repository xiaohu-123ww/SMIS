<template>
  <div>
    <div class="side-header">
      <div class="logo" style="width: 25%">
        <img
          src="../../assets/images/logo2.png"
          style="width: 200px"
          @click="dialog"
        />
      </div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        text-color="black"
        style="width: 85%"
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
      <Navbar style="margin-top: 15px" />
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
      dialogVisible: false
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

  },
  methods: {
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
.side-header {
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

