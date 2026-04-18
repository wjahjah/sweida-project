import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    // لتغيير اتجاه الصفحة بناءً على اللغة (اختياري)
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <footer className="bg-[#33383c] text-white pt-12 pb-6 mt-20 font-sans">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-500/30 pb-10">
          
          {/* العمود الأول: الهوية */}
          <div className="flex items-start gap-4">
            <div className="p-1 bg-white rounded-full shrink-0 shadow-md">
              <img src="/images/sweida-logo.png" alt="SWEIDA" className="w-20 h-20 object-contain" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tighter uppercase leading-tight">
                {t('header_title')}
              </h2>
              <p className="text-[11px] text-gray-300 leading-relaxed font-medium tracking-wide">
                {t('header_subtitle')}
              </p>
              <div className="text-[14px] font-black text-white pt-2 tracking-widest uppercase italic">
                {t('project_name')}
              </div>
            </div>
          </div>

          {/* العمود الثاني: الروابط السريعة */}
          <div className="flex flex-col gap-3 px-0 md:px-10 border-x border-gray-500/20">
            {[
              { key: 'footer.about', path: '/about' },
               { key: 'footer.project', path: '/projects' },
              { key: 'footer.contact', path: '/contact' },
              { key: 'footer.news', path: '#' },
              { key: 'footer.privacy', path: '#' }
            ].map((link, idx) => (
              <Link 
                key={idx} 
                to={link.path}
                className="flex items-center gap-3 group"
              >
                <div className="w-5 h-5 rounded-full bg-[#58c322] flex items-center justify-center text-[10px] text-[#33383c] font-bold group-hover:scale-110 transition-transform">
                  ✓
                </div>
                <span className="text-sm text-gray-200 hover:text-[#58c322] transition-colors font-medium">
                  {t(link.key)}
                </span>
              </Link>
            ))}
          </div>

          {/* العمود الثالث: رسالة الالتزام */}
          <div className="space-y-4">
            <p className="text-sm text-gray-300 leading-relaxed italic border-l-2 border-[#58c322] pl-4">
              {t('footer_msg')}
            </p>
            <div className="pt-2 space-y-2 text-[13px]">
              <div className="flex items-center gap-3">
                <span className="text-[#58c322]">📍</span>
                <span className="text-gray-400">{t('footer.address_text') || 'السويداء، سوريا'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* القسم السفلي */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 gap-6">
          <div className="flex items-center gap-6">
            <div className="flex gap-2">
              {['f', 't', 'i', 'l'].map((social) => (
                <div key={social} className="w-8 h-8 rounded-full border border-[#58c322] flex items-center justify-center text-[#58c322] hover:bg-[#58c322] hover:text-white transition-all cursor-pointer shadow-sm uppercase text-[12px] font-black">
                  {social}
                </div>
              ))}
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] hidden sm:block">
              {t('project_name')} © 2026
            </span>
          </div>

          {/* أزرار اللغات */}
          <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
            {['ar', 'en', 'fr', 'de'].map((lang, i) => (
              <React.Fragment key={lang}>
                <button 
                  onClick={() => changeLanguage(lang)} 
                  className={`hover:text-white transition-colors uppercase ${i18n.language === lang ? 'text-white border-b-2 border-[#58c322]' : ''}`}
                >
                  {lang}
                </button>
                {i < 3 && <div className="w-[1px] h-3 bg-gray-500"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;