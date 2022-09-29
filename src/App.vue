<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
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
}
.side-header {
  box-shadow: 0px 2px 30px 0px rgba(0, 0, 0, 0.12) !important;
  z-index: 10000;
}
</style>
