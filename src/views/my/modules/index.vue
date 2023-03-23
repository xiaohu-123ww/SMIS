<template>
  <div class="myHome">
    <el-container class="left">
      <!-- 侧边栏区域 -->

      <el-aside width="260px">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#fff"
          text-color="black"
          active-text-color="#409EFF"
          style="height: 100%"
          unique-opened
          router
        >
          <!-- 使用menu数组动态渲染菜单 -->
          <!-- 写到template上进行变量(template不会生成任元素)-->
          <template v-for="item in menu">
            <el-menu-item
              v-if="!item.children"
              :key="item.indexPath"
              :index="item.indexPath"
              style="padding-left: 60px"
              ><i :class="item.icon"></i>{{ item.title }}</el-menu-item
            >
          </template>
        </el-menu>
      </el-aside>

      <!-- 左边展示区 -->
      <el-main class="right">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menu: [

        {
          title: '个人中心',
          indexPath: '/my',
          icon: 'el-icon-user'
        },
        {
          title: '我的简历',
          indexPath: '/resume',
          icon: 'el-icon-tickets'
        },
        {
          title: '求职申请',
          indexPath: '/job',
          icon: 'el-icon-bank-card'
        },
        {
          title: '面试邀约',
          indexPath: '/interview',
          icon: 'el-icon-data-line'
        },
        {
          title: '我的收藏',
          indexPath: '/collection',
          icon: 'el-icon-star-off'
        },
        {
          title: '安全中心',
          indexPath: '/safety',
          icon: 'el-icon-document-copy'
        },
        {
          title: '隐私设置',
          indexPath: '/privacy',
          icon: 'el-icon-setting'
        },
        {
          title: '互动消息',
          indexPath: '/communication',
          icon: 'el-icon-chat-line-square'
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped lang="scss">
.myHome {
  // width: 100%;
  // height: 100%;
  display: flex;
  margin: 0;
  padding: 0;
  background-color: #1890ff;
  width: 100%;
  height: 100%;
  // min-width: 800px;
  // max-width: 2000px;
  margin: 30px auto 10px;
  // padding-top: 30px;
  background-color: #f4f6f9;
}
.left {
  height: 100%;
  background: #fff;
}
.el-aside {
  overflow: hidden;
}
.el-menu-item.is-active {
  color: #fff !important;
  background: #1890ff !important;
}
.right {
  flex: 1;
  height: 100%;
  background-color: #fff;
}
::v-deep aside.el-aside {
  background: #fff;
}
::v-deep aside {
  padding: 0;
}
::v-deep element.style {
  padding-left: 60px;
}
</style>
