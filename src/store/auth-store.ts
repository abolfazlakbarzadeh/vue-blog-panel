import { defineStore } from "pinia";
import type { User } from "@/types.d.ts";

export const AUTH_STORE_NAME = "auth-store";

export type AuthUserState = { user: User };

export const useAuthStore = defineStore(AUTH_STORE_NAME, {
  state: (): AuthUserState => ({
    user: {
      email: "",
      username: "",
      bio: undefined,
      image: "",
      token: "",
    },
  }),
  getters: {
    getUser: (state) => state.user,
    getUserToken: (state) => state.user.token,
    isUserAuthenticated: (state) => !!state.user.token,
  },
  actions: {
    async fetchUser() {
      const user = await this.$axios.get("/user", {
        headers: {
          Authorization: `Token ${this.user.token}`,
        },
      });
      console.log({
        user,
      });
    },
  },
});
