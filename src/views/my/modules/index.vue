<template>
  <div class="myHome">
    <div class="left"></div>
    <div class="right"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.myHome {
  width: 100%;
  height: 100%;
  display: flex;
}
.left {
  height: 500px;
  /* background-color: green; */
}
.right {
  flex: 1;
}
</style>
