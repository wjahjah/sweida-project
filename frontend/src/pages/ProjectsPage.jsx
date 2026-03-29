import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import adminService from '../api/adminService'; 

const ProjectsPage = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRtl = i18n.dir() === 'rtl';

  // دالة جلب المشاريع بناءً على اللغة الحالية للمتصفح
  const fetchProjects = async (lang) => {
    try {
      setLoading(true);
      // طلب البيانات من السيرفس مع تمرير اللغة (ar أو en)
      const data = await adminService.getAllProjects(lang);
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // إعادة جلب البيانات كلما تغيرت لغة الموقع
  useEffect(() => {
    const currentLang = i18n.language.split('-')[0]; // الحصول على ar أو en فقط
    fetchProjects(currentLang);
  }, [i18n.language]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-2 border-[#58c322] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans antialiased" dir={i18n.dir()}>
      
      {/* الهيدر: تصميم عصري وبسيط */}
      <header className="relative h-[40vh] flex items-center justify-center text-center overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6 relative z-10">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            className="inline-block text-[10px] font-black uppercase text-[#58c322] mb-4"
          >
            {t('projects_page.tag', 'Our Initiatives')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter"
          >
            {t('nav.projects')}
          </motion.h1>
        </div>
      </header>

      {/* شبكة المشاريع */}
      <main className="max-w-7xl mx-auto px-6 relative z-20 -mt-16 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? projects.map((project, index) => (
            <motion.div 
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full group hover:shadow-xl transition-all duration-500 overflow-hidden"
            >
              {/* صورة المشروع مع الـ Status */}
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={project.image_url || 'https://via.placeholder.com/600x400'} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white ${
                  project.status === 'ACTIVE' ? 'bg-[#58c322]' : 'bg-blue-500'
                }`}>
                  {project.status === 'ACTIVE' ? t('status.active', 'Active') : t('status.completed', 'Completed')}
                </div>
              </div>

              {/* تفاصيل المشروع القادمة من الترجمة */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-black text-slate-800 mb-4 leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed text-sm">
                  {project.description}
                </p>
                
                {/* الميزانية والتقدم */}
                <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">
                      {t('projects_page.budget_label', 'Target')}
                    </span>
                    <span className="text-lg font-black text-slate-800" dir="ltr">
                      ${Number(project.target_budget || 0).toLocaleString()}
                    </span>
                  </div>
                  
                  {/* نسبة الإنجاز بناءً على المبالغ المجموعة */}
                  <div className="text-right">
                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1 block">
                      {t('projects_page.raised_label', 'Raised')}
                    </span>
                    <span className="text-sm font-black text-[#58c322]">
                      {Math.round((project.current_raised / project.target_budget) * 100) || 0}%
                    </span>
                  </div>
                </div>

                <button className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#58c322] transition-colors duration-300">
                  {t('projects_page.view_details', 'View Details')}
                </button>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-20 text-center text-slate-400 font-bold uppercase tracking-widest">
              {t('projects.no_projects', 'No Projects Found')}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;