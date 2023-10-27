<template>
  <div class="the-header navbar navbar-expand-lg bg-dark">
    <div class="d-flex align-items-center gap-3">
      <HumburgerIcon
        class="hr-menu-toggle"
        :checked="sidebarOpen"
        @click="toggleSidebar"
      />
      <h2 class="navbar-brand text-white hr-title">Arvan Challenge</h2>
      <div class="hr-username text-white fw-light">
        Welcome {{ user.username }}
      </div>
    </div>
    <div class="hr-actions ml-auto">
      <div class="btn btn-outline-info" @click="handleLogout">Logout</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import HumburgerIcon from "../global/humburger-icon.vue";
import { useAuthStore } from "@/store/auth/auth-store";

const { user, logout } = useAuthStore();
const router = useRouter();

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const emit = defineEmits(["toggleSidebar"]);

function handleLogout() {
  logout();
  router.replace({ path: "/login" });
}
function toggleSidebar() {
  emit("toggleSidebar", !props.sidebarOpen);
}
</script>
<style scss scoped>
@import url("@/assets/styles/components/dashboard/header.scss");
</style>
