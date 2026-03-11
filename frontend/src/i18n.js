import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import translationDE from './locales/de/translation.json';
import translationFR from './locales/fr/translation.json'; // استدعاء ملف الفرنسي

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ar: { translation: translationAR },
    de: { translation: translationDE },
    fr: { translation: translationFR } // إضافة الفرنسي هنا
  },
  lng: 'ar', // اللغة الافتراضية
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});