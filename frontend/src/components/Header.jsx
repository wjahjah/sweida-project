import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isRtl = i18n.dir() === 'rtl';

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = i18n.dir(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.projects', path: '/projects' },
    { key: 'nav.vision', path: '/vision' },
    { key: 'suggest.title', path: '/suggest' },
    { key: 'footer.contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'shadow-xl bg-white/95 backdrop-blur-sm' : 'bg-white'}`} dir={i18n.dir()}>
      
      {/* 1. التوب بار (أزرار اللغات الأربع) */}
      <div className="bg-slate-50 border-b border-gray-100 py-2">
        <div className="container mx-auto px-4 md:px-8 flex justify-end items-center gap-3">
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
            {['ar', 'en', 'de', 'fr'].map((lang, idx) => (
              <button 
                key={lang}
                onClick={() => changeLanguage(lang)} 
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase transition-all ${
                  i18n.language === lang 
                  ? 'bg-sweida-dark text-white' 
                  : 'text-gray-400 hover:text-sweida-green'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. الناف بار الرئيسي */}
      <nav className="py-2">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          
          {/* زر الموبايل واللوغو الصغير للموبايل */}
          <div className="flex lg:hidden items-center gap-3">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-sweida-dark focus:outline-none p-2 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>

          {/* القائمة لسطح المكتب (Desktop) - يسار في الـ RTL */}
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-black uppercase tracking-tight">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`transition-all relative group ${
                  location.pathname === link.path ? 'text-sweida-green' : 'text-sweida-dark/70 hover:text-sweida-green'
                }`}
              >
                {t(link.key)}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-sweida-lime transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
            <Link to="/monthly-support" className="bg-sweida-gradient text-white px-7 py-3 rounded-2xl font-black text-xs shadow-lg shadow-sweida-green/20 hover:scale-105 active:scale-95 transition-all">
              {t('nav.support')}
            </Link>
          </div>

          {/* اللوغو - يمين في الـ RTL */}
          <Link to="/" className="flex flex-col items-center group relative z-10">
            <div className={`transition-all duration-500  ${scrolled ? 'scale-90' : 'scale-110'}`}>
               <img 
                src="/images/sweida-logo.png" 
                alt="SWEIDA" 
                className="w-16 h-16 md:w-24 md:h-24 object-contain transition-transform group-hover:rotate-3" 
              />
            </div>
          </Link>
        </div>

        {/* القائمة المنسدلة للموبايل */}
        <div className={`lg:hidden fixed inset-0 top-[120px] bg-white transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : (isRtl ? 'translate-x-full' : '-translate-x-full') + ' opacity-0'}`}>
          <div className="flex flex-col p-8 space-y-6 text-right font-black text-2xl text-sweida-dark">
            {navLinks.map((link, idx) => (
              <Link 
                key={link.path} 
                to={link.path} 
                onClick={() => setIsOpen(false)} 
                className="hover:text-sweida-green flex items-center gap-4 border-b border-slate-50 pb-4"
              >
                <span className="w-2 h-2 bg-sweida-lime rounded-full"></span>
                {t(link.key)}
              </Link>
            ))}
            <Link to="/monthly-support" onClick={() => setIsOpen(false)} className="text-sweida-blue pt-4">{t('nav.support')}</Link>
          
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;