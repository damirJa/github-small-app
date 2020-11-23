<template>
  <header :class="['hero', isLoaded ? 'collapsed' : '']">
    <div class="content-wrapper container">
      <div class="heading">
        <h1>Github</h1>
        <h2>JavaScript rating list</h2>
      </div>
    </div>
  </header>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Hero",
  props: {
    isLoaded: Boolean
  }
});
</script>

<style scoped lang="less">
.hero {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #b20a2c;
  background: -webkit-linear-gradient(to right, #b20a2c, #fffbd5);
  background: linear-gradient(to right, #b20a2c, #fffbd5);
  transition: 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
  overflow: hidden;
  z-index: 2;
  &.collapsed {
    transform: translate3d(0, calc(-100% + 100px), 0);
    .heading {
      bottom: 20px;
      font-size: 10px;
      transform: translateY(0%);
    }
  }
}
.content-wrapper {
  height: 100%;
  position: relative;
}
.heading {
  margin: 0 auto;
  color: #fff;
  position: absolute;
  display: block;
  left: 50px;
  bottom: 50%;
  font-size: 16px;
  transform: translateY(50%);
  transition: 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: auto;
  h1,
  h2 {
    margin: 0;
  }
  h1 {
    font-size: 3em;
    line-height: 1.5;
  }
  h2 {
    font-size: 2em;
    font-style: italic;
    line-height: 1;
  }
}
</style>
