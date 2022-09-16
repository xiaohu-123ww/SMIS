<template>
  <div>
    <!-- Form -->
  </div>
</template>
<script>
export default {
  props: ['status'],
  props: {
    status: {
      type: Boolean,
      default: 'false'
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  watch: {
    status: {
      handler (newV, oldV) { // watch监听props里status的变化，然后执行操作
        // console.log(newV);
        this.dialogFormVisible = newV
        return this.dialogFormVisible
      },
      deep: true
    }

  },
  methods: {
    del () {
      this.dialogFormVisible = false
    }

  }
}
</script>
<style scoped>
</style>
