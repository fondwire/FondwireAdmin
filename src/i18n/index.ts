import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// import en from './locales/en.json'
// import de from './locales/de.json'
import data from './locales/data.json'

const options:any = {
    resources: {
        en: {
            common: data.languages.en,
        },
        de: {
            common: data.languages.de,
        },
    },

    fallbackLng: "de",

    ns: ["common"],

    defaultNS: "common",

    react: {
        lng: 'en',
        wait: false,
        bindI18n: "languageChanged loaded",
        bindStore: "added removed",
        nsMode: "default"
    },
};

i18n.use(LanguageDetector).use(initReactI18next).init(options).then(()=>{
    let lng = localStorage.getItem('i18nextLng')
    if(lng && lng === 'ru-RU'){
        localStorage.setItem('i18nextLng', 'en')
    }
})

export default i18n;