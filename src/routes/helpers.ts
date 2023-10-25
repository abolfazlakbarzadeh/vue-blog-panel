import { RouteRecordRaw } from "vue-router";

export const hasAuth = (route: RouteRecordRaw): RouteRecordRaw => ({
  ...route,
  meta: {
    ...(route.meta ?? {}),
    requiresAuth: true,
  },
});
