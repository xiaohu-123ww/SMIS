<template>
  <div class="swiper-container">
    <el-carousel height="600px">
      <el-carousel-item
        v-for="item in listCarousel"
        :key="item"
        style="height: 600px"
      >
        <img :src="item" alt="" height="100%" width="100%" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { getCarousel } from '@/api/user'
export default {
  components: {},
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      listCarousel: [
      ],
      listCarousels: []
    }
  },
  watch: {
    item (item) {
      this.listCarousel = item.carousel
      this.listCarousel.forEach((rs) => {
        this.listCarousels.push(this.disposeImg(rs))
        console.log('111s', this.listCarousels)
      })
    }
  },
  created () {

  },
  mounted () {
  }

}

</script>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 600px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
