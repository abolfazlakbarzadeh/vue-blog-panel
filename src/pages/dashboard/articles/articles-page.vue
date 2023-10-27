<template>
  <div class="articles-page">
    <div class="d-flex flex-column align-items-center gap-4">
      <h1 class="w-100">All Posts</h1>
      <TheArticlesTable
        :articles="articles"
        :current-page="currentPage"
        :page-size="pageSize"
      />
      <ThePagination :total-pages="totalPages" :current-page="currentPage" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TheArticlesTable from "@/components/dashboard/articles/the-articles-table.vue";
import ThePagination from "@/components/dashboard/articles/the-pagination.vue";
import { useArticleService } from "@/services/articles-service";
import { FetchArticlesResponse } from "@/services/types";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const articles = ref<FetchArticlesResponse["articles"]>([]);
const route = useRoute();
const currentPage = ref(Number(route.params.page ?? 1));
const totalPages = ref(1);
const pageSize = ref(10);

const articlesService = useArticleService();

async function fetchArticles() {
  const data = (await articlesService.fetchArticles({
    offset: currentPage.value * pageSize.value - pageSize.value,
    limit: pageSize.value,
  })) as Awaited<FetchArticlesResponse>;

  articles.value = data.articles;

  totalPages.value = Math.floor(data.articlesCount / pageSize.value);
  if ((data.articlesCount / pageSize.value) % pageSize.value) {
    totalPages.value++;
  }
}
onMounted(() => {
  fetchArticles();
});
watch(
  () => route.params.page,
  () => {
    currentPage.value = Number(route.params.page ?? 1);
    fetchArticles();
  },
);
</script>
