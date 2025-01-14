import { createI18n } from "vue-i18n";
import en from "./en.js";
import zh from "./zh_cn.js";

const lang = localStorage.getItem("language") || navigator.language || "zh-CN";

const i18n = createI18n({
  locale: lang,
  fallbackLocale: "zh-CN",
  silentTranslationWarn: true,
  messages: {
    en,
    zh,
  },
});

export const initLanguage = (lang) => {
  i18n.global.locale = lang;
  localStorage.setItem("language", lang);
};

export const LanguageList = [
  {
    label: "common.chinese",
    value: "zh-CN",
  },
  {
    label: "common.english",
    value: "en",
  },
];

export default i18n;
