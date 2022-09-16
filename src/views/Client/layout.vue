<template>
  <div class="wrapper">
    <clienHead />
    <!-- 内容 -->
    <div class="wrpper-counent" style="min-height:500px">
      <router-view />
    </div>

    <div class="footer">
      <bottombar />
    </div>
  </div>
</template>
<script>
import clienHead from '../Client/componets/clientHeader.vue';
import bottombar from '../../userLayout/components/Bottombar/bottomBar.vue';
export default {
  components: { clienHead, bottombar },
  data() {
    return {
    };
  },
  created() {

  },
  methods: {

  }
};
</script>
<style scoped>
.wrapper {
  width: 100%;
  min-width: 900px;
}
.client_header {
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  overflow: hidden;
}
.client_header ul {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68%;
  height: 60px;
  overflow: hidden;
}
.client_header ul li {
  width: 10%;
  text-align: center;
  font-weight: 800;
  font-size: 15px;
}
.client_header ul li:hover {
  color: rgba(0, 0, 255, 0.616);
  text-decoration: rgb(138, 136, 136) underline;
}
.client_header ul li a:hover {
  text-decoration: gray underline solid;
}
.client_right {
  width: 24%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.client_right p {
  text-decoration: none;
  width: 15%;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
}
.banner {
  width: 100%;
  height: 350px;
  /* background-color: antiquewhite; */
}
.banner img {
  width: 100%;
  height: 450px;
}
.hotCert {
  width: 100%;
  height: 400px;
}
.hotCert_text {
  text-align: center;
  color: blueviolet;
}
.hotCert_img {
  width: 80%;
  height: 350px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
}
.hotCert_middle {
  width: 20%;
  height: 350px;
  background-color: aquamarine;
}
.recomCourse {
  width: 100%;
  height: 400px;
}
.recomCourse_text {
  text-align: center;
  color: blueviolet;
}
.recomCourse_img {
  width: 80%;
  height: 350px;
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
}
.recomCourse_middle {
  width: 20%;
  height: 350px;
  background-color: aquamarine;
}
.startClass {
  width: 100%;
  height: 980px;
}
.start_text {
  text-align: center;
  color: blueviolet;
}
.start_img {
  width: 80%;
  height: 923px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
}
.start_middle {
  margin-top: 10px;
  width: 100%;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.start_middle_img {
  width: 20%;
  height: 220px;
  background-color: brown;
}
.start_middle_text {
  text-align: center;
  width: 7%;
}
.start_middle_middle {
  width: 30%;
  text-align: center;
}
.start_middle_right {
  width: 23%;
  display: flex;
  justify-content: flex-end;
}
i {
  font-size: 25px;
  color: blue;
}
.footer {
    width: 100%;
    height: 300px;
    background-color: #F2F2F2;
}
.footer_text {
  width: 100%;
  height: 60px;
}
.footer_text h2 {
  font-weight: normal;
  color: white;
  line-height: 60px;
  margin-left: 15px;
}
</style>
