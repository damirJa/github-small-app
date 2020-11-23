<template>
  <div id="listWrapper" :class="[isLoaded ? 'scrollable' : '']">
    <Hero :isLoaded="isLoaded" />
    <main class="main">
      <Button @click="loadPrevPage" v-if="missedPages > 0">Load previous</Button>
      <RepositoriesList :repositories="repositories" />
      <SkeletonLoader v-if="isLoaded" @loadNextPage="loadNextPage" />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Hero from "./Hero.vue";
import RepositoriesList from "./RepositoriesList.vue";
import Axios, { AxiosResponse } from "axios";
import { Repository } from "@/types";
import SkeletonLoader from "@/components/SkeletonLoader.vue";
import { router } from "@/main";
import { unique } from "@/helpers";

interface GitHubRepoResponse {
  incomplete_results: boolean;
  items: Repository[];
  total_count: number;
}

export default Vue.extend({
  name: "Home",
  data(): {
    isLoaded: boolean;
    showSkeleton: boolean;
    paginationLoading: boolean;
    fromPage: number;
    toPage: number;
    missedPages: number;
    itemsPerPage: number;
    repositories: Repository[];
  } {
    return {
      isLoaded: false,
      showSkeleton: true,
      paginationLoading: false,
      fromPage: 1,
      toPage: 1,
      missedPages: 0,
      itemsPerPage: 30,
      repositories: []
    };
  },
  components: {
    Hero,
    RepositoriesList,
    SkeletonLoader
  },
  methods: {
    getRepos(
      page: number,
      itemsPerPage: number
    ): Promise<AxiosResponse<GitHubRepoResponse>> {
      return Axios.get(
        `https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&page=${page}&per_page=${itemsPerPage}`
      );
    },
    initialPagination(currentPage: number, missedPages: number) {
      this.fromPage = currentPage;
      this.toPage = currentPage;
      this.missedPages = missedPages;
    },
    loadPrevPage() {
      const prevPage = `${this.fromPage - 1}`;
      if (this.$route.query.page !== prevPage && +prevPage > 0) {
        router.push({ query: { page: prevPage } }).then(() => {
          this.missedPages -= 1;
        });
      }
    },
    loadNextPage() {
      const nextPage = `${this.toPage + 1}`;
      if (this.$route.query.page !== nextPage) {
        router.push({ query: { page: nextPage } });
      }
    }
  },
  mounted() {
    this.getRepos(this.toPage, this.itemsPerPage).then(repos => {
      this.repositories = [...this.repositories, ...repos.data.items];
      this.isLoaded = true;
    });
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    let currentPage = 1;
    let missedPages = 0;
    if (typeof to.query.page === "string") {
      currentPage = parseInt(to.query.page, 10);
      missedPages = currentPage - 1;
    }
    next((vm: any) => vm.initialPagination(currentPage, missedPages));
  },
  beforeRouteUpdate(to, from, next) {
    if (typeof to.query.page === "string") {
      const nextPage = parseInt(to.query.page, 10);
      this.getRepos(nextPage, this.itemsPerPage).then(repos => {
        this.repositories = unique([
          ...this.repositories,
          ...repos.data.items
        ]).sort((a, b) => b.stargazers_count - a.stargazers_count);
        if(to.query.page > from.query.page) {
          this.toPage = nextPage;
        } else {
          this.fromPage = nextPage;
        }
      });
    }
    next();
  }
});
</script>

<!--curl "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&page=1&per_page=10"-->

<style scoped lang="less">
#listWrapper {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
  &.scrollable {
    overflow: auto;
  }
}

button {
  border: none;
  padding: 10px 12px;
  font-weight: bold;
  font-size: 16px;
  border-radius: 10px;
  margin: -15px auto 15px;
  position: relative;
  display: block;
  cursor: pointer;
}

main {
  padding-top: 150px;
}
</style>
