<template>
  <div>
    <dashboard-content :item="item" />
    <!-- <swiper-component :item="item" /> -->
  </div>
</template>
<script>
import swiperComponent from '../components/swiperComponent.vue'
import dashboardContent from '../components/dashboardContent.vue'
import { getCarousel } from '../../../api/user'
export default {
  components: {
    swiperComponent,
    dashboardContent
  },
  data () {
    return {
      item: {}
    }
  },
  created () {
    getCarousel().then(rs => {
      console.log('123', rs)
      this.item = rs.data
    })
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
</style>
