import { defineStore } from "pinia";

export const GLOBAL_STORE_NAME = "global-store";

export const useGlobalStore = defineStore(GLOBAL_STORE_NAME, {
  state: () => ({
    loading: false,
  }),
  getters: {
    isLoading(state) {
      return state.loading;
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
