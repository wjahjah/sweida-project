/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ألوان الهوية البصرية (اللوغو)
        'sweida-lime': '#A2C13F',   // الأخضر الفاتح المنعش
        'sweida-green': '#6AAE49',  // الأخضر المتوسط (الأصلي)
        'sweida-blue': '#38ADD9',   // الأزرق السماوي
        'sweida-dark': '#4D4D4F',   // الرمادي الفحمي للنصوص
        'sweida-gray': '#808285',   // الرمادي المتوسط للشروحات
        
        // ألوان هيكل الموقع (UI)
        'site-bg': '#F8FAF9',       // خلفية الموقع (باردة ومريحة للعين)
        'site-card': '#FFFFFF',     // لون البطاقات (أبيض ناصع)
        'footer-dark': '#33383c',   // لون الفوتر (الرمادي الاحترافي)
      },
      backgroundImage: {
        // تدرج لوني جاهز لاستخدامه في الأزرار أو العناوين
        'sweida-gradient': 'linear-gradient(to right, #A2C13F, #6AAE49, #38ADD9)',
      }
    },
  },
  plugins: [],
}