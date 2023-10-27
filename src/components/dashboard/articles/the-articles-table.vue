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
                    query: {
                      from: route.fullPath,
                    },
                  }"
                  class="dropdown-item"
                  >Edit</RouterLink
                >
              </li>
              <li>
                <button
                  class="dropdown-item"
                  @click="() => showDeleteModal(article.slug)"
                >
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </td>
      </tr>
      <tr></tr>
    </tbody>
  </table>
  <DeleteModal
    v-if="deleteModalState.enable"
    title="Delete Article"
    submit-type="danger"
    submit-text="Yes"
    @submit="deleteModal"
    @dismiss="deleteModalState.enable = false"
  >
    Are you sure to delete Article?
  </DeleteModal>
</template>
<script lang="ts" setup>
import { ROUTES_NAMES } from "@/routes/constants";
import DeleteModal from "@/components/global/modals/delete-modal.vue";
import { reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const deleteModalState = reactive<Partial<{ enable: boolean; slug?: string }>>({
  enable: false,
});
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
const emit = defineEmits(["deleteArticle"]);
function showDeleteModal(slug: string) {
  deleteModalState.slug = slug;
  deleteModalState.enable = true;
}
async function deleteModal() {
  deleteModalState.enable = false;
  emit("deleteArticle", deleteModalState.slug);
}
</script>
