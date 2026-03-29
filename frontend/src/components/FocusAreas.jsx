import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Droplets, Sun, Factory, ArrowRight, ArrowLeft } from 'lucide-react';

const FocusAreas = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const areas = [
    {
      title: t('focus_areas.water.title'),
      desc: t('focus_areas.water.desc'),
      icon: <Droplets className="w-8 h-8" />,
      color: "sweida-blue",
      bg: "bg-blue-500/10",
      delay: 0.1
    },
    {
      title: t('focus_areas.energy.title'),
      desc: t('focus_areas.energy.desc'),
      icon: <Sun className="w-8 h-8" />,
      color: "sweida-green",
      bg: "bg-green-500/10",
      delay: 0.2
    },
    {
      title: t('focus_areas.industry.title'),
      desc: t('focus_areas.industry.desc'),
      icon: <Factory className="w-8 h-8" />,
      color: "sweida-lime",
      bg: "bg-lime-500/10",
      delay: 0.3
    }
  ];

  return (
    <section className="py-24 container mx-auto px-6 overflow-hidden">
      {/* العنوان مع حركة ظهور */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-black text-sweida-dark mb-6 tracking-tight">
          {t('focus_areas.main_title')}
        </h2>
        <div className="w-24 h-1.5 bg-gradient-to-r from-sweida-lime via-sweida-green to-sweida-blue mx-auto rounded-full"></div>
      </motion.div>

      {/* الشبكة البرمجية */}
      <div className="grid md:grid-cols-3 gap-8">
        {areas.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: item.delay, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="group relative bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-sweida-green/20 transition-all duration-500"
          >
            {/* الأيقونة الحقيقية مع خلفية متدرجة عند الهوفر */}
            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 ${item.bg} text-${item.color} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner`}>
              {item.icon}
            </div>

            <h3 className="text-2xl font-black mb-4 text-sweida-dark group-hover:text-sweida-green transition-colors duration-300">
              {item.title}
            </h3>

            <p className="text-sweida-gray leading-relaxed mb-10 font-medium text-base">
              {item.desc}
            </p>

            {/* زر القراءة مع أيقونة سهم ديناميكية */}
            <Link 
              to="/projects" 
              className={`inline-flex items-center gap-3 font-black text-sm uppercase tracking-widest text-${item.color} group-hover:gap-5 transition-all`}
            >
              {t('projects.read_more')}
              {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </Link>

            {/* لمسة فنية خفيفة تظهر عند الهوفر في الزاوية */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${item.color}/5 to-transparent rounded-tr-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FocusAreas;