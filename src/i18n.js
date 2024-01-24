// Import the required libraries
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files for different languages
import translationEN from "./locales/en/translation.json";
import translationIT from "./locales/it/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationJA from "./locales/ja/translation.json";
import translationZH from "./locales/zh/translation.json";

// Initialize i18next with React bindings
i18n.use(initReactI18next).init({
  // Define resources for each language
  resources: {
    en: {
      translation: translationEN,
    },
    it: {
      translation: translationIT,
    },
    fr: {
      translation: translationFR,
    },
    ja: {
      translation: translationJA,
    },
    zh: {
      translation: translationZH,
    },
  },
  // Set the default language to English
  lng: "en",
  // Set the fallback language to English
  fallbackLng: "en",
  // Configure interpolation
  interpolation: {
    // Disable HTML escaping for translations
    escapeValue: false,
  },
});

// Export the i18n instance
export default i18n;
