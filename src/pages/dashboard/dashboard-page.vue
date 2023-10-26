<template>
  <div class="dashboard-page d-flex flex-column">
    <TheHeader
      :sidebar-open="sidebarOpen"
      @toggle-sidebar="toggleSidebarHandler"
    />
    <main class="d-flex">
      <TheSidebar :open="sidebarOpen" />
      <div class="container-fluid dashboard-main">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import TheHeader from "@/components/dashboard/the-header.vue";
import TheSidebar from "@/components/dashboard/the-sidebar.vue";

const sidebarOpen = ref(false);
function toggleSidebarHandler(isOpen: boolean) {
  sidebarOpen.value = isOpen;
}
</script>
<style scss>
@import url("@/assets/styles/pages/dashboard/dashboard.scss");
</style>
