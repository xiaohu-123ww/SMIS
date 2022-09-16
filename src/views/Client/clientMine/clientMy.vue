<template>
  <div class="swrapper">
    <div class="right">
      <clientinfo />
      <clienttran />
      <onlinemy />
    </div>
  </div>
</template>
<script>
import clientinfo from '../componets/clientinfo.vue';
import clienttran from '../componets/clienttran.vue';
import onlinemy from '../componets/onlinemy.vue';
export default {
  components: { clientinfo, clienttran, onlinemy },
  data() {
    return {
      tlist: [
        {
          name: '基本信息',
          value: '/clientinfo'
        },
        {
          name: '我的培训',
          value: '/clienttran'
        },
        {
          name: '我的线上学习',
          value: '/onlinemy'
        }
      ],
      qiehuanindex: 0
    };
  },
  created() {
    // console.log();
    this.tlist.forEach((item, index) => {
      if (this.$route.path == item.value) {
        this.qiehuanindex = index;
      }
    });
  },
  methods: {
    send(item, index) {
      this.$router.push(item.value);
      this.qiehuanindex = index;
    }
  }
};
</script>
<style scoped>
.swrapper {
  width: 100%;
  height: calc(100% - 360px);
  display: flex;
  /* min-width: 1000px; */
  /* background-color: antiquewhite; */
  min-width: 1555px;
}
.left {
  width: 20%;
  height: 100%;
  /* min-width: 1000px; */
  /* background-color: beige; */
  border-right: 1px solid rgb(202, 201, 201);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.left_img {
  width: 180px;
  height: 260px;
  margin: 5px auto;
  background-color: blue;
  border-radius: 100%;
  -o-border-radius: 100%;
  -ms-border-radius: 100%;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
}
.left_img_text {
  text-align: center;
  color: gainsboro;
}
.left_text {
  width: 100%;
  height: 300px;
  /* background-color: aqua; */
  margin-top: 15%;
}
.left_text_middle {
  width: 100%;
  height: 50px;
  /* background-color: brown; */
}
.left_text_middle p {
  text-align: left;
  line-height: 50px;
  cursor: pointer;
  font-size: 20px;
  width: 40%;
  margin: 20px auto;
}

.left_text_middle .active {
  color: #46a6ff;
}
.right {
  width: 80%;
  margin: 0 auto;
}
</style>
