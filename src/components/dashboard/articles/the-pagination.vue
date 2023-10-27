<template>
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: currentPage == 1 }">
      <RouterLink
        :to="{
          name: ROUTES_NAMES.dashboard.articles.page,
          params: { page: currentPage - 1 },
        }"
        class="page-link"
      >
        {{ "<" }}
      </RouterLink>
    </li>
    <li
      v-for="page in totalPages"
      :key="page"
      class="page-item"
      :class="{ active: page == Number(route.params.page ?? 1) }"
    >
      <RouterLink
        :to="{
          name: ROUTES_NAMES.dashboard.articles.page,
          params: { page },
        }"
        class="page-link"
        href="#"
        >{{ page }}</RouterLink
      >
    </li>
    <li class="page-item" :class="{ disabled: currentPage == totalPages }">
      <RouterLink
        :to="{
          name: ROUTES_NAMES.dashboard.articles.page,
          params: { page: currentPage + 1 },
        }"
        class="page-link"
      >
        {{ ">" }}
      </RouterLink>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ROUTES_NAMES } from "@/routes/constants";
import { useRoute } from "vue-router";
defineProps({
  totalPages: {
    type: Number,
    required: true,
    default: 1,
  },
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
});

const route = useRoute();
</script>
