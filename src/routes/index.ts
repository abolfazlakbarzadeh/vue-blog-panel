import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "pages/auth/login-page.vue";
import RegisterPage from "pages/auth/register-page.vue";
import DashboardPage from "pages/dashboard/dashboard-page.vue";
import ArticlesPage from "pages/dashboard/articles/articles-page.vue";
import NewArticlePage from "pages/dashboard/articles/new-article-page.vue";
import EditArticlePage from "pages/dashboard/articles/edit-article-page.vue";
import { ROUTES_NAMES } from "./constants";
import { useAuthStore } from "@/store/auth/auth-store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: ROUTES_NAMES.auth.login,
      path: "/login",
      component: LoginPage,
      meta: {
        isGuest: true,
      },
    },
    {
      name: ROUTES_NAMES.auth.register,
      path: "/register",
      component: RegisterPage,
      meta: {
        isGuest: true,
      },
    },
    {
      name: ROUTES_NAMES.dashboard.self,
      path: "/",
      component: DashboardPage,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          name: ROUTES_NAMES.dashboard.articles.self,
          path: "/articles",
          component: ArticlesPage,
        },
        {
          name: ROUTES_NAMES.dashboard.articles.page,
          path: "/articles/page/:page",
          component: ArticlesPage,
        },
        {
          name: ROUTES_NAMES.dashboard.articles.create,
          path: "/articles/create",
          component: NewArticlePage,
        },
        {
          name: ROUTES_NAMES.dashboard.articles.edit,
          path: "/articles/edit/:slug",
          component: EditArticlePage,
        },
      ],
    },
  ],
});
router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();
  if (to.meta.isGuest) {
    if (authStore.isUserAuthenticated) {
      return next({ name: ROUTES_NAMES.dashboard.articles.self });
    } else {
      return next();
    }
  } else if (to.meta.requiresAuth) {
    if (authStore.isUserAuthenticated) {
      return next();
    } else {
      return next({ name: ROUTES_NAMES.auth.login });
    }
  }

  return next();
});

export default router;
