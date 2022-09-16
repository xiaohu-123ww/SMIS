<template>
  <div>
    <header-box />
    <content-box />
  </div>
</template>
<script>
import headerBox from '../components/header.vue'
import contentBox from '../components/contentBox.vue'

export default {
  components: {
    headerBox,
    contentBox
  },
  data () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.footer-text {
  width: 100%;
  min-width: 100px;
  height: 42px;
  font-size: 30px;
  font-weight: 600;
  line-height: 42px;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 60px;
}
</style>
