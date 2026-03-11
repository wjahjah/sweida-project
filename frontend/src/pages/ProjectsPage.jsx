import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const ProjectsPage = () => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const isRtl = i18n.dir() === 'rtl';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // طلب المشاريع بناءً على اللغة المختارة حالياً
        const response = await axios.get(`http://localhost:5000/api/projects?lang=${i18n.language}`);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-site-bg">
      <div className="w-16 h-16 border-4 border-sweida-lime border-t-sweida-blue rounded-full animate-spin mb-4"></div>
      <p className="text-sweida-dark font-black animate-pulse text-xl">{t('common.loading') || '... جارٍ التحميل'}</p>
    </div>
  );

  return (
    <div className="bg-site-bg min-h-screen pt-32 pb-20 font-sans" dir={i18n.dir()}>
      <div className="max-w-7xl mx-auto px-6">
        
        {/* العناوين الرئيسية مع التدرج اللوني المعتمد */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black text-sweida-dark mb-6 tracking-tight uppercase">
            {t('nav.projects')}
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-sweida-lime via-sweida-green to-sweida-blue mx-auto rounded-full shadow-sm"></div>
          <p className="mt-8 text-sweida-gray text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            مشاريع تنموية مستدامة تهدف إلى تمكين مجتمعنا وبناء مستقبل أخضر في قلب السويداء.
          </p>
        </div>

        {/* شبكة المشاريع */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.length > 0 ? projects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden hover:-translate-y-4 transition-all duration-500 border border-slate-50 flex flex-col h-full"
            >
              {/* حاوية الصورة مع طبقة زجاجية للحالة */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start pointer-events-none">
                  <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-lg ${
                    project.status === 'completed' ? 'bg-sweida-green/90 text-white' : 'bg-sweida-blue/90 text-white'
                  }`}>
                    {project.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}
                  </span>
                </div>
                {/* تظليل سفلي للصورة */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>
              </div>

              {/* محتوى المشروع */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-black text-sweida-dark mb-4 group-hover:text-sweida-green transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-sweida-gray mb-8 line-clamp-3 leading-relaxed font-medium">
                  {project.description}
                </p>
                
                <div className="mt-auto space-y-6">
                  {/* شريط الميزانية الاحترافي */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-sweida-gray font-bold uppercase tracking-wider">الميزانية التقديرية</span>
                      <span className="text-xl font-black text-sweida-dark" dir="ltr">
                        <span className="text-sweida-green text-sm">$</span>{Number(project.budget).toLocaleString()}
                      </span>
                    </div>
                    {/* أيقونة تفاعلية */}
                    <div className="w-12 h-12 bg-site-bg rounded-2xl flex items-center justify-center text-xl group-hover:bg-sweida-lime group-hover:text-white transition-all duration-300">
                      📂
                    </div>
                  </div>

                  {/* زر التفاصيل */}
                  <button className="w-full py-4 rounded-2xl bg-site-bg text-sweida-dark font-black hover:bg-sweida-dark hover:text-white transition-all transform active:scale-95 border border-slate-100 group-hover:border-transparent">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-slate-200">
              <span className="text-6xl mb-6 block">🍃</span>
              <p className="text-sweida-gray text-xl font-bold">لا توجد مشاريع مضافة حالياً في هذا القسم.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;