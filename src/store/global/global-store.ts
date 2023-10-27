import { defineStore } from "pinia";

export const GLOBAL_STORE_NAME = "global-store";

export const useGlobalStore = defineStore(GLOBAL_STORE_NAME, {
  state() {
    return {
      loading: false,
    };
  },
  getters: {
    isLoading() {
      return this.loading;
    },
  },
  actions: {
    enableLoading() {
      this.loading = true;
    },
    disbleLoading() {
      this.loading = false;
    },
  },
});
