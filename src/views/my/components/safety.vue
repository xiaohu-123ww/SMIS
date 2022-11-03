<template>
  <div>
    <div class="interview">安全中心</div>
    <div class="safety">
      <Table :list="list" />
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/my/safety'
import Table from './safety/table.vue'
export default {
  components: { Table },
  data () {
    return {
      list: {}
    }
  },
  computed: {

  },
  mounted () {

  },
  created () {
    this.getSafety()
  },
  methods: {
    async getSafety () {
      const { data } = await getList()
      console.log('安全中心', data)
      this.list = data
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
.safety {
  height: 500px;
  // background-color: rebeccapurple;
  margin-top: 20px;
}
</style>
