<template>
  <div class="the-sidebar" :class="{ open }">
    <ul>
      <li v-for="(menu, index) in menuItems" :key="index" class="sbr-menu-item">
        <RouterLink
          v-if="!!menu.route"
          :to="{ name: menu.route }"
          class="mi-link"
          >{{ menu.title }}</RouterLink
        >
        <span v-else class="mi-title">{{ menu.title }}</span>
        <ul v-if="!!menu.children?.length">
          <li
            v-for="(submenu, submenuIndex) in menu.children"
            :key="submenuIndex"
            class="sbr-submenu-item"
            :class="{ active: submenu.active }"
          >
            <RouterLink
              v-if="!!submenu.route"
              :to="{ name: submenu.route }"
              class="text-decoration-none text-white mi-smi-link"
              >{{ submenu.title }}</RouterLink
            >
            <span
              v-else
              class="mi-smi-title"
              :class="{ active: submenu.active }"
              >{{ submenu.title }}</span
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { ROUTES_NAMES } from "../../routes/constants";

defineProps({
  open: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const route = useRoute();
type MenuItem = {
  title: string;
  route?: string;
  active?: boolean;
  children?: MenuItem[];
};
const menuItems = computed<MenuItem[]>(() => [
  {
    title: "Posts",
    children: [
      {
        title: "All Articles",
        route: ROUTES_NAMES.dashboard.articles.self,
        active: route.name == ROUTES_NAMES.dashboard.articles.self,
      },
    ],
  },
]);
</script>
<style scss scoped>
@import url("@/assets/styles/components/dashboard/sidebar.scss");
</style>
