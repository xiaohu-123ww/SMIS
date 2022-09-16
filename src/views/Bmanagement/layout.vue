<template>
  <div class="layoutwrapper">
    <div class="header">
      <h2>培训认证系统后台</h2>
      <i class="el-icon-switch-button" @click="logout"></i>
    </div>
    <div :class="isqie ? 'leftactive' : 'left'">
      <manSide />
    </div>
    <div :class="isqie ? 'rightactive' : 'right'">
      <div class="nav">
        <manHeads @open="open" @retract="retract" />
      </div>
      <div class="content">
        <div class="contain">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import manSide from '../Bmanagement/compoents/manAside.vue'
import manHeads from '../Bmanagement/compoents/manHeader.vue'

export default {
  components: {
    manSide,
    manHeads
  },
  data () {
    return {
      isqie: false
    }
  },
  created () { },
  methods: {
    open () {
      this.isqie = true
    },
    retract () {
      this.isqie = false
    },
    logout () {
      this.$router.push('/userdash')
    }
  }
};
</script>
<style scoped>
.layoutwrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  min-width: 1200px;
}
.header {
  width: 100%;
  height: 50px;
  background-color: #3c69be;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
}
.header h2 {
  text-align: center;
  color: white;
  padding-left: 20px;
}
.header i {
  width: 4%;
  color: white;
  font-size: 25px;
  line-height: 50px;
}
.left {
  width: 15%;
  height: 100%;
  background-color: #213a6a;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 9;
}
.leftactive {
  width: 64px;
  height: 100%;
  background-color: #213a6a;
  position: fixed;
  top: 50px;
  left: 0;
}
.right {
  width: 85%;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 8%;
  min-width: 1200px;
  left: 15%;
  height: calc(100% - 80px);
}
.rightactive {
  width: calc(100% - 90px);
  height: 100%;
  position: absolute;
  top: 7%;
  left: 3%;
}
.nav {
  width: 98%;
  height: 80px;
  background-color: white;
  margin: 0 auto;
}
.content {
  width: 100%;
  height: calc(100% - 80px);
}
.contain {
  height: 600px;
}
</style>
