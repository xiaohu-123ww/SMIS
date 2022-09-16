<template>
  <div class="wrapp">
    <div class="top">
      <div class="top_top">
        <i class="el-icon-s-unfold" @click="retract" v-if="isqie"></i>
        <i class="el-icon-s-fold" @click="open" v-else></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in levelList" :key="item.path">
            <a v-if="item.path == '/Bmanagementlayout'"> {{ item.name }}</a>
            <router-link :to="item.path" v-else> {{ item.name }}</router-link>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isqie: true,
      levelList: [],
      cld: "",
    };
  },
  mounted() {
    this.cld = this.$route.query.cld;
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    },
  },
  methods: {
    getBreadcrumb() {
      var matched = [{ path: "/Bmanagementlayout", name: "后台管理" }, {}];
      if (this.$route.path == "/classDetail") {
        if (this.$route.query.name) {
          this.levelList = JSON.parse(localStorage.getItem("matched"));
          this.levelList.push({
            path: this.$route.path,
            name: this.$route.query.name + this.$route.meta.title,
          });
          localStorage.setItem("levelList", JSON.stringify(this.levelList));
        } else {
          this.levelList = JSON.parse(localStorage.getItem("levelList"));
        }
      } else if (this.$route.path == "/classMan") {
        this.levelList = JSON.parse(localStorage.getItem("levelList"));
        this.levelList.push({
          path: this.$route.path,
          name: this.$route.meta.title,
        });
      } else {
        matched[1] = { path: this.$route.path, name: this.$route.meta.title };
        this.levelList = matched;
        localStorage.setItem("matched", JSON.stringify(matched));
      }
    },
    open() {
      this.isqie = true;
      this.$emit("open");
      this.EventBus.$emit("open");
    },
    retract() {
      this.isqie = false;
      this.$emit("retract");
      this.EventBus.$emit("retract");
    },
    tiaozhuan(e) {
      // console.log(1);
      this.$router.push(e);
    },
  },
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 60px;
  background-color: white;
  box-shadow: 0px 1px 4px 0px rgb(218, 216, 216);
}
.top_top {
  width: 98%;
  margin: 0 auto;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}
i {
  width: 3%;
  font-size: 30px;
  line-height: 60px;
  color: #3c69be;
}
/deep/.el-breadcrumb__inner a {
  color: #3c69be;
  font-size: 18px;
  cursor: pointer;
}
</style>