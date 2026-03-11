import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className={`min-h-screen bg-site-bg ${isRtl ? 'font-sans' : 'font-sans'}`} dir={i18n.dir()}>
      
      {/* 1. Hero Section - الواجهة الترحيبية */}
      <section className="relative h-[70vh] flex items-center justify-center bg-sweida-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/sweida-hills.jpg" 
            className="w-full h-full object-cover opacity-50 scale-110 animate-pulse-slow" 
            alt="Sweida Nature"
          />
          {/* طبقة تدرج لوني من ألوان اللوغو لدمج الصورة */}
          <div className="absolute inset-0 bg-gradient-to-b from-sweida-dark/80 via-transparent to-site-bg"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
            {t('about.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-medium leading-relaxed drop-shadow-md">
            {t('about.hero_subtitle')}
          </p>
          <div className="w-24 h-2 bg-sweida-lime mx-auto mt-10 rounded-full shadow-lg shadow-sweida-lime/50"></div>
        </div>
      </section>

      {/* 2. Geographic Significance - الموقع والقيمة التاريخية */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className={`space-y-8 ${isRtl ? 'order-1 text-right' : 'order-2 text-left'}`}>
            <div className="inline-block px-4 py-1 bg-sweida-lime/10 text-sweida-green rounded-full text-sm font-bold tracking-widest uppercase">
               الموقع الاستراتيجي
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-sweida-dark leading-tight">
              أصالة <span className="text-sweida-green">المكان</span> <br/> 
              وعمق <span className="text-sweida-blue">التاريخ</span>
            </h2>
            <p className="text-sweida-gray text-xl leading-loose font-medium italic border-r-4 border-sweida-blue pr-6">
              السويداء ليست مجرد مدينة، بل هي هضبة بركانية صلبة تعرف بـ "جبل العرب". هذا الارتفاع منحها ميزة دفاعية ومناخاً معتدلاً جعلها سلة غذاء خصبة ومركزاً تجارياً يربط القوافل عبر العصور.
            </p>
          </div>
          <div className={`relative ${isRtl ? 'order-2' : 'order-1'}`}>
            <div className="absolute -inset-4 bg-gradient-to-tr from-sweida-lime to-sweida-blue rounded-[3rem] blur-2xl opacity-20"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transform -rotate-2 hover:rotate-0 transition-all duration-700">
              <img src="/images/about.jpg" alt="Sweida Geography" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Vision Pillars - ركائز الرؤية (تنسيق البطاقات الاحترافي) */}
      <section className="py-32 bg-white rounded-[5rem] shadow-inner">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-sweida-dark mb-6 tracking-tight">
              ركائز <span className="text-sweida-green">استدامتنا</span>
            </h2>
            <p className="text-sweida-gray text-lg max-w-2xl mx-auto font-medium">نعمل على مكاملة الأبعاد الثلاثة للتنمية لضمان مستقبل أفضل لأجيالنا القادمة.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: '💰', title: t('about.dim_eco'), color: 'sweida-lime', desc: 'ابتكار في إدارة المياه، تطوير الزراعة الجبلية، ودعم المشاريع الصغيرة لخلق فرص عمل مستدامة.' },
              { icon: '🌱', title: t('about.dim_env'), color: 'sweida-green', desc: 'حماية التنوع البيولوجي في الوديان، والاعتماد الكلي على الطاقة المتجددة لمواجهة التغير المناخي.' },
              { icon: '🤝', title: t('about.dim_soc'), color: 'sweida-blue', desc: 'ضمان العدالة في الوصول للخدمات الصحية والتعليمية، وتقليل الفجوات بين فئات المجتمع.' }
            ].map((pillar, i) => (
              <div key={i} className="group p-12 rounded-[4rem] bg-site-bg border border-transparent hover:border-sweida-lime/20 hover:bg-white hover:shadow-2xl hover:shadow-sweida-lime/10 transition-all duration-500 text-center">
                <div className="text-6xl mb-8 transform group-hover:scale-110 transition-transform duration-500">{pillar.icon}</div>
                <h3 className={`text-2xl font-black mb-6 text-sweida-dark group-hover:text-${pillar.color}`}>{pillar.title}</h3>
                <p className="text-sweida-gray text-md leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Future Energy - منظومة الطاقة (تنسيق داكن فخم) */}
      <section className="py-32 bg-sweida-dark text-white relative overflow-hidden">
        {/* رسمة هندسية خفيفة في الخلفية */}
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%"><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-10 text-sweida-lime italic tracking-tight">
            {t('about.energy_future')}
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-loose mb-16 font-light">
            نحن لا نركب ألواحاً شمسية فقط، بل نبني <span className="text-white font-bold border-b-2 border-sweida-blue">منظومة طاقة متكاملة</span> تجمع بين الشمس والرياح لتشغيل المشافي، المدارس، والمضخات المائية على مدار العام بذكاء وكفاءة.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {['طاقة شمسية', 'طاقة رياح', 'شبكات ذكية', 'استدامة شاملة'].map((item, i) => (
              <div key={i} className="group p-8 border border-white/10 rounded-3xl hover:bg-white hover:text-sweida-dark transition-all duration-500 cursor-default">
                <div className="text-sweida-blue group-hover:text-sweida-green font-black tracking-tighter text-lg uppercase mb-2 transition-colors">Sweida</div>
                <div className="font-bold text-sm tracking-widest">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Transparency & Trust - سكشن الشفافية الملون */}
      <section className="py-32 container mx-auto px-6">
        <div className="bg-gradient-to-br from-sweida-green to-sweida-blue rounded-[5rem] p-12 md:p-24 text-white relative overflow-hidden shadow-3xl">
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">{t('about.donor_msg')}</h2>
              <p className="text-white/90 leading-loose text-xl font-medium">
                {t('about.donor_desc')}
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
               {/* أيقونة تعبيرية للثقة */}
               <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center text-5xl backdrop-blur-md border border-white/20 animate-bounce-slow">
                 🛡️
               </div>
              <button className="bg-sweida-dark text-white px-14 py-6 rounded-2xl font-black text-xl hover:bg-white hover:text-sweida-dark transition-all transform hover:scale-110 shadow-2xl">
                تحميل تقرير الشفافية 2026
              </button>
              <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Verified by Blockchain Technology</span>
            </div>
          </div>
          {/* لمسات فنية في الخلفية */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-sweida-lime rounded-full blur-[120px] opacity-30"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-white rounded-full blur-[120px] opacity-10"></div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;