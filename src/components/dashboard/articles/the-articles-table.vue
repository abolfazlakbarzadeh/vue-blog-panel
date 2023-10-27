<template>
  <table class="table">
    <thead class="table-light">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Tags</th>
        <th scope="col">Excerpt</th>
        <th scope="col">Created</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(article, index) in articles" :key="index">
        <th scope="row">
          {{ index + (currentPage - 1) * pageSize + 1 }}
        </th>
        <td scope="row">{{ article.title }}</td>
        <td>{{ article.author.username }}</td>
        <td>{{ article.tagList.join(", ") }}</td>
        <td>{{ article.description }}</td>
        <td>{{ new Date(article.createdAt).toDateString() }}</td>
        <td>
          <div class="dropdown">
            <button
              id="dropdownMenuButton1"
              class="btn btn-info dropdown-toggle text-white"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <RouterLink
                  :to="{
                    name: ROUTES_NAMES.dashboard.articles.edit,
                    params: { slug: article.slug },
                  }"
                  class="dropdown-item"
                  >Edit</RouterLink
                >
              </li>
              <li><div class="dropdown-item">Delete</div></li>
            </ul>
          </div>
        </td>
      </tr>
      <tr></tr>
    </tbody>
  </table>
</template>
<script lang="ts" setup>
import { ROUTES_NAMES } from "@/routes/constants";
defineProps({
  articles: {
    type: Array<any>,
    required: true,
    default: () => [],
  },
  pageSize: {
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
</script>
