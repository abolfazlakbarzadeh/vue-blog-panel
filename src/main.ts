import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/styles/base.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import routes from "./routes";
import axios from "@/utils/axios";

const pinia = createPinia();
const app = createApp(App);
app.use(routes).use(pinia);
app.provide("axios", axios);
app.mount("#app");
