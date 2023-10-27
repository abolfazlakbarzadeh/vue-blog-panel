<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGlobalStore } from "./store/global/global-store";
import LoadingOverlay from "./components/global/loading-overlay.vue";
const globalStore = storeToRefs(useGlobalStore());
</script>

<template>
  <Teleport to="body">
    <loading-overlay v-if="globalStore.isLoading.value" />
  </Teleport>
  <router-view></router-view>
</template>

<style scoped></style>
