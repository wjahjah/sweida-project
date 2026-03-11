import React from 'react';
import { useTranslation } from 'react-i18next';

const SuggestProject = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 font-sans" dir={i18n.dir()}>
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* العناوين العلوية مع الشريط المتدرج */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            {t('suggest.title')}
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-orange-400 via-[#58c322] to-blue-500 mx-auto mb-8 rounded-full shadow-sm"></div>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {t('suggest.desc')}
          </p>
        </div>

        {/* الحاوية الرئيسية للنموذج - تصميم كرتوني نظيف */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
          <form className="p-8 md:p-14 space-y-16">
            
            {/* القسم الأول: بيانات مقدم المشروع */}
            <section className="animate-in fade-in duration-700">
              <div className="flex items-center gap-3 mb-10 text-slate-800 border-b border-gray-50 pb-5">
                <span className="text-3xl filter drop-shadow-sm">👤</span>
                <h2 className="text-2xl font-bold">{t('suggest.personal_section')}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 flex gap-1 italic">
                    {t('suggest.name')} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] focus:border-transparent outline-none transition-all shadow-sm hover:border-gray-300" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 flex gap-1 italic">
                    {t('suggest.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] focus:border-transparent outline-none transition-all shadow-sm text-left" dir="ltr" placeholder="+963" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.email')}</label>
                  <input type="email" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] focus:border-transparent outline-none transition-all shadow-sm" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.location')}</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] focus:border-transparent outline-none transition-all shadow-sm" />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.relation')}</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] focus:border-transparent outline-none transition-all shadow-sm" placeholder="مثال: صاحب فكرة / منسق / بلدية..." />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.bio')}</label>
                  <textarea rows="4" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] focus:border-transparent outline-none transition-all shadow-sm resize-none"></textarea>
                </div>
              </div>
            </section>

            {/* القسم الثاني: تفاصيل المشروع */}
            <section className="animate-in fade-in duration-1000">
              <div className="flex items-center gap-3 mb-10 text-slate-800 border-b border-gray-50 pb-5">
                <span className="text-3xl filter drop-shadow-sm">📌</span>
                <h2 className="text-2xl font-bold">{t('suggest.project_section')}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 flex gap-1 italic">
                    {t('suggest.project_title')} <span className="text-red-500">*</span>
                  </label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] focus:border-transparent outline-none transition-all shadow-sm" />
                </div>

                {/* حقول التصنيف مع إصلاح مشكلة الخطوط */}
                <div className="space-y-3 relative">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.category')}</label>
                  <div className="relative">
                    <select 
                      className="w-full bg-white border border-gray-200 rounded-2xl p-4 outline-none transition-all shadow-sm appearance-none cursor-pointer focus:ring-2 focus:ring-[#58c322] focus:border-transparent pr-4"
                      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                    >
                      <option value="">— {t('common.select') || 'اختر'} —</option>
                      <option value="energy">طاقة متجددة</option>
                      <option value="water">تنمية مائية</option>
                      <option value="edu">خدمات تعليمية</option>
                      <option value="health">قطاع صحي</option>
                    </select>
                    {/* أيقونة السهم المخصصة */}
                    <div className={`absolute inset-y-0 ${isRtl ? 'left-4' : 'right-4'} flex items-center pointer-events-none text-gray-400`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#58c322] font-bold px-2">يمكنك اختيار الأقرب فقط.</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.project_location')}</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] outline-none shadow-sm" />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 flex gap-1 italic">
                    {t('suggest.goal')} <span className="text-red-500">*</span>
                  </label>
                  <textarea rows="4" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] outline-none shadow-sm resize-none"></textarea>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.beneficiaries')}</label>
                  <textarea rows="3" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] outline-none shadow-sm resize-none"></textarea>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.cost')}</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] outline-none shadow-sm" placeholder="10,000 USD" />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.duration')}</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] outline-none shadow-sm" />
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-bold text-slate-700 px-1 italic">{t('suggest.notes')}</label>
                  <textarea rows="3" className="w-full bg-white border border-gray-200 rounded-2xl p-4 focus:ring-2 focus:ring-[#58c322] outline-none shadow-sm resize-none"></textarea>
                </div>
              </div>
            </section>

            {/* الأزرار الختامية */}
            <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="text-[13px] text-gray-400 italic text-center md:text-right max-w-sm">
                * الحقول المحددة بالنجمة إلزامية. سيتم معالجة بياناتك بسرية تامة لغرض التقييم فقط.
              </p>
              <div className="flex gap-5 w-full md:w-auto">
                <button type="button" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-10 py-4 rounded-2xl border-2 border-gray-200 text-slate-600 font-bold hover:bg-gray-50 transition-all active:scale-95">
                  <span className="text-xl">💾</span> {t('suggest.save')}
                </button>
                <button type="submit" className="flex-1 md:flex-none flex items-center justify-center gap-2 px-12 py-4 rounded-2xl bg-[#58c322] text-white font-black text-lg hover:bg-[#4aa31d] shadow-lg shadow-green-100 transition-all transform active:scale-95">
                   {t('suggest.send')} <span className="text-xl">📩</span>
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SuggestProject;