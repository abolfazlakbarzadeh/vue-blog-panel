import "assets/global.scss";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import routes from "./routes";
import BootstrapVue from "bootstrap-vue-3";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const pinia = createPinia();
createApp(App).use(BootstrapVue).use(routes).use(pinia).mount("#app");
