// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {languageMap} from "../Constants/Language/cultureCode";
import enTranslation from "../Locales/en/translations.json"
import arTranslation from "../Locales/ar/translations.json"

const resources = {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: languageMap[0],
        debug: false,
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });

export default i18n;

//
// import i18n from 'i18next'
// import Backend from 'i18next-http-backend'
// import LanguageDetector from "i18next-browser-languagedetector";
// import {initReactI18next} from 'react-i18next'
// import englishTranslation from "../Translations/LocaleLanguages/English/englishTranslation";
// import arabicTranslation from "../Translations/LocaleLanguages/Arabic/arabicTranslation";
//
// const resources = {
//     en: {
//         translation: englishTranslation
//     },
//     ar: {
//         translation: arabicTranslation
//     }
// };
// i18n.use(Backend).use(new LanguageDetector(null, {lookupLocalStorage: "lang"})).use(initReactI18next).init({
//     resources,
//     fallbackLng: "en",
//     lng: 'en',
//     debug: false,
//     interpolation: {
//         escapeValue: false
//     }
// })
// export default i18n
