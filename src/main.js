import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "../src/assets/css/styles.scss";

import VueSingleSelect from "vue-single-select";

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);
app.mount("#app");
app.component("vue-single-select", VueSingleSelect);

// eslint-disable-next-line
