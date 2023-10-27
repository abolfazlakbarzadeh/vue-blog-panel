<template>
  <div class="new-article-page d-flex flex-column gap-4 align-items-center">
    <h1 class="w-100">New Article</h1>
    <ArticleForm @submit="handleNewArticleSubmit" />
  </div>
</template>
<script setup>
import ArticleForm from "@/components/dashboard/articles/article-form.vue";
import { useArticleService } from "@/services/articles/articles-service";
import { useRouter } from "vue-router";

const articleService = useArticleService();
const router = useRouter();

async function handleNewArticleSubmit(params) {
  const success = await articleService.createArticle(params);
  if (success) router.push({ path: "/articles" });
}
</script>
