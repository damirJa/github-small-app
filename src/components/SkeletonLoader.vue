<template>
  <div ref="skeleton" class="container">
    <div class="bone" v-for="(_, idx) in getBones" :key="idx" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SkeletonLoader",
  computed: {
    getBones() {
      return new Array(2).fill(true);
    }
  },
  mounted() {
    const target = this.$refs.skeleton;
    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.$emit("loadNextPage");
        }
      });
    }, options);
    observer.observe(target);
  }
});
</script>

<style scoped lang="less">
.bone {
  background: #ececec;
  border-radius: 8px;
  margin-bottom: 20px;
  height: 70px;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      to right,
      transparent 0%,
      #d6d6d6 50%,
      transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
}

@keyframes load {
  from {
    left: -150px;
  }
  to {
    left: 100%;
  }
}
</style>
