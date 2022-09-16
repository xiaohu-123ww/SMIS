<template>
  <div class="post-list">
    <div
      v-for="(item, index) in searchList"
      :key="index"
      class="post-info"
      @click="jobDetails(item)"
    >
      <!-- 标题 -->
      <div v-if="item.position" class="title">
        <span style="cursor: pointer">{{ item.position.pst_class.name }}</span>
      </div>
      <!-- 薪资待遇 -->
      <div class="suffer" style="padding: 0 0 5px 20px; color: #666666">
        <span
          style="
            color: #fe6b49;
            margin: 0;
            font-size: 20px;
            padding-right: 10px;
          "
        >{{ item.salary_min }}-{{ item.salary_max }}</span>
        {{ item.job_experience }} | {{ item.education }}
      </div>
      <!-- 右边头像 -->
      <div class="logo">
        <div v-if="item.position" class="picture">
          <img
            :src="item.enterprise.logo"
            alt
            height="100%"
            srcset
            width="100%"
          >
        </div>
        <div v-if="item.enterprise" class="company">
          <div class="name">{{ item.enterprise.name }}</div>
        </div>
      </div>
      <!-- 沟通 -->
      <div class="communication">
        <span>立即沟通</span>
      </div>
      <!-- 装饰条 -->
      <div class="adorn" />
      <!-- 底部内容 -->
      <div v-if="jobDetails.position" style="margin-top: 10px">
        {{ jobDetails.position.extra_info }}123123
        <span />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: ['', '', '']
    };
  },
  computed: {
    searchList() {
      //  (this.$store.state.user.searchList);
      // console.log(this.$store.state.user.searchList);
      return this.$store.state.user.searchList;
    }
  },
  watch: {},
  created() {},
  methods: {
    jobDetails(item) {
      this.$router.push({
        path: '/postdes',
        name: 'postdes',
        query: { id: item.id }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.post-list {
  width: 100%;
  height: auto;
  padding-top: 30px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .post-info:hover {
    z-index: 2;
    -webkit-box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    -webkit-transform: translate3d(0, -2px, 0);
    transform: translate3d(0, -2px, 0);
  }
  .post-info .suffer:hover {
    color: #4e93f7 !important;
  }
  .post-info .title span:hover {
    color: #4e93f7;
  }
  .company div:hover {
    color: #4e93f7 !important;
  }
  .post-info {
    width: 49%;
    min-width: 450px;
    height: 248px;
    position: relative;
    border: 1px solid #cecece;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #fff;
    .title {
      width: 100%;
      padding: 40px 20px 12px 20px;
      font-size: 28px;
      font-family: PingFang HK;
      font-weight: 600;
      color: #2f2f2f;
      display: flex;
      justify-content: space-between;
    }

    .logo {
      position: absolute;
      right: 40px;
      top: 50px;
      width: 40%;

      .picture {
        width: 68px;
        height: 68px;
        overflow: hidden;
        margin: 0 auto;
      }

      .company > .name {
        font-size: 12px;
        font-family: PingFang HK;
        font-weight: 400;
        color: #666666;
        padding: 10px 0;
        text-align: center;
      }
    }
    .communication {
      width: 137px;
      text-align: center;
      background-color: #256efd;
      position: absolute;
      padding: 8px 0;
      border-radius: 4px;
      left: 20px;
      margin-top: 24px;
      // top: 120px;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
    }
  }
  .adorn {
    width: 100%;
    height: 1px;
    background: #f8f8f8;
    margin-top: 80px;
  }
}
</style>
