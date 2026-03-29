import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const VisionPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="bg-site-bg min-h-screen font-sans text-sweida-dark antialiased" 
         style={{ textRendering: 'optimizeLegibility', WebkitFontSmoothing: 'antialiased' }}>
      
      {/* SECTION 1: HERO */}
      <section className="relative h-[85vh] w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero2.jpg" 
            className="w-full h-full object-cover object-center animate-hero-zoom scale-105" 
            alt="Hero Vision"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-site-bg"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            /* تم تصغير الخط هنا فقط من text-7xl إلى text-5xl */
            className="text-3xl md:text-5xl lg:text-5xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl"
          >
            {t('hero.title')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-12 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg"
          >
            {t('hero.subtitle')}
          </motion.p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-sweida-lime hover:bg-sweida-green text-white px-10 py-4 rounded-none font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 shadow-xl transform hover:scale-105">
              {t('vision.cta_future', 'OUR FUTURE VISION')}
            </button>
            <button className="bg-white/5 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-sweida-dark px-10 py-4 rounded-none font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500">
              {t('nav.support')}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: IMPACT COUNTER - بقيت كما هي */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-sweida-dark mb-4 tracking-tighter uppercase">
            {t('impact_title')}
          </h2>
          <div className="w-12 h-1 bg-sweida-lime mx-auto opacity-40"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { label: t('stats.projects_label'), val: '30+', percent: 70, color: 'stroke-sweida-lime', text: 'text-sweida-lime' },
            { label: t('stats.energy_label'), val: '4.5 MW+', percent: 55, color: 'stroke-sweida-blue', text: 'text-sweida-blue' },
            { label: t('stats.beneficiaries_label'), val: '25k+', percent: 90, color: 'stroke-sweida-green', text: 'text-sweida-green' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-none p-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex flex-col items-center group hover:shadow-2xl transition-all duration-700 border border-slate-50">
              <div className="relative w-36 h-36 flex items-center justify-center mb-8">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" className="stroke-slate-50 fill-none" strokeWidth="3" />
                  <motion.circle
                    initial={{ strokeDashoffset: 283 }}
                    whileInView={{ strokeDashoffset: 283 - (283 * stat.percent) / 100 }}
                    viewport={{ once: true }}
                    cx="50%" cy="50%" r="45%"
                    className={`${stat.color} fill-none`}
                    strokeWidth="5"
                    strokeDasharray="283"
                    strokeLinecap="round"
                    transition={{ duration: 2, ease: "circOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-black tracking-tighter ${stat.text}`} dir="ltr">{stat.val}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 text-center">
                    {stat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CORE PROJECTS - بقيت كما هي */}
      <section className="py-24 bg-white rounded-none border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: t('projects.water.title'), icon: '💧', color: 'text-sweida-blue', bg: 'bg-blue-50/30', desc: t('projects.water.desc') },
              { title: t('projects.nature.title'), icon: '🌿', color: 'text-sweida-green', bg: 'bg-green-50/30', desc: t('projects.nature.desc') },
              { title: t('projects.creation.title'), icon: '⚙️', color: 'text-sweida-lime', bg: 'bg-lime-50/30', desc: t('projects.creation.desc') },
            ].map((item, i) => (
              <div key={i} className="bg-site-bg p-12 text-center flex flex-col items-center group hover:bg-white hover:shadow-2xl transition-all duration-700 border border-transparent hover:border-slate-50">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-8 grayscale group-hover:grayscale-0 transition-all duration-500 ${item.bg}`}>
                  {item.icon}
                </div>
                <h3 className={`text-xl font-black mb-4 tracking-tighter uppercase ${item.color}`}>
                  {item.title}
                </h3>
                <p className="text-sweida-gray/80 text-sm mb-8 leading-relaxed font-medium">
                  {item.desc}
                </p>
                <button className={`mt-auto flex items-center gap-2 font-bold text-[10px] uppercase tracking-[0.2em] ${item.color} opacity-60 group-hover:opacity-100 group-hover:gap-4 transition-all duration-300`}>
                  {t('projects.read_more')} <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: VISION QUOTE - بقيت كما هي */}
      <section className="py-32 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="w-12 h-0.5 bg-sweida-lime mx-auto opacity-30"></div>
          <h2 className="text-2xl md:text-4xl font-black text-sweida-dark leading-snug tracking-tighter italic">
            {t('vision.quote_main')}
          </h2>
          <p className="text-slate-400 font-bold tracking-[0.4em] uppercase text-[9px] opacity-70">
            {t('vision.board_msg')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default VisionPage;