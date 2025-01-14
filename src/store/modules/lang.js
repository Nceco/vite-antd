import { defineStore } from "pinia";
import i18n from "@/locales";

export const useLangStore = defineStore("lang", {
  state: () => ({
    lang: "zh_CN",
  }),
  actions: {
    setLanguage(lang) {
      this.lang = lang;
      i18n.global.locale = lang;
    },
  },
});
