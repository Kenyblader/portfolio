import i18n from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import fr from './locales/fr.json'
import en from './locales/en.json'
import es from './locales/es.json'
import arb from './locales/arb.json'
import de from './locales/alm.json'


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      es: { translation: es },
      ar: { translation: arb },
      de: { translation: de },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en', 'es', 'ar', 'de'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

// Gérer le RTL pour l'arabe
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lng);
  document.documentElement.setAttribute('translate', 'no');
});

export default i18n;