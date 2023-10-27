/* eslint-disable no-prototype-builtins */
import axios, { AxiosError } from "axios";
import { toast } from "vue3-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    if (!error.response?.data) {
      toast.error(`Server Error!`);
      return Promise.reject();
    }
    return Promise.reject(error);
  },
);

export default instance;
