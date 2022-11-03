<template>
  <div>
    <div class="interview">我的收藏</div>
    <Job v-if="ematy" :show="show" :list="list" />
    <el-empty v-else description="再无收藏列表"></el-empty>
  </div>
</template>
<script>
import { getList } from '@/api/my/like'
import Job from './job/index.vue'
export default {
  components: { Job },
  data () {
    return {
      show: true,
      ematy: true,
      list: []
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.getCert()
  },
  methods: {
    async getCert () {
      const { data } = await getList()
      console.log(12232142356)
      console.log('收藏', data)
      if (data.results.length === 0) {
        this.ematy = false
      }
      this.list = data.results
    }
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
