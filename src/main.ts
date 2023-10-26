import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "vue3-toastify/dist/index.css";
import "@/assets/styles/base.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import routes from "./routes";
import axios from "@/utils/axios";
import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";

const pinia = createPinia();
pinia.use(({ store }) => {
  store.$axios = axios;
});
const app = createApp(App);
app.provide("axios", axios);
app
  .use(routes)
  .use(pinia)
  .use(Vue3Toasity, {
    autoClose: 1500,
    theme: "colored",
    icon: false,
  } as ToastContainerOptions);
app.mount("#app");
