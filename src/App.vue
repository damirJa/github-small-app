<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import "normalize.css";

export default Vue.extend({
  name: "App",
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* div {
  box-sizing: border-box;
}
.container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 50px;
}
</style>

