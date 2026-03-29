import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// استيراد المكونات المستقلة
import HeroSlider from '../components/HeroSlider';
import ImpactStats from '../components/ImpactStats'; 
import FocusAreas from '../components/FocusAreas';
import SupportCTA from '../components/SupportCTA';

const Home = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="bg-site-bg min-h-screen font-sans text-sweida-dark overflow-hidden">
      
      {/* SECTION 1: HERO SLIDER */}
      <HeroSlider t={t} isRtl={isRtl} lang={i18n.language} />

      {/* SECTION 2: ABOUT SUMMARY (مع إصلاح الاتجاه والحواف) */}
      <section className="py-24 container mx-auto px-6 overflow-hidden">
        {/* نعتمد على المتصفح لقلب الأعمدة تلقائياً عبر dir="rtl" المطبق على مستوى التطبيق */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* العمود الأول: النصوص */}
          <div className="flex flex-col">
            <h2 className="text-sweida-green font-bold mb-4 uppercase tracking-[0.2em] text-sm">
              {t('nav.about')}
            </h2>
            
            <h3 className="text-3xl md:text-5xl font-black text-sweida-dark mb-6 leading-tight">
              {t('about_section.title_part1')}
              <span className="text-sweida-green"> {t('about_section.title_highlight1')} </span>
              {t('about_section.title_part2')}
              <span className="text-sweida-blue"> {t('about_section.title_highlight2')} </span>
              {t('about_section.title_part3')}
            </h3>
            
            <p className="text-sweida-gray text-lg leading-loose mb-8 text-justify font-medium">
              {t('about_section.description')}
            </p>
            
            <Link to="/about" className="group inline-flex items-center gap-3 text-sweida-blue font-black text-lg transition-all hover:text-sweida-green w-fit">
              <span className="border-b-2 border-sweida-blue group-hover:border-sweida-green pb-1">
                {t('projects.read_more')}
              </span>
              {/* السهم يقلب اتجاهه بناءً على اللغة */}
              <span className={`transform transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                →
              </span>
            </Link>
          </div>

          {/* العمود الثاني: الصورة والزخرفة */}
          <div className="relative">
            {/* زخرفة خلفية علوية */}
            <div className={`absolute -top-10 ${isRtl ? '-left-10' : '-right-10'} w-32 h-32 bg-sweida-lime/20 rounded-full blur-3xl animate-pulse`}></div>
            
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              src="/images/sweida-about.jpg" 
              alt="Sweida Nature" 
              className="relative rounded-none w-full h-[500px] object-cover z-10 shadow-2xl" 
            />

            {/* إطار خلفي سفلي (مربع الحواف) */}
            <div className={`absolute -bottom-6 ${isRtl ? '-right-6' : '-left-6'} w-2/3 h-2/3 border-2 border-sweida-lime/10 rounded-none -z-0`}></div>
          </div>
        </div>
      </section>

      {/* SECTION 3: IMPACT COUNTER (Full Width) */}
      {/* هذا المكون يسحب البيانات من API ويعرضها على كامل العرض وبدون حواف */}
      <ImpactStats />

      {/* SECTION 4: FOCUS AREAS (أيقونات Lucide وحركات جذابة) */}
      <FocusAreas />

      {/* SECTION 5: SUPPORT CTA (Full Width & Fixed Background) */}
      {/* هذا المكون يحتوي على صورة الاتحاد الثابتة عند التمرير وبدون حواف دائرية */}
      <SupportCTA />

    </div>
  );
};

export default Home;