import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import adminService from '../api/adminService'; 

const ImpactStats = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const [dbStats, setDbStats] = useState({
    projects: "0",
    energy: "0",
    donors: "0"
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await adminService.getDashboardStats();
        setDbStats({
          projects: `${data.activeProjects}+`,
          energy: "4.5 MW", 
          donors: `${(data.totalDonors / 1000).toFixed(0)}k+`
        });
      } catch (error) {
        console.error("خطأ أثناء جلب الإحصائيات:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const statsData = [
    { 
      label: t('stats.projects_label'), 
      val: dbStats.projects, 
      percent: 70, 
      color: 'stroke-sweida-lime', 
      text: 'text-sweida-lime' 
    },
    { 
      label: t('stats.energy_label'), 
      val: dbStats.energy, 
      percent: 55, 
      color: 'stroke-sweida-blue', 
      text: 'text-sweida-blue' 
    },
    { 
      label: t('stats.beneficiaries_label'), 
      val: dbStats.donors, 
      percent: 90, 
      color: 'stroke-sweida-green', 
      text: 'text-sweida-green' 
    },
  ];

  if (loading) return null;

  return (
    /* تم إزالة rounded و mx-4 لجعل السكشن على كامل عرض الشاشة وبدون زوايا */
    <section className="py-24 bg-footer-dark text-white w-full shadow-2xl relative overflow-hidden">
      
      {/* تأثيرات الخلفية */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sweida-blue rounded-full blur-[150px]"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-black mb-20 tracking-tight">
          {t('impact.title')} 
          <span className="text-sweida-lime"> {t('impact.highlight')}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {statsData.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-44 h-44 flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" className="stroke-white/5 fill-none" strokeWidth="4" />
                  <motion.circle
                    initial={{ strokeDashoffset: 283 }}
                    whileInView={{ strokeDashoffset: 283 - (283 * stat.percent) / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "circOut" }}
                    cx="50%" cy="50%" r="45%"
                    className={`${stat.color} fill-none`}
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className={`text-4xl font-black ${stat.text}`} 
                    dir="ltr"
                  >
                    {stat.val}
                  </motion.span>
                  <span className="text-[11px] text-gray-400 font-bold uppercase mt-2 tracking-widest">
                    {stat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;