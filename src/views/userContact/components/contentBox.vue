<template>
  <div class="content">
    <div class="content-main">
      <div class="picture">
        <img :src="disposeImg(addres.image)" alt="" height="600px">
      </div>
      <intro />
    </div>
    <!--    <div class="content-main">-->
    <!--      <intro />-->
    <!--      <div class="picture">-->
    <!--        <img alt="" src="@/assets/images/about5.png">-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
import intro from './content/intro.vue';
import { contactWe } from '@/api/user';

export default {
  components: {
    intro
  },
  data() {
    return {
      addres: ''
    };
  },
  created() {
    contactWe().then(rs => {
      this.addres = rs.data.beijing;
    });
  }

};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  // min-width: 1280px;
  height: auto;
  background-color: #fff;
  overflow: hidden;

  .content-main {
    width: 62%;
    height: auto;
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;

    .picture {
      width: 45%;

      img {
        width: 100%;
      }
    }
  }
}
</style>
