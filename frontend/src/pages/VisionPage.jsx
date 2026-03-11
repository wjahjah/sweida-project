import React from 'react';
import { useTranslation } from 'react-i18next';

const VisionPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="bg-site-bg min-h-screen font-sans text-sweida-dark">
      
      {/* SECTION 1: HERO - الواجهة الترحيبية المحدثة */}
      <section className="relative h-[85vh] w-full flex items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero2.jpg" 
            className="w-full h-full object-cover object-center animate-hero-zoom opacity-60" 
            alt="Hero Vision"
          />
          {/* تدرج لوني عميق يربط الهوية بالخلفية */}
          <div className="absolute inset-0 bg-gradient-to-b from-sweida-dark/90 via-transparent to-site-bg"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-12 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-sweida-lime hover:bg-sweida-green text-white px-12 py-4 rounded-2xl font-black transition-all duration-500 shadow-2xl transform hover:scale-105 active:scale-95">
              رؤيتنا للمستقبل
            </button>
            <button className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-sweida-dark px-12 py-4 rounded-2xl font-black transition-all duration-500">
              {t('nav.support')}
            </button>
          </div>

          <div className="mt-16 text-sweida-lime font-black tracking-[0.5em] md:tracking-[1em] text-[10px] md:text-xs uppercase opacity-90 animate-pulse">
            Empower • <span className="text-sweida-blue">Uplift</span> • Unite
          </div>
        </div>
      </section>

      {/* SECTION 2: IMPACT COUNTER - عداد الأثر المطور */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-sweida-dark mb-4 tracking-tight">
            {t('impact_title')}
          </h2>
          <div className="w-24 h-2 bg-sweida-gradient mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { label: t('stats.projects'), val: '30+', percent: 70, color: 'stroke-sweida-lime', text: 'text-sweida-lime' },
            { label: t('stats.energy'), val: '4.5 MW+', percent: 50, color: 'stroke-sweida-blue', text: 'text-sweida-blue' },
            { label: t('stats.beneficiaries'), val: '300+', percent: 90, color: 'stroke-sweida-green', text: 'text-sweida-green' },
          ].map((stat, i) => (
            <div 
              key={i} 
              className="bg-white rounded-[3rem] p-12 shadow-xl shadow-slate-200/50 flex flex-col items-center group hover:-translate-y-2 transition-all duration-500 border border-slate-50"
            >
              <div className="relative w-44 h-44 flex items-center justify-center mb-8">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" className="stroke-slate-100 fill-none" strokeWidth="6" />
                  <circle
                    cx="50%" cy="50%" r="45%"
                    className={`${stat.color} fill-none transition-all duration-1000`}
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * stat.percent) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-black ${stat.text}`} dir="ltr">{stat.val}</span>
                  <span className="text-[11px] text-sweida-gray font-bold uppercase tracking-widest mt-2 px-2 text-center leading-tight">
                    {stat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: CORE PROJECTS - بطاقات الهوية الملونة */}
      <section className="py-24 bg-white rounded-[5rem] mx-4 md:mx-10 shadow-inner">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: t('projects.water.title'), icon: '💧', color: 'text-sweida-blue', bg: 'bg-blue-50', desc: t('projects.water.desc') },
              { title: t('projects.nature.title'), icon: '🌿', color: 'text-sweida-green', bg: 'bg-green-50', desc: t('projects.nature.desc') },
              { title: t('projects.creation.title'), icon: '⚙️', color: 'text-sweida-lime', bg: 'bg-lime-50', desc: t('projects.creation.desc') },
            ].map((item, i) => (
              <div key={i} className="bg-site-bg rounded-[4rem] p-10 text-center flex flex-col items-center group hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-slate-100">
                <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center text-5xl mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className={`text-2xl font-black mb-4 tracking-tight ${item.color}`}>
                  {item.title}
                </h3>
                <p className="text-sweida-gray text-md mb-8 leading-relaxed font-medium line-clamp-3">
                  {item.desc}
                </p>
                <button className={`mt-auto flex items-center gap-2 font-black text-sm uppercase tracking-widest ${item.color} group-hover:gap-4 transition-all`}>
                  {t('projects.read_more')} <span>→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: VISION QUOTE - اقتباس الرؤية */}
      <section className="py-24 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <span className="text-6xl text-sweida-lime opacity-30 font-serif">"</span>
          <h2 className="text-3xl md:text-5xl font-black text-sweida-dark leading-tight">
            نحن لا نبني مشاريع مؤقتة، بل نصمم <span className="text-sweida-blue">إرثاً مستداماً</span> يعيد تعريف العطاء في السويداء.
          </h2>
          <div className="w-16 h-1 bg-sweida-green mx-auto"></div>
          <p className="text-sweida-gray font-bold tracking-widest uppercase text-sm">مجلس إدارة صندوق السويداء للتنمية</p>
        </div>
      </section>

    </div>
  );
};

export default VisionPage;