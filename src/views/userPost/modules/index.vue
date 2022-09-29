<template>
  <div class="post-box">
    <div class="postSearch-content">
      <postSearch />
      <postList />
    </div>
  </div>
</template>
<script>
import postSearch from '../components/postSearch.vue'
import cityTip from '../components/cityTip.vue'
import postList from '@/views/userPost/components/postList'

export default {
  components: { postSearch, cityTip, postList },
  data () {
    return {}
  }
};
</script>
<style lang="scss" scoped>
.post-box {
  width: 100%;
  // min-width: 1280px;
  height: auto;
  background-color: #f4f6f9;
  overflow: hidden;

  .postSearch-content {
    width: 80%;
    min-width: 1000px;
    margin: 40px auto;
    background-color: #f4f6f9;
  }
}
</style>
