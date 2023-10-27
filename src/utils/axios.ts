/* eslint-disable no-prototype-builtins */
import router from "@/routes";
import { useAuthStore } from "@/store/auth/auth-store";
import axios, { AxiosError, HttpStatusCode } from "axios";
import { toast } from "vue3-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    // if error hasn't information, just leave a simple toast
    if (!error.response?.data) {
      toast.error(`Server Error!`);
      return Promise.reject();
    }

    // if status was unauthorized, logout and go to login page
    if (error.response.status == HttpStatusCode.Unauthorized) {
      const authStore = useAuthStore();
      authStore.logout();
      router.replace({ path: "/login" });
      return Promise.reject();
    }
    return Promise.reject(error);
  },
);

export default instance;
