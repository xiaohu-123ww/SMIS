<template>
  <div>
    <post-manage v-if="isRouterAlive" />
    <employ-manage  v-if="isRouterAlive" />
  </div>
</template>

<script>
import postManage from '../components/postManage';
import employManage from '../components/employManage';

export default {
  name: 'Index',
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    postManage,
    employManage
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false,
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    }

  }
};
</script>

<style lang="scss" scoped>
</style>
