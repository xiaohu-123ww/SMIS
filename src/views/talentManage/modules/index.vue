<template>
  <div>
    <!-- 网站UI-候选人列表 -->
    <!--    <candidate-list />-->
    <!-- 游戏UI岗位简历 -->
    <post-list/>
  </div>
</template>

<script>
// import candidateList from '../components/candidateList'
import postList from '../components/postList'

export default {
  name: 'Index',
  components: {
    // candidateList,
    postList
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>

</style>
