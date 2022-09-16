<template>
  <div class="intro">
    <div class="title">{{ addres.location }}</div>
    <p style="color: #808080">办公地址：{{ addres.address }}</p>
    <!--    <p style="color: #808080">邮编： 519040</p>-->
    <p style="color: #808080">客服中心：{{ addres.phone }}</p>
    <p style="color: #808080">
      官网：
      <!-- <router-link tag="a" target="_blank" :to="addres.url"> </router-link> -->
      <a
        :href="herfs + addres.url"
        target="_blank"
        style="color: rgb(18, 150, 219); text-decoration: underline"
        >{{ addres.url }}</a
      >
    </p>
    <!--    <p style="color: #808080">E-mail： service@iiyimail.com</p>-->
    <!--    <div style="font-size: 24px; margin-bottom: 20px; margin-top: 40px">-->
    <!--      公交-->
    <!--    </div>-->
    <!--    <p style="color: #808080">地铁：10号线国贸地铁站G口东行200米</p>-->
    <!--    <p style="color: #808080">公交：930路郎家园下车</p>-->
  </div>
</template>
<script>
import { contactWe } from '@/api/user'

export default {
  data () {
    return {
      herfs: "http://",
      addres: ''
    }
  },
  created () {
    contactWe().then(rs => {

      this.addres = rs.data.beijing
    })
  }
}
</script>
<style lang="scss" scoped>
.intro {
  width: 45%;
  padding-top: 40px;

  .title {
    border-left: 5px solid #d92314;
    height: 30px;
    font-size: 28px;
    padding-left: 5px;
    line-height: 30px;
    color: #191919;
    margin-bottom: 30px;
  }
}
</style>
