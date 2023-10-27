import { defineStore } from "pinia";
import type { User } from "@/types";
import type {
  FetchUserResponse,
  LoginResponse,
  LoginParams,
  RegisterParams,
} from "./types";
import { USER_INITIAL } from "./contants";
import { toast } from "vue3-toastify";
import { AxiosError } from "axios";
import { useGlobalStore } from "../global/global-store";

export const AUTH_STORE_NAME = "auth-store";

export type AuthUserState = { user: User };

export const useAuthStore = defineStore(AUTH_STORE_NAME, {
  persist: true,
  state: (): AuthUserState => ({
    user: { ...USER_INITIAL },
  }),
  getters: {
    getUser: (state) => state.user,
    getUserToken: (state) => state.user.token,
    isUserAuthenticated: (state) => !!state.user.token,
  },
  actions: {
    async fetchUser() {
      const {
        data: { user },
      } = await this.$axios.get<FetchUserResponse>("/user", {
        headers: {
          Authorization: `Token ${this.getUserToken}`,
        },
      });
      this.user = user;
    },
    async login(params: LoginParams): Promise<boolean | void> {
      const globalStore = useGlobalStore();

      globalStore.enableLoading();
      return this.$axios
        .post<LoginResponse>("/users/login", {
          user: params,
        })
        .then(({ data: { user } }) => {
          this.user = user;
          toast.success(`Welcome ${user.username}!`, {
            autoClose: 3000,
          });
          return true;
        })
        .catch(handleCatch("login"))
        .finally(() => {
          globalStore.disbleLoading();
        });
    },
    async register(params: RegisterParams) {
      this.$axios
        .post<LoginResponse>("/users/register", {
          user: params,
        })
        .then(({ data: { user } }) => {
          this.user = user;
        })
        .catch(handleCatch("register"));
    },
    logout() {
      this.user = { ...USER_INITIAL };
    },
  },
});

const handleCatch =
  (action: "login" | "register" | "fetchUser") => (error?: AxiosError) => {
    console.log({
      error,
      action,
    });
    if (error) {
      switch (action) {
        case "login":
          handlerLoginCatch();
          break;
        case "register":
          handlerRegisterCatch();
          break;

        default:
          toast.error("Unknown Login Error!");
          break;
      }
    }

    function handlerLoginCatch() {
      switch (error?.response?.status) {
        case 403: {
          toast.error(`Login Failed!: Username and/or Password is invalid`);
          break;
        }
        default: {
          toast.error("Login Failed!");
        }
      }
    }

    function handlerRegisterCatch() {
      switch (error?.response?.status) {
        case 403: {
          toast.error(`Register Failed!: Username and/or Password is invalid`);
          break;
        }
        default: {
          toast.error("Register Failed!");
        }
      }
    }
  };
