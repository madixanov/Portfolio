import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
import uz from "./locales/uz.json";

if (!i18n.isInitialized) {
    i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            fallbackLng: "en",
            lng: "en",

            interpolation: {
                escapeValue: false,
            },

            resources: {
                en: { translation: en },
                ru: { translation: ru },
                uz: { translation: uz },
            },
        });
}

export default i18n;