import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="min-h-screen bg-site-bg font-sans" dir={i18n.dir()}>
      
      {/* 1. Hero Section - تم تقليل الارتفاع وتصغير الخط */}
      <section className="relative h-[50vh] flex items-center justify-center bg-sweida-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/sweida-hills.jpg" 
            className="w-full h-full object-cover opacity-40 scale-105" 
            alt="Sweida Nature"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sweida-dark/70 via-sweida-dark/30 to-site-bg"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-xl">
            {t('about.hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-medium leading-relaxed opacity-90">
            {t('about.hero_subtitle')}
          </p>
          <div className="w-16 h-1.5 bg-sweida-lime mx-auto mt-8 rounded-full"></div>
        </div>
      </section>

      {/* 2. Geographic Significance - الموقع */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`space-y-6 ${isRtl ? 'order-1 text-right' : 'order-2 text-left'}`}>
            <div className="inline-block px-3 py-1 bg-sweida-lime/10 text-sweida-green rounded-full text-xs font-bold tracking-widest uppercase">
               {t('about.location_title')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-sweida-dark leading-tight">
              {t('about.location_title_main', 'أصالة المكان وعمق التاريخ')}
            </h2>
            <p className="text-sweida-gray text-lg leading-relaxed font-medium border-sweida-blue ltr:border-l-4 ltr:pl-6 rtl:border-r-4 rtl:pr-6">
              {t('about.location_desc')}
            </p>
          </div>
          <div className={`relative ${isRtl ? 'order-2' : 'order-1'}`}>
            <div className="relative rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
              <img src="/images/about.jpg" alt="Sweida Geography" className="w-full h-[400px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Vision Pillars - ركائز الرؤية */}
      <section className="py-24 bg-white rounded-t-[3rem] shadow-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-sweida-dark mb-4">
              {t('about.pillars_title')}
            </h2>
            <p className="text-sweida-gray text-md max-w-xl mx-auto font-medium opacity-80">
              {t('about.pillars_subtitle', 'نعمل على مكاملة الأبعاد التنموية لضمان مستقبل مستدام.')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: t('about.dim_eco'), color: 'sweida-lime', key: 'eco_desc' },
              { icon: '🌱', title: t('about.dim_env'), color: 'sweida-green', key: 'env_desc' },
              { icon: '🤝', title: t('about.dim_soc'), color: 'sweida-blue', key: 'soc_desc' }
            ].map((pillar, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-site-bg hover:bg-white hover:shadow-xl transition-all duration-300 text-center border border-gray-50">
                <div className="text-5xl mb-6">{pillar.icon}</div>
                <h3 className={`text-xl font-black mb-4 text-sweida-dark`}>{pillar.title}</h3>
                <p className="text-sweida-gray text-sm leading-relaxed font-medium">
                  {t(`about.${pillar.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Future Energy - منظومة الطاقة */}
      <section className="py-24 bg-sweida-dark text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-sweida-lime tracking-tight">
            {t('about.energy_future')}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            {t('about.vision_desc')}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {['solar', 'wind', 'smart', 'sustainable'].map((item, i) => (
              <div key={i} className="p-6 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="font-bold text-xs tracking-widest uppercase">{t(`about.energy_items.${item}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Transparency & Trust - سكشن الشفافية */}
      <section className="py-24 container mx-auto px-6">
        <div className="bg-gradient-to-br from-sweida-green/90 to-sweida-blue/90 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">{t('about.donor_msg')}</h2>
              <p className="text-white/90 leading-relaxed text-lg font-medium">
                {t('about.donor_desc')}
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-sweida-dark text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-white hover:text-sweida-dark transition-all shadow-xl">
                {t('about.download_report', 'تحميل تقرير الشفافية')}
              </button>
              <span className="text-white/60 text-xs font-bold tracking-widest uppercase italic">
                {t('about.blockchain_verify', 'Verified by Technology')}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;