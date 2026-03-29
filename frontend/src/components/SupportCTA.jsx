import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SupportCTA = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <section className="relative w-full overflow-hidden">
      {/* الحاوية الرئيسية مع خلفية مثبتة */}
      <div 
        className="relative min-h-[600px] flex items-center justify-center bg-fixed bg-center bg-cover"
        style={{ 
          backgroundImage: 'url("/images/unity.jpg")',
          backgroundAttachment: 'fixed' // لضمان التثبيت على كافة المتصفحات
        }}
      >
        
        {/* طبقة تظليل (Overlay) فوق الصورة المثبتة مباشرة */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* محتوى السكشن */}
        <div className="container mx-auto px-6 relative z-10 py-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 text-white">
            
            <div className={`max-w-2xl ${isRtl ? 'text-right' : 'text-left'}`}>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-black mb-10 leading-tight drop-shadow-2xl"
              >
                {t('cta.title_part1')} <br/> 
                <span className="text-sweida-lime/80">{t('cta.title_highlight')}</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl md:text-3xl text-white/90 font-medium leading-relaxed drop-shadow-xl max-w-xl"
              >
                {t('cta.description')}
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="z-10 shrink-0"
            >
              <Link 
                to="/support" 
                className="inline-block bg-sweida-green text-white px-16 py-7 rounded-2xl font-black text-2xl hover:bg-white hover:text-sweida-green transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-2 border-transparent hover:border-sweida-green"
              >
                {t('nav.support')}
              </Link>
            </motion.div>
          </div>
        </div>

        {/* لمسة جمالية: إضاءة جانبية خفيفة */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default SupportCTA;