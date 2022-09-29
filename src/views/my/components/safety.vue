<template>
  <div>
    <div class="interview">安全中心</div>
    <div class="safety">
      <Table />
    </div>
  </div>
</template>
<script>
import Table from './safety/table.vue'
export default {
  components: { Table },
  data () {
    return {

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
.safety {
  height: 500px;
  // background-color: rebeccapurple;
  margin-top: 20px;
}
</style>
