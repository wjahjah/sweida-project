import api from './axios';

const adminService = {
  // جلب إحصائيات لوحة التحكم (تستخدمها ImpactStats.jsx)
  getDashboardStats: async () => {
    try {
      // نستخدم المسار الصحيح المتوقع في الباك-أند
      const response = await api.get('/admin/stats'); 
      return response.data;
    } catch (error) {
      console.error("Error fetching stats:", error);
      throw error;
    }
  },

  // جلب كافة المشاريع (تستخدمها ProjectsPage.jsx)
  getAllProjects: async (lang = 'ar') => {
    try {
      // إرسال 'language' ليتوافق مع اسم الحقل في جدول التراجم
      const response = await api.get(`/projects?language=${lang}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return []; 
    }
  },

  // إرسال مقترح مشروع (تستخدمها SuggestProject.jsx)
  submitProjectProposal: async (proposalData) => {
    try {
      // المسار المتفق عليه للمقترحات
      const response = await api.post('admin/projects/suggest', proposalData);
      return response.data;
    } catch (error) {
      console.error("Error submitting proposal:", error);
      throw error;
    }
  }
};

export default adminService;