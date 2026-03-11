import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="min-h-screen bg-site-bg pt-20 font-sans selection:bg-sweida-lime selection:text-white" dir={i18n.dir()}>
      
      {/* 1. Hero Section - واجهة سينمائية */}
      <section className="relative h-[60vh] flex items-center justify-center bg-sweida-dark overflow-hidden">
        {/* عناصر ديكورية متحركة في الخلفية */}
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[80%] bg-sweida-green/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[80%] bg-sweida-blue/20 blur-[120px] rounded-full animate-pulse-slow"></div>
        
        <div className="relative z-10 text-center px-6">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-black tracking-[0.3em] uppercase bg-white/10 backdrop-blur-md border border-white/20 text-sweida-lime rounded-full">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed opacity-80">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-24 pb-32 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* 2. Side Contact Info - بطاقات المعلومات الجانبية */}
          <div className="lg:col-span-4 space-y-6">
            {[
              { 
                icon: '📍', 
                label: t('footer.address_text'), 
                val: t('contact.address'), 
                color: 'from-sweida-blue to-blue-600',
                shadow: 'shadow-blue-500/20'
              },
              { 
                icon: '📞', 
                label: 'الهاتف المباشر', 
                val: t('contact.phone'), 
                valDir: 'ltr', 
                color: 'from-sweida-green to-green-600',
                shadow: 'shadow-green-500/20'
              },
              { 
                icon: '✉️', 
                label: 'المراسلات الرسمية', 
                val: t('contact.email_address'), 
                color: 'from-sweida-lime to-lime-600',
                shadow: 'shadow-lime-500/20'
              },
            ].map((card, i) => (
              <div key={i} className={`group relative bg-white p-8 rounded-[3rem] shadow-2xl ${card.shadow} border border-slate-50 transition-all duration-500 hover:-translate-y-3`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-[1.5rem] flex items-center justify-center text-3xl mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                  {card.icon}
                </div>
                <h3 className="font-black text-sweida-dark text-xl mb-3 tracking-tight">{card.label}</h3>
                <p className="text-sweida-gray font-medium leading-loose opacity-80" dir={card.valDir || i18n.dir()}>
                  {card.val}
                </p>
                {/* لمسة زينة خلفية للبطاقة */}
                <div className="absolute top-4 right-4 text-6xl opacity-[0.03] font-black pointer-events-none select-none">0{i+1}</div>
              </div>
            ))}
          </div>

          {/* 3. Main Form - النموذج العصري */}
          <div className="lg:col-span-8 bg-white/80 backdrop-blur-xl p-10 md:p-20 rounded-[4rem] shadow-2xl shadow-slate-200 border border-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-16">
                <h2 className="text-4xl font-black text-sweida-dark tracking-tighter">
                   {t('contact.form_title')}
                </h2>
                <div className="flex-grow h-[2px] bg-gradient-to-r from-sweida-blue via-sweida-green to-transparent rounded-full opacity-30"></div>
              </div>
              
              <form className="grid md:grid-cols-2 gap-10">
                <div className="group space-y-4">
                  <label className="text-xs font-black text-sweida-dark/40 uppercase tracking-[0.2em] px-2 group-focus-within:text-sweida-blue transition-colors">
                    {t('contact.name')}
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50/50 border-b-2 border-transparent border-slate-100 rounded-2xl p-6 focus:bg-white focus:border-sweida-blue focus:shadow-xl focus:shadow-blue-500/5 outline-none transition-all duration-300 font-medium"
                    placeholder="الاسم الكامل"
                  />
                </div>
                
                <div className="group space-y-4">
                  <label className="text-xs font-black text-sweida-dark/40 uppercase tracking-[0.2em] px-2 group-focus-within:text-sweida-green transition-colors">
                    {t('contact.email')}
                  </label>
                  <input 
                    type="email" 
                    className="w-full bg-slate-50/50 border-b-2 border-transparent border-slate-100 rounded-2xl p-6 focus:bg-white focus:border-sweida-green focus:shadow-xl focus:shadow-green-500/5 outline-none transition-all duration-300 font-medium"
                    placeholder="email@example.com"
                  />
                </div>

                <div className="md:col-span-2 group space-y-4">
                  <label className="text-xs font-black text-sweida-dark/40 uppercase tracking-[0.2em] px-2 group-focus-within:text-sweida-lime transition-colors">
                    {t('contact.subject')}
                  </label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50/50 border-b-2 border-transparent border-slate-100 rounded-2xl p-6 focus:bg-white focus:border-sweida-lime focus:shadow-xl focus:shadow-lime-500/5 outline-none transition-all duration-300 font-medium"
                  />
                </div>

                <div className="md:col-span-2 group space-y-4">
                  <label className="text-xs font-black text-sweida-dark/40 uppercase tracking-[0.2em] px-2 group-focus-within:text-sweida-dark transition-colors">
                    {t('contact.message')}
                  </label>
                  <textarea 
                    rows="5" 
                    className="w-full bg-slate-50/50 border-b-2 border-transparent border-slate-100 rounded-[2.5rem] p-8 focus:bg-white focus:border-sweida-dark focus:shadow-xl outline-none transition-all duration-300 font-medium resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  ></textarea>
                </div>

                <div className="md:col-span-2 pt-8">
                  <button className="relative overflow-hidden group w-full md:w-auto bg-sweida-dark text-white px-20 py-6 rounded-2xl font-black text-xl transition-all duration-500 shadow-2xl hover:shadow-sweida-green/40 transform hover:-translate-y-2 active:scale-95">
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {t('contact.send')} <span>→</span>
                    </span>
                    {/* تأثير لمعة عند التمرير */}
                    <div className="absolute inset-0 bg-gradient-to-r from-sweida-green to-sweida-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                </div>
              </form>
            </div>
            {/* زخرفة هندسية في زاوية الفورم */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sweida-lime/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Map Section */}
      <section className="relative h-[600px] w-full mt-[-100px] z-10">
        <div className="absolute inset-0 bg-sweida-dark/10 pointer-events-none z-10 shadow-inner"></div>
        <iframe 
          title="Sweida Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m1.. (استبدل برابط الخريطة الحقيقي)"
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000 contrast-125"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        {/* طبقة تلاشي لربط الخريطة بنهاية الصفحة */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-site-bg to-transparent z-20"></div>
      </section>
    </div>
  );
};

export default Contact;