<template>
  <div class="articles-page">
    <div class="d-flex flex-column align-items-center gap-4">
      <h1 class="w-100">All Posts</h1>
      <TheArticlesTable
        :articles="articles"
        :current-page="currentPage"
        :page-size="pageSize"
        @delete-article="handleDeleteArticle"
      />
      <ThePagination :total-pages="totalPages" :current-page="currentPage" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TheArticlesTable from "@/components/dashboard/articles/the-articles-table.vue";
import ThePagination from "@/components/dashboard/articles/the-pagination.vue";
import { useArticleService } from "@/services/articles/articles-service";
import { FetchArticlesResponse } from "@/services/articles/types";
import { onBeforeMount, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const articles = ref<FetchArticlesResponse["articles"]>([]);
const route = useRoute();
const router = useRouter();
const currentPage = ref(Number(route.params.page ?? 1));
const totalPages = ref(1);
const pageSize = ref(10);

const articlesService = useArticleService();

async function fetchArticles() {
  if (Number(route.params.page) == 1) return;
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
function checkRoute() {
  if (Number(route.params.page) == 1) {
    router.replace({ path: "/articles" });
    return;
  }
}
async function handleDeleteArticle(slug: string) {
  await articlesService.deleteArticle(slug);
}
onBeforeMount(() => {
  checkRoute();
  fetchArticles();
}),
  watch(
    () => route.params.page,
    () => {
      checkRoute();
      currentPage.value = Number(route.params.page ?? 1);
      fetchArticles();
    },
  );
</script>
