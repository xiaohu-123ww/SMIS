<template>
  <div>
    <div class="interview">我的收藏</div>
    <Job :show="show" />
  </div>
</template>
<script>
import Job from './job/index.vue'
export default {
  components: { Job },
  data () {
    return {
      show: true
    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.interview {
  height: 50px;
  border-bottom: 1px solid #e6e3e3;
  line-height: 50px;
  padding-left: 30px;
  color: #256efd;
  font-weight: 600;
  font-size: 20px;
}
</style>
