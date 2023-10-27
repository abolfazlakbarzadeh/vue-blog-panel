<template>
  <div class="new-article-page d-flex flex-column gap-4 align-items-center">
    <h1 class="w-100">Edit Article</h1>
    <ArticleForm
      v-if="editingArticle.article"
      :initial="editingArticle"
      @submit="handleEditArticle"
    />
  </div>
</template>
<script lang="ts" setup>
import ArticleForm from "@/components/dashboard/articles/article-form.vue";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useArticleService } from "@/services/articles/articles-service";
import { FetchArticleResponse } from "@/services/articles/types";

const articleService = useArticleService();
const route = useRoute();
const router = useRouter();

const editingArticle = reactive<Partial<FetchArticleResponse>>({});

async function fetchArticle() {
  const article = (await articleService.getArticle(
    route.params.slug as string,
  )) as Awaited<FetchArticleResponse>;

  editingArticle.article = article.article;
}
async function handleEditArticle(params) {
  const success = await articleService.updateArticle(
    route.params.slug as string,
    params,
  );
  if (success)
    router.push({ path: route.query.from?.toString() ?? "/articles" });
}
onMounted(() => {
  fetchArticle();
});
</script>
