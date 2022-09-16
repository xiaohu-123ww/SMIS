<template>
  <div class="asideman">
    <!-- 侧边导航栏 -->
    <el-menu
      :default-active="activeindex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="#213A6A"
      active-text-color="#3564BC"
      text-color="#ffffff"
     
    >
      <el-menu-item
        :index="item.value"
        v-for="(item, index) in list"
        :key="index"
        @click="send(item)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <!-- <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-check"></i>
          <span @click="classRoom">班级管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item @click="student">
            <i class="el-icon-s-custom"></i>
            <span slot="title">学员管理</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: false,
      activeindex: "",
      list: [
        {
          name: "课程管理",
          value: "/courseMan",
          icon: "el-icon-reading",
        },
        {
          name: "教师管理",
          value: "/teacherMan",
          icon: "el-icon-user",
        },
        {
          name: "证书管理",
          value: "/certMan",
          icon: "el-icon-postcard",
        },
        // {
        //   name: "学员管理",
        //   value: "/classMan",
        //   icon: "el-icon-s-check",
        //   children: [],
        // },
        {
          name: "班级管理",
          value: "/classroomMan",
          icon: "el-icon-s-custom",
        },
      ],
    };
  },
  created() {
    this.activeindex = this.$route.path;
  },
  mounted() {
    this.EventBus.$on("retract", () => {
      this.isCollapse = false;
    });
    this.EventBus.$on("open", () => {
      this.isCollapse = true;
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    send(e) {
      this.$router.push(e.value);
    },
    student() {
      this.$router.push("/classMan");
    },
    classRoom() {
      this.$router.push("/classroomMan");
      // console.log(1);
    },
  },
};
</script>
<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
.el-menu {
  border: none;
}
/deep/ .is-active {
  background-color: #fff !important;
}
</style>