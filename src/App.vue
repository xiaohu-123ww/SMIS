<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="router-view">
      </router-view>
    </keep-alive>
    <router-view
      v-if="!$route.meta.keepAlive"
      class="router-view"
    ></router-view>
  </div>
</template>

<script>
import { getStates } from '@/api/user'
export default {
  name: 'App',
  created () {
    this.start()
  },
  methods: {
    start () {
      console.log('token', this.$store.getters.token)
      if (this.$store.getters.token) {
        setInterval(async () => {
          const res = await getStates()
          console.log('状态', res)
        }, 300000)
      }
    }
  }
};
</script>
<style>
html,
body {
  /* height: 100%; */
  width: 100%;
  background-color: #f4f6f9;
}
.containers .main {
  background-color: #fffeff !important;
  /* min-width: 1200px; */
}
.side-header {
  box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.12) !important;
  z-index: 10000;
}
</style>
