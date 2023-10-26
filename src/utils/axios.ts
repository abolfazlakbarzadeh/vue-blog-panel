/* eslint-disable no-prototype-builtins */
import axios, { AxiosError } from "axios";
import { toast } from "vue3-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    console.log({
      error,
    });
    if (error.response?.data && error.response?.data.message) {
      toast.error(
        `Error ${error.response.status}: ${error.response.data.message}`,
      );
    } else {
      return error;
    }
  },
);

export default instance;
