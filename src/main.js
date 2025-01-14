import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import ant from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import i18n, { initLanguage } from "@/locales";

const pinia = createPinia();
initLanguage(localStorage.getItem("language") || navigator.language || "zh-CN");

createApp(App).use(pinia).use(router).use(ant).use(i18n).mount("#app");
