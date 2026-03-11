import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Home = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="bg-site-bg min-h-screen font-sans text-sweida-dark overflow-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero2.jpg" 
            className="w-full h-full object-cover object-center animate-hero-zoom opacity-60" 
            alt="Sweida Landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-site-bg"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6">
          {/* نص العنوان الرئيسي مع ظل خفيف لزيادة الوضوح */}
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/projects" className="bg-sweida-lime hover:bg-sweida-green text-white px-10 py-4 rounded-full font-black transition-all duration-500 shadow-2xl transform hover:scale-105 active:scale-95">
              {t('hero.button_projects') || 'اكتشف مشاريعنا'}
            </Link>
            <Link to="/monthly-support" className="bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-sweida-dark px-10 py-4 rounded-full font-black transition-all duration-500">
              {t('nav.support')}
            </Link>
          </div>

          {/* نص شعار القيم بألوان الهوية */}
          <div className="mt-12 text-sweida-lime font-black tracking-[0.5em] md:tracking-[0.8em] text-[10px] md:text-xs uppercase opacity-90 animate-pulse">
            Innovation • <span className="text-sweida-blue">Sustainability</span> • Community
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT SUMMARY */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`${isRtl ? 'order-1 text-right' : 'order-2 text-left'}`}>
            {/* عنوان فرعي بلون الأخضر المتوسط */}
            <h2 className="text-sweida-green font-bold mb-4 uppercase tracking-[0.2em] text-sm">{t('nav.about')}</h2>
            <h3 className="text-3xl md:text-5xl font-black text-sweida-dark mb-6 leading-tight">
              السويداء: <span className="text-sweida-green">أصالة</span> المكان <br/> و<span className="text-sweida-blue">طموح</span> المستقبل
            </h3>
            <p className="text-sweida-gray text-lg leading-loose mb-8 text-justify font-medium">
              السويداء ليست مجرد مدينة، بل هي هضبة بركانية صلبة تعرف بـ "جبل العرب". هذا الارتفاع منحها ميزة دفاعية ومناخاً معتدلاً جعلها سلة غذاء خصبة ومركزاً تجارياً يربط القوافل عبر العصور.
            </p>
            <Link to="/about" className="group inline-flex items-center gap-3 text-sweida-blue font-black text-lg transition-all hover:text-sweida-green">
              <span className="border-b-2 border-sweida-blue group-hover:border-sweida-green pb-1">{t('projects.read_more')}</span>
              <span className="transform group-hover:translate-x-[-5px] transition-transform">←</span>
            </Link>
          </div>
          <div className={`relative ${isRtl ? 'order-2' : 'order-1'}`}>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-sweida-lime rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <img src="/images/sweida-about.jpg" alt="Sweida Nature" className="relative rounded-[3rem] shadow-2xl z-10 border-8 border-site-card" />
          </div>
        </div>
      </section>

      {/* SECTION 3: IMPACT COUNTER */}
      <section className="py-20 bg-footer-dark text-white rounded-[4rem] mx-4 md:mx-10 shadow-2xl">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16 text-center tracking-tight">
            أثرنا <span className="text-sweida-lime">بالأرقام</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: t('stats.projects'), val: '30+', percent: 70, color: 'stroke-sweida-lime', text: 'text-sweida-lime' },
              { label: t('stats.energy'), val: '4.5 MW', percent: 50, color: 'stroke-sweida-blue', text: 'text-sweida-blue' },
              { label: t('stats.beneficiaries'), val: '150k+', percent: 90, color: 'stroke-sweida-green', text: 'text-sweida-green' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" className="stroke-white/5 fill-none" strokeWidth="6" />
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
                    <span className="text-[11px] text-gray-400 font-bold uppercase mt-2 tracking-widest">{stat.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CORE SERVICES */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-sweida-dark mb-4 tracking-tight">مجالات عمل الصندوق</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-sweida-lime via-sweida-green to-sweida-blue mx-auto rounded-full shadow-sm"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: t('projects.water.title'), icon: '💧', color: 'text-sweida-blue', bg: 'bg-blue-50', desc: t('projects.water.desc') },
            { title: t('projects.nature.title'), icon: '☀️', color: 'text-sweida-green', bg: 'bg-green-50', desc: "توليد الطاقة النظيفة لتشغيل المرافق العامة والمنازل والمشاريع الحيوية." },
            { title: t('projects.creation.title'), icon: '🏥', color: 'text-sweida-lime', bg: 'bg-lime-50', desc: "دعم القطاع الصحي والتعليمي بأحدث التجهيزات والوسائل التكنولوجية." },
          ].map((item, i) => (
            <div key={i} className="bg-site-card rounded-[3.5rem] p-12 shadow-xl shadow-slate-200/60 border border-slate-50 group hover:-translate-y-3 transition-all duration-500">
              <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-4xl mb-10 transform group-hover:rotate-6 transition-transform shadow-inner ${item.bg} ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 text-sweida-dark group-hover:text-sweida-green transition-colors">{item.title}</h3>
              <p className="text-sweida-gray leading-relaxed mb-10 font-medium">{item.desc}</p>
              <button className={`flex items-center gap-2 font-black text-sm uppercase tracking-wider ${item.color} group-hover:gap-4 transition-all`}>
                {t('projects.read_more')} <span className="text-xl">→</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-sweida-green to-sweida-lime rounded-[4rem] p-12 md:p-24 text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
            {/* لمسة ديكورية في الخلفية */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            
            <div className="max-w-2xl text-center md:text-right z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">كن جزءاً من <br/> <span className="text-sweida-dark/30">قصة النجاح</span></h2>
              <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">مساهمتك اليوم تعني مستقبلاً مستداماً للأجيال القادمة في أرض السويداء.</p>
            </div>
            <Link to="/support" className="z-10 bg-sweida-dark text-white px-14 py-6 rounded-2xl font-black text-xl hover:bg-white hover:text-sweida-dark transition-all transform hover:scale-110 shadow-2xl">
              ادعمنا الآن
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;