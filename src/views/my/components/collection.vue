<template>
  <div>
    <div class="interview">我的收藏</div>
    <div v-if="ematy">
      <div
        v-if="loading"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgb(244, 246, 249)"
        style="height: 700px; font-size: 100px"
      ></div>
      <Job :show="show" :list="list" @reset="reset" />
      <el-pagination
        style="margin: 20px 0 0 300px"
        :current-page="offset"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        layout="sizes, prev, pager, next, jumper, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
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
      list: [],
      limit: 5,
      offset: 1,
      total: 0,
      loading: false
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
    handleSizeChange (newSize) {
      console.log('每页条数', newSize)
      this.limit = newSize
      this.getCert()
    },
    async handleCurrentChange (currPage) {
      // el-pagination组件内部通过：this.$emit('current-change', 最新页码)
      console.log('当前页码', currPage)
      this.offset = currPage
      this.off = this.limit * (currPage - 1)
      const { data } = await getList(this.limit, this.off)
      console.log(12232142356)
      console.log('收藏', data)
      if (data.results.length === 0) {
        this.ematy = false
      } else {
        this.list = data.results
        this.total = data.count
      }
    },
    async getCert () {
      this.loading = true
      const { data } = await getList(this.limit, this.offset)
      console.log(12232142356)
      console.log('收藏', data)
      if (data.results.length === 0) {
        this.ematy = false
        this.loading = false
      } else {
        this.list = data.results
        this.total = data.count
        this.loading = false
      }
    },
    reset () {
      this.getCert()
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
