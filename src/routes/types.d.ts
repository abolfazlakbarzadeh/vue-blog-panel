export {};

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    isGuest?: boolean;
  }
}
