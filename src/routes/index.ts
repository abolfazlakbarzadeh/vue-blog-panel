import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "pages/auth/login-page.vue";
import RegisterPage from "pages/auth/register-page.vue";
import { ROUTES_NAMES } from "./constants";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: ROUTES_NAMES.auth.login,
      path: "/auth/login",
      component: LoginPage,
      meta: {
        isGuest: true,
      },
    },
    {
      name: ROUTES_NAMES.auth.register,
      path: "/auth/register",
      component: RegisterPage,
      meta: {
        isGuest: true,
      },
    },
  ],
});

export default router;
