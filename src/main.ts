import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "@/assets/styles/base.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import routes from "./routes";

const pinia = createPinia();
createApp(App).use(routes).use(pinia).mount("#app");
