import axios from 'axios';

const api = axios.create({
  // الرابط الأساسي للسيرفر الخاص بك
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// يمكنك هنا إضافة Interceptors لاحقاً للتعامل مع التوكن (Token) أو الأخطاء
export default api;