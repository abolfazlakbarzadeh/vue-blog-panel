<template>
  <div class="container mainContainer">
    <div class="row align-items-center justify-content-center auth-page">
      <div class="card auth-card">
        <div class="card-body">
          <h5 class="card-title">Register</h5>
          <div class="card-text">
            <div class="d-flex flex-column gap-3">
              <RegisterForm @submit="handleRegister" />
              <div class="d-flex align-items-center gap-2">
                <div class="text">Already registred?</div>
                <RouterLink
                  :to="{ name: ROUTES_NAMES.auth.login }"
                  class="fw-bold text-decoration-none text-black"
                  >Login</RouterLink
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import RegisterForm from "@/components/auth/register-form.vue";
import { ROUTES_NAMES } from "@/routes/constants";
import { useAuthStore } from "@/store/auth/auth-store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

async function handleRegister(params) {
  const success = await authStore.register(params);
  if (success) router.replace({ path: "/articles" });
}
</script>
<style scss>
@import url("../../assets/styles/pages/auth/auth.scss");
</style>
