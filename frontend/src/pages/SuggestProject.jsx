import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import adminService from '../api/adminService'; 

const SuggestProject = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  // 1. حالة النموذج لتخزين مدخلات المستخدم بالكامل
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    title: '',
    category: '',
    goal: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // تحديث البيانات عند الكتابة في أي حقل
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 2. دالة إرسال الطلب إلى السيرفر
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من الحقول الإجبارية قبل الإرسال
    if (!formData.name || !formData.phone || !formData.title || !formData.goal) {
      alert(isRtl ? "يرجى ملء كافة الحقول المطلوبة التي تحمل علامة (*)" : "Please fill all required fields (*)");
      return;
    }

    setIsSubmitting(true);

    // تجهيز الكائن ليتوافق مع هيكلية الجداول (Projects + Project_Translations)
    const projectPayload = {
      // بيانات التواصل (تخزن في جدول Projects)
      suggested_by_name: formData.name,
      suggested_by_phone: formData.phone,
      suggested_by_email: formData.email,
      suggested_by_location: formData.location, 
      category: formData.category, // تصنيف المشروع
      
      // إعدادات الحالة والأمان
      target_budget: 0, 
      is_user_proposal: true, 
      status: 'PENDING_APPROVAL', 

      // البيانات النصية المترجمة (تخزن في جدول Project_Translations)
      translations: [
        {
          language: i18n.language, 
          title: formData.title,
          description: formData.goal
        }
      ]
    };

    try {
      // استدعاء التابع من adminService لإرسال البيانات
      await adminService.submitProjectProposal(projectPayload);
      
      alert(isRtl ? "تم إرسال مقترحك بنجاح! سيتم مراجعته من قبل الإدارة قريباً." : "Proposal sent successfully! Our team will review it soon.");
      
      // تفريغ النموذج بعد النجاح لتهيئته لطلب جديد
      setFormData({ name: '', phone: '', email: '', location: '', title: '', category: '', goal: '' });
    } catch (error) {
      console.error("Submission Error:", error);
      alert(isRtl ? "عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً." : "Sorry, an error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased" dir={i18n.dir()}>
      {/* رأس الصفحة */}
      <header className="relative h-[45vh] flex items-center justify-center bg-slate-100 border-b border-slate-200">
        <div className="container mx-auto px-6 text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter"
          >
            {t('suggest.title')}
          </motion.h1>
          <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
            {t('suggest.desc')}
          </p>
        </div>
      </header>

      {/* جسم النموذج */}
      <div className="container mx-auto px-6 max-w-4xl relative z-20 -mt-20 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <form className="p-8 md:p-16 space-y-16" onSubmit={handleSubmit}>
            
            {/* القسم الأول: بيانات مقدم المشروع */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b pb-4">
                <span className="text-xl">👤</span>
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">
                  {t('suggest.personal_section')}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('suggest.name')} *</label>
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 p-4 outline-none focus:bg-white focus:border-[#58c322] border-b border-transparent transition-all text-sm font-medium" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('suggest.phone')} *</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} dir="ltr" className="w-full bg-slate-50 p-4 outline-none focus:bg-white focus:border-[#58c322] border-b border-transparent transition-all text-sm font-medium text-left" placeholder="+963" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('suggest.email')}</label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 p-4 focus:bg-white border-b border-transparent focus:border-[#58c322] outline-none transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('suggest.location')}</label>
                  <input name="location" value={formData.location} onChange={handleChange} className="w-full bg-slate-50 p-4 focus:bg-white border-b border-transparent focus:border-[#58c322] outline-none transition-all text-sm font-medium" />
                </div>
              </div>
            </section>

            {/* القسم الثاني: تفاصيل المشروع */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b pb-4">
                <span className="text-xl">💡</span>
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tighter">
                  {t('suggest.project_section')}
                </h2>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('suggest.project_title')} *</label>
                    <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-slate-50 p-4 focus:bg-white border-b border-transparent focus:border-[#58c322] outline-none text-sm font-medium" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('suggest.category')}</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-50 p-4 focus:bg-white border-b border-transparent focus:border-[#58c322] outline-none text-sm font-medium cursor-pointer">
                      <option value="">{t('common.select')}</option>
                      <option value="energy">Energy & Tech</option>
                      <option value="water">Water Resources</option>
                      <option value="education">Education</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('suggest.goal')} *</label>
                  <textarea name="goal" value={formData.goal} onChange={handleChange} rows="5" className="w-full bg-slate-50 p-4 focus:bg-white border-b border-transparent focus:border-[#58c322] outline-none text-sm font-medium resize-none" required />
                </div>
              </div>
            </section>

            {/* تذييل النموذج والأزرار */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-50">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest max-w-xs italic text-center md:text-left leading-relaxed">
                {t('suggest.disclaimer')}
              </p>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`flex-[2] min-w-[200px] md:px-14 py-4 bg-[#58c322] text-white font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4ea81e]'}`}
              >
                {isSubmitting ? (isRtl ? "جاري الإرسال..." : "Sending...") : t('suggest.send')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SuggestProject;