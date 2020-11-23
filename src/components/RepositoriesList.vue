<template>
  <div class="container">
    <RepositoryCard :card="repo" v-for="repo in repositories" :key="repo.id" />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import RepositoryCard from "@/components/RepositoryCard.vue";
import { Repository } from "@/types";

export default Vue.extend({
  name: "RepositoriesList",
  props: {
    repositories: Array as PropType<Repository[]>
  },
  components: {
    RepositoryCard
  }
});
</script>

<style scoped lang="less"></style>
