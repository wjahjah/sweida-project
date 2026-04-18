import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import translationDE from './locales/de/translation.json';
import translationFR from './locales/fr/translation.json';

// 1. قائمة اللغات التي يدعمها موقعك
const supportedLanguages = ['ar', 'en', 'de', 'fr'];

// 2. دالة ذكية للبحث عن أقرب لغة تناسب جهاز المستخدم
const getBestMatchLanguage = () => {
  // جلب قائمة اللغات المفضلة من المتصفح/النظام
  const userLanguages = navigator.languages || [navigator.language || navigator.userLanguage];
  
  // البحث في لغات المستخدم بالترتيب
  for (let i = 0; i < userLanguages.length; i++) {
    const lang = userLanguages[i].split('-')[0]; // أخذ أول حرفين (مثلاً ar من ar-EG)
    if (supportedLanguages.includes(lang)) {
      return lang; // وجدنا تطابق! نرجعه فوراً
    }
  }
  return 'en'; // إذا لم نجد أي تطابق، نستخدم الإنجليزية كافتراضي
};

// 3. قراءة اختيار المستخدم السابق، أو استخدام اللغة التي اكتشفناها
const savedLanguage = localStorage.getItem('appLanguage') || getBestMatchLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    ar: { translation: translationAR },
    de: { translation: translationDE },
    fr: { translation: translationFR }
  },
  lng: savedLanguage, 
  fallbackLng: 'en',  
  interpolation: { escapeValue: false }
});

// 4. ضبط اتجاه الصفحة فوراً
document.documentElement.dir = i18n.dir(savedLanguage);

export default i18n;