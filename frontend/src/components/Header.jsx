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
    <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'shadow-xl bg-white/95 backdrop-blur-md' : 'bg-white'}`} dir={i18n.dir()}>
      
      {/* 1. التوب بار (أزرار اللغات) */}
      <div className="bg-slate-50 border-b border-gray-100 py-2">
        <div className="container mx-auto px-4 md:px-8 flex justify-end items-center gap-3">
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-gray-200 shadow-sm">
            {['ar', 'en', 'de', 'fr'].map((lang) => (
              <button 
                key={lang}
                onClick={() => changeLanguage(lang)} 
                className={`px-3 py-1 rounded-full text-[11px] font-black uppercase transition-all ${
                  i18n.language === lang 
                  ? 'bg-sweida-dark text-white shadow-sm' 
                  : 'text-gray-400 hover:text-sweida-green hover:bg-slate-50'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. الناف بار الرئيسي */}
      <nav className="relative py-2">
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center relative z-20 bg-transparent">
          
          {/* زر الموبايل + زر الدعم المصغر للموبايل */}
          <div className="flex lg:hidden items-center gap-2 md:gap-3">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-sweida-dark focus:outline-none p-2 hover:bg-slate-100 rounded-xl transition-colors relative z-50"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

            <Link 
              to="/monthly-support" 
              className="bg-sweida-gradient text-white px-4 py-2 rounded-xl font-black text-[11px] shadow-lg shadow-sweida-green/20 active:scale-95 transition-all relative z-50"
            >
              {t('nav.support')}
            </Link>
          </div>

          {/* القائمة لسطح المكتب (Desktop) */}
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

          {/* اللوغو */}
          <Link to="/" className="flex flex-col items-center group relative z-10" onClick={() => setIsOpen(false)}>
            <div className={`transition-all duration-500  ${scrolled ? 'scale-90' : 'scale-110'}`}>
               <img 
                src="/images/sweida-logo.png" 
                alt="SWEIDA" 
                className="w-16 h-16 md:w-24 md:h-24 object-contain transition-transform group-hover:rotate-3" 
              />
            </div>
          </Link>
        </div>

        {/* ----------------- القائمة المنسدلة للموبايل ----------------- */}
        
        {/* خلفية تظليل الشاشة */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full h-[100vh] bg-slate-900/20 backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          onClick={() => setIsOpen(false)}
        ></div>

        {/* صندوق القائمة المنسدلة (بدون زر الدعم الداخلي) */}
        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-[2rem] border-t border-slate-100 overflow-hidden origin-top transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'scale-y-100 opacity-100 visible' : 'scale-y-0 opacity-0 invisible'}`}
        >
          <div className="flex flex-col p-6 space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-sweida-green/10 text-sweida-green' : 'text-slate-600 hover:bg-slate-50 hover:text-sweida-dark'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-sweida-lime shadow-[0_0_8px_rgba(88,195,34,0.6)]' : 'bg-slate-200'}`}></span>
                    <span className="font-black text-lg">{t(link.key)}</span>
                  </div>
                  
                  <svg className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-sweida-green opacity-100' : 'text-slate-300 opacity-0 -translate-x-2'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isRtl ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />}
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;