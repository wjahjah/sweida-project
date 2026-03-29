import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-sweida-lime/20" dir={i18n.dir()}>
      
      {/* 1. Header Section - تم تصغير الارتفاع (h-[40vh]) ليظهر المحتوى فوراً */}
      <header className="relative h-[40vh] flex items-center justify-center bg-slate-100 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, tracking: "0.1em" }}
            animate={{ opacity: 1, tracking: "0.4em" }}
            className="inline-block text-[10px] font-black uppercase text-sweida-lime mb-4 tracking-[0.4em]"
          >
            {t('contact.tag', 'Connect')}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-sweida-dark mb-6 tracking-tighter"
            style={{ textRendering: 'optimizeLegibility' }}
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-slate-500 max-w-lg mx-auto font-medium leading-relaxed opacity-80"
          >
            {t('contact.subtitle')}
          </motion.p>
        </div>
      </header>

      {/* 2. Content Section - تم رفع المحتوى (-mt-16) ليظهر جزء منه فوق الهيدر */}
      <main className="container mx-auto px-6 relative z-20 -mt-16 pb-24">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* الجانب الأيسر: بيانات التواصل */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 space-y-4"
          >
            {[
              { label: t('contact.address_label', 'Address'), val: t('contact.address'), icon: '📍' },
              { label: t('contact.phone_label', 'Phone'), val: t('contact.phone'), icon: '📞' },
              { label: t('contact.email_label', 'Email'), val: t('contact.email_address'), icon: '✉️' },
            ].map((item, i) => (
              <motion.div 
                variants={itemVariants} 
                key={i} 
                className="bg-white p-8 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] group hover:border-sweida-lime/30 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-lg grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">
                    {item.icon}
                  </span>
                  <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
                    {item.label}
                  </h4>
                </div>
                <p className="text-base font-black text-sweida-dark group-hover:text-sweida-green transition-colors duration-500 leading-snug">
                  {item.val}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* الجانب الأيمن: نموذج المراسلة */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-white p-8 md:p-16 border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.03)]"
          >
            <form className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {t('contact.name')}
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-transparent border-b border-slate-200 py-3 focus:border-sweida-lime outline-none transition-all font-medium text-sm placeholder-slate-300" 
                    placeholder="Full Name" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {t('contact.email')}
                  </label>
                  <input 
                    type="email" 
                    className="w-full bg-transparent border-b border-slate-200 py-3 focus:border-sweida-lime outline-none transition-all font-medium text-sm placeholder-slate-300" 
                    placeholder="email@example.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {t('contact.subject')}
                </label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-slate-200 py-3 focus:border-sweida-lime outline-none transition-all font-medium text-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {t('contact.message')}
                </label>
                <textarea 
                  rows="4" 
                  className="w-full bg-transparent border-b border-slate-200 py-3 focus:border-sweida-lime outline-none transition-all font-medium text-sm resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button className="bg-sweida-dark text-white px-12 py-4 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-sweida-green transition-all duration-500 shadow-lg">
                  {t('contact.send')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>

      {/* 3. Full-Width Map Section */}
      <section className="relative w-full h-[550px] bg-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-sweida-dark/5 pointer-events-none z-10"></div>
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107874.15682613134!2d36.491684365775375!3d32.71003463777553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151978696996d933%3A0xc3f8b00693466f2a!2sAs-Suwayda%2C%20Syria!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s" 
          className="w-full h-full border-0 grayscale-[0.5] contrast-[1.1] brightness-[1.02] hover:grayscale-0 transition-all duration-1000"
          allowFullScreen="" 
          loading="lazy"
        ></iframe>

        <div className={`absolute bottom-12 ${isRtl ? 'right-12' : 'left-12'} z-20`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-sm p-8 shadow-2xl border border-white/20 max-w-[300px]"
          >
            <h5 className="font-black text-[9px] uppercase tracking-widest mb-3 text-sweida-lime">
              {t('contact.office_location', 'Main Office')}
            </h5>
            <p className="text-sm font-black text-sweida-dark leading-relaxed">
              {t('contact.address')}
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Contact;