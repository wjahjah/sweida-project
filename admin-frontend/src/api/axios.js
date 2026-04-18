import axios from 'axios';

// تحديد الرابط بناءً على وضع التشغيل
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.yourdomain.com/api'  // ضع هنا رابط الدومين الحقيقي الخاص بك
  : 'http://localhost:5000/api';      // سيعمل تلقائياً على اللوكال أثناء البرمجة

const api = axios.create({
  baseURL: API_BASE_URL,
});

// إضافة التوكن تلقائياً لكل طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;